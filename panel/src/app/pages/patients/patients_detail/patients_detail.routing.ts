import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsDetailComponent } from './patients_detail.component';

const routes: Routes = [
  {
    path: '',
    component: PatientsDetailComponent,
    data: { title: 'Patient detail' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsDetailRouting {}
