import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {
  PageTitleModule,
  FinderModule,
  MenuActionModule,
  ConfirmDialogModule,
} from '../../../_shared';

import { PatientResolver } from '../../../_core';

import { PatientsListRouting } from './patients_list.routing';
import { PatientsListComponent } from './patients_list.component';

@NgModule({
  declarations: [PatientsListComponent],
  imports: [
    CommonModule,
    FormsModule,

    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    PageTitleModule,
    FinderModule,
    MenuActionModule,
    ConfirmDialogModule,

    PatientsListRouting,
  ],
  providers: [PatientResolver],
})
export class PatientsListModule {}
