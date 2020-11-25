import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersDetailComponent } from './users_detail.component';

const routes: Routes = [
  {
    path: '',
    component: UsersDetailComponent,
    data: { title: 'User detail' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersDetailRouting {}
