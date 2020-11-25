import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsAddComponent } from './patients_add.component';


const routes: Routes = [
  {
    path: '',
    component: PatientsAddComponent,
    data: { title: 'Add patient' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsAddRouting { }
