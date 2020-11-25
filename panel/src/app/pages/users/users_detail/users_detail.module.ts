import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageTitleModule, ConfirmDialogModule } from '../../../_shared';

import { UsersDetailRouting } from './users_detail.routing';
import { UsersDetailComponent } from './users_detail.component';

@NgModule({
  declarations: [UsersDetailComponent],
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    PageTitleModule,
    ConfirmDialogModule,

    UsersDetailRouting,
  ],
})
export class UsersDetailModule {}
