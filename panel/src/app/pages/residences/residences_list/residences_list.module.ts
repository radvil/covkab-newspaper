import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidencesListComponent } from './residences_list.component';
import { RouterModule, Routes } from '@angular/router';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {
  PageTitleModule,
  FinderModule,
  ConfirmDialogModule,
  MenuActionModule,
} from '../../../_shared';
import { WindowDialogModule } from '../window_dialog/window_dialog.module';

const routes: Routes = [
  {
    path: '',
    component: ResidencesListComponent,
    data: { title: 'Residences List' },
  },
];

@NgModule({
  declarations: [ResidencesListComponent],
  imports: [
    CommonModule,

    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    PageTitleModule,
    FinderModule,
    ConfirmDialogModule,
    MenuActionModule,
    WindowDialogModule,

    RouterModule.forChild(routes),
  ],
})
export class ResidencesListModule {}
