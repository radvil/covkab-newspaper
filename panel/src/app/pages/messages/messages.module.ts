import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {
  PageTitleModule,
  FinderModule,
  MenuActionModule,
  ConfirmDialogModule,
} from '../../_shared';

import { MessagesRouting } from './messages.routing';
import { MessagesComponent } from './messages.component';
import { MessageComponent } from './message.component';

@NgModule({
  entryComponents: [MessageComponent],
  declarations: [MessagesComponent, MessageComponent],
  imports: [
    CommonModule,
    HttpClientModule,

    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    PageTitleModule,
    FinderModule,
    MenuActionModule,
    ConfirmDialogModule,

    MessagesRouting,
  ],
})
export class MessagesModule {}
