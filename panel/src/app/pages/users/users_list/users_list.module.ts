import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {
  PageTitleModule,
  MenuActionModule,
  ConfirmDialogModule,
} from '../../../_shared';

import { UsersListRouting } from './users_list.routing';
import { UsersListComponent } from './users_list.component';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    FormsModule,

    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    PageTitleModule,
    MenuActionModule,
    ConfirmDialogModule,

    UsersListRouting,
  ],
})
export class UsersListModule {}
