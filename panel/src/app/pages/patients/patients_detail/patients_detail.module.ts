import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PageTitleModule, ConfirmDialogModule } from '../../../_shared';

import { PatientsDetailComponent } from './patients_detail.component';
import { PatientsDetailRouting } from './patients_detail.routing';

@NgModule({
  declarations: [PatientsDetailComponent],
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    PageTitleModule,
    ConfirmDialogModule,

    PatientsDetailRouting,
  ],
})
export class PatientsDetailModule {}
