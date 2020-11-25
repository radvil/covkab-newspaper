import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IsLoadingService } from '@service-work/is-loading';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import {
  MessageService,
  IMessage,
  AuthService,
  IUser,
  Role,
} from '../../_core';
import { ConfirmDialogComponent as ConfirmDialog } from '../../_shared';
import { MessageComponent } from './message.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  messages: IMessage[] = [];
  data_source: any = [];
  error = '';
  displayedColumns: string[] = [
    'name',
    'phone',
    'message',
    'createdAt',
    'action',
  ];
  private subs: Subscription = new Subscription();
  currentUser: IUser;

  // TODO: MAKE CUSTOM STYLE FOR UNREAD MSG;
  // give icon badge for sidebar notification unread;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private messageSrv: MessageService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private isLoading: IsLoadingService,
    private authSrv: AuthService
  ) {}

  get isRoot() {
    return this.currentUser && this.currentUser.role === Role.Root;
  }

  ngOnInit() {
    this.authSrv.user.subscribe((x) => (this.currentUser = x));
    this.loadMessages();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  loadMessages() {
    const query = '?sort=-createdAt';
    const http$ = this.messageSrv.getMessages(query);

    const newSub = http$.subscribe((res) => {
      this.messages = res['doc'];
      this.messages.forEach((x) => {
        return (x.createdAt = moment(x.createdAt).format('LLL'));
      });

      this.data_source = new MatTableDataSource(this.messages);
      this.data_source.paginator = this.paginator;
      this.data_source.sort = this.sort;
    });

    this.subs.add(newSub);
    this.isLoading.add(newSub);
  }

  showMessage(id: string) {
    const http$ = this.messageSrv.getMessage(id);
    const newSub = http$.subscribe((res) => {
      this.dialog.open(MessageComponent, { width: '666px', data: res['doc'] });
    });
    this.subs.add(newSub);
    this.isLoading.add(newSub);
  }

  deleteMessage(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialog, { width: '450px' });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return this.snackBar.open('Canceled', 'close', { duration: 2000 });
      }

      const http$ = this.messageSrv.deleteMessage(id);
      const newSub = http$.subscribe((_) => {
        this.snackBar.open('Item dihapus', 'Close', { duration: 5000 });
        this.loadMessages();
      });

      this.isLoading.add(newSub);
    });
  }

  applyFilter(filterValue: string) {
    this.data_source.filter = filterValue.trim().toLowerCase();
  }
}
