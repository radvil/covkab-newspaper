import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsListComponent } from './patients_list.component';
import { PatientResolver } from '../../../_core';

const routes: Routes = [
  {
    path: '',
    component: PatientsListComponent,
    data: { title: 'List patients' },
    resolve: { totalDocuments: PatientResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsListRouting {}
