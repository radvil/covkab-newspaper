import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { IsLoadingService } from '@service-work/is-loading';
import { UserService, IUser } from '../../../_core';
import { ConfirmDialogComponent } from '../../../_shared';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-users_detail',
  templateUrl: './users_detail.component.html',
  styleUrls: ['./users_detail.component.scss'],
})
export class UsersDetailComponent implements OnInit, OnDestroy {
  idParam: string;
  public user: IUser;
  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private userSrv: UserService,
    private isLoading: IsLoadingService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.idParam = this.route.snapshot.params.id;
    this.subs.add(this.loadUser());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  loadUser() {
    const sub$ = this.userSrv.getUser(this.idParam).subscribe((res) => {
      this.user = res['doc'];

      this.user.createdAt = moment(this.user.createdAt).format('LLL');
      this.user.updatedAt = moment(this.user.updatedAt).format('LLL');
      this.user.lastLogin = moment(this.user.lastLogin).format('LLL');
    });

    this.isLoading.add(sub$);
  }

  editUser() {
    this.router.navigate([`users-edit/${this.user._id}`]);
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return this.snackBar.open('Canceled', 'close', { duration: 2000 });
      }

      const http$ = this.userSrv.deleteUser(id);
      const newSub = http$.subscribe(
        (res: any) => {
          this.snackBar.open('Deleted!', 'close', { duration: 5000 });
          this.router.navigate(['users-list/']);
        },
        (err: any) => {
          this.snackBar.open('Failed!', 'close', { duration: 5000 });
        }
      );

      this.isLoading.add(newSub);
    });
  }
}
