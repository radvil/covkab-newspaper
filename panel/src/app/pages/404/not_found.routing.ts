import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not_found.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
    data: { title: '404 - Not Found' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFoundRouting {}
