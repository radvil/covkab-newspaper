import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesDetailComponent } from './articles_detail.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesDetailComponent,
    data: { title: 'Article detail' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesDetailRouting {}
