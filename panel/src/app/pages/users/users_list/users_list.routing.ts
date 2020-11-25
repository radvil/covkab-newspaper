import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users_list.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    data: { title: 'List users' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersListRouting {}
