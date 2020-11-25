import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersAddComponent } from './users_add.component';


const routes: Routes = [
  {
    path: '',
    component: UsersAddComponent,
    data: { title: 'Add user' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersAddRouting { }
