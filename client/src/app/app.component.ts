import { ChangeDetectorRef, Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ScrollElement } from './_shared';
import { DataService, IMessage } from './_core';
import { ContactDialogComponent } from './components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {

  public isActive = false;
  public isActivefadeInDown = true;
  public isFixedToolbar = true;
  public mobileQuery: MediaQueryList;

  private contactFabButton: any;
  private bodyelement: any;
  private _mobileQueryListener: () => void;
  private subs = new Subscription();

  constructor(
    @Inject(DOCUMENT) public document: any,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private dataSrv: DataService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  public detectScroll(event: ScrollElement) {
    if (event.header) {
      this.isActive = false;
      this.isActivefadeInDown = true;
      this.isFixedToolbar = true;
    }

    if (event.bottom) {
      this.isActive = true;
      this.isActivefadeInDown = false;
      this.isFixedToolbar = false;
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, { width: '400px' });

    const dialogSub$ = dialogRef.afterClosed().pipe(
      tap((message: IMessage) => message
        ? this.createMessage(message)
        : this.snackBar.open('Canceled', 'Close', { duration: 2000 })
      )
    );

    this.subs.add(dialogSub$.subscribe());
  }

  private createMessage(data: any): void {
    this.subs.add(
      this.dataSrv.createMessage(data).subscribe(
        (_) => this.snackBar.open('Message sent', 'Close'),
        (err) => this.snackBar.open(err, 'Close', { duration: 2000 })
      )
    );
  }

  public setToggleOn() {
    this.bodyelement = document.getElementById('covKabBody');
    this.bodyelement.classList.add('scrollOff');
    this.contactFabButton = document.getElementById('contact-fab-button');
    this.contactFabButton.style.display = 'none';
  }

  public setToggleOff() {
    this.bodyelement = document.getElementById('covKabBody');
    this.bodyelement.classList.remove('scrollOff');
    this.contactFabButton = document.getElementById('contact-fab-button');
    this.contactFabButton.removeAttribute('style');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subs.unsubscribe();
  }
}
