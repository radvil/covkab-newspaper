import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { IsLoadingService } from '@service-work/is-loading';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IUser, AuthService, TitleService, LocalStorageService } from './_core';

import {
  selectEffectiveTheme,
  selectIsFixedHeader,
  selectIsFixedSidebar,
} from './_core/settings/settings.selectors';

@Component({
  selector: 'app-root',
  template: `
    <mat-progress-bar
      *ngIf="isLoading$ | async"
      mode="indeterminate"
      color="warn"
      style="position: fixed; top: 0; z-index: 999; height: 3px;"
    ></mat-progress-bar>

    <div
      [class]="
        (theme$ | async) +
        ' app-container ' +
        headerClassName +
        ' ' +
        sidebarClassName
      "
    >
      <app-header></app-header>
      <div class="app-main">
        <ng-container *ngIf="activeUser$ | async">
          <app-sidebar></app-sidebar>
        </ng-container>

        <div [ngClass]="(activeUser$ | async) && 'app-main__outer'">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;
  activeUser$: Observable<IUser>;
  theme$: Observable<string>;
  headerClassName = '';
  sidebarClassName = '';

  constructor(
    private router: Router,
    private store: Store,
    private loadingSrv: IsLoadingService,
    private lsSrv: LocalStorageService,
    private titleSrv: TitleService,
    private authSrv: AuthService
  ) {}

  ngOnInit() {
    this.activeUser$ = this.authSrv.user;

    this.lsSrv.testLocalStorage();
    this.titleSrv.setAppTitle();
    this.setAppTheme();
    this.setAppProgressBar();
  }

  setAppTheme() {
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
    this.store.pipe(select(selectIsFixedHeader)).subscribe((status) => {
      let classes = [];
      status
        ? classes.push('fixed-header')
        : classes.filter((c) => !c.includes('fixed-header'));
      this.headerClassName = classes.toString().split(',').join(' ');
    });
    this.store.pipe(select(selectIsFixedSidebar)).subscribe((status) => {
      let classes = [];
      status
        ? classes.push('fixed-sidebar')
        : classes.filter((c) => !c.includes('fixed-sidebar'));
      this.sidebarClassName = classes.toString().split(',').join(' ');
    });
  }

  // set app progress bar
  setAppProgressBar() {
    this.isLoading$ = this.loadingSrv.isLoading$();
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        )
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loadingSrv.add();
          return;
        }

        setTimeout(() => {
          // remove timeout later
          this.loadingSrv.remove();
        }, 500);
      });
  }
}
