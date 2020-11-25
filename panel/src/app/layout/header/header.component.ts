import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IsLoadingService } from '@service-work/is-loading';

import { AuthService, IUser } from '../../_core';
import { ThemeDialogComponent } from 'src/app/_shared';
import { selectHeaderBackground, selectIsFixedHeader, selectIsFixedSidebar } from '../../_core/settings/settings.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<IUser>;
  bgClass$: Observable<string>;
  isFixedHeader$: Observable<boolean>;

  constructor(
    private router: Router,
    private isLoading: IsLoadingService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authSrv: AuthService,
    private store: Store
  ) {}

  ngOnInit() {
    this.currentUser$ = this.authSrv.user;
    this.bgClass$ = this.store.pipe(select(selectHeaderBackground));
    this.isFixedHeader$ = this.store.select(selectIsFixedHeader);
  }

  showProfile(id: string) {
    this.router.navigate([`users-detail/${id}`]);
  }

  openThemeDialog() {
    this.dialog.open(ThemeDialogComponent, { width: '666px' });
  }

  logoutUser(): void {
    this.isLoading.add();
    this.authSrv.logoutUser();

    setTimeout(() => {
      this.router.navigate(['login']);
      this.snackBar.open('Logout sukses', 'close', { duration: 1000 });
      this.isLoading.remove();
    }, 500);
  }
}
