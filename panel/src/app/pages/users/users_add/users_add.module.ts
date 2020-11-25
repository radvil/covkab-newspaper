import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PageTitleModule, ConfirmDialogModule } from '../../../_shared';

import { UsersAddRouting } from './users_add.routing';
import { UsersAddComponent } from './users_add.component';

@NgModule({
  declarations: [UsersAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    PageTitleModule,
    ConfirmDialogModule,

    UsersAddRouting,
  ],
})
export class UsersAddModule {}
