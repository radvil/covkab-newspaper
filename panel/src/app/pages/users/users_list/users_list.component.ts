import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserService, IUser } from '../../../_core';
import { ConfirmDialogComponent } from '../../../_shared';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IsLoadingService } from '@service-work/is-loading';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users_list',
  templateUrl: './users_list.component.html',
  styleUrls: ['./users_list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  data_source: any = [];
  displayedColumns: string[] = ['name', 'nik', 'role', 'action'];
  private subscription = new Subscription();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private userSrv: UserService,
    private isLoading: IsLoadingService
  ) {}

  ngOnInit() {
    this.subscription.add(this.loadUsers());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadUsers() {
    const http$ = this.userSrv.getUsers();
    const newSub = http$.subscribe((res) => {
      this.users = res['doc'];

      this.data_source = new MatTableDataSource(this.users);
      this.data_source.paginator = this.paginator;
      this.data_source.sort = this.sort;
    });

    this.isLoading.add(newSub);
  }

  applyFilter(filterValue: string) {
    this.data_source.filter = filterValue.trim().toLowerCase();
  }

  addUser() {
    this.router.navigate(['users-add/']);
  }

  showUser(id: string) {
    this.router.navigate([`users-detail/${id}`]);
  }

  editUser(id: string) {
    this.router.navigate([`users-edit/${id}`]);
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return this.snackBar.open('Canceled!', 'close', {
          duration: 2000,
        });
      }

      const http$ = this.userSrv.deleteUser(id);

      const newSub = http$.subscribe(
        (res) => {
          this.snackBar.open('Deleted!', 'close', { duration: 5000 });
          this.loadUsers();
        },
        (err) => {
          this.snackBar.open('Failed!', 'close', { duration: 5000 });
        }
      );

      this.isLoading.add(newSub);
    });
  }
}
