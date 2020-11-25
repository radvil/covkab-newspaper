import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { IsLoadingService } from '@service-work/is-loading';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  IResidence,
  ResidencesService,
  IUser,
  AuthService,
  Role,
} from '../../../_core';
import { ConfirmDialogComponent as ConfirmDialog } from '../../../_shared';
import { WindowDialogComponent } from '../window_dialog/window_dialog.component';

@Component({
  selector: 'app-residences_list',
  templateUrl: './residences_list.component.html',
  styleUrls: ['./residences_list.component.scss'],
})
export class ResidencesListComponent implements OnInit, OnDestroy {
  private residences: IResidence[];
  private subscription = new Subscription();
  dataSource: any = [];
  displayedColumns: string[] = ['postalCode', 'name', 'action'];
  currentUser: IUser;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private residenceSrv: ResidencesService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private loadingSrv: IsLoadingService,
    private authSrv: AuthService
  ) {}

  get isRoot() {
    return this.currentUser && this.currentUser.role === Role.Root;
  }

  ngOnInit() {
    this.authSrv.user.subscribe((x) => (this.currentUser = x));
    this.subscription.add(this.loadResidences());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadResidences() {
    const http$ = this.residenceSrv.getResidences();
    const newSub = http$.subscribe((res) => {
      this.residences = res;

      this.dataSource = new MatTableDataSource(this.residences);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    return this.loadingSrv.add(newSub);
  }

  openDialog(id: string, mode: string) {
    const dialog = this.matDialog.open(WindowDialogComponent, {
      width: '777px',
      disableClose: true,
      data: { id, mode },
    });

    dialog.afterClosed().subscribe((message) => {
      if (message) this.matSnackBar.open(message, 'close', { duration: 5000 });
      this.loadResidences();
    });
  }

  deleteResidence(id: string) {
    const dialog = this.matDialog.open(ConfirmDialog, { width: '445px' });

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return this.matSnackBar.open('Canceled!', 'close', {
          duration: 2000,
        });
      }

      const http$ = this.residenceSrv.deleteResidence(id);
      const newSub = http$.subscribe(
        () => {
          this.matSnackBar.open('Deleted!', 'close', { duration: 5000 });
          this.loadResidences();
        },
        (err: Error) =>
          this.matSnackBar.open(`Failed! ${JSON.stringify(err)}`, 'close')
      );

      return this.loadingSrv.add(newSub);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
