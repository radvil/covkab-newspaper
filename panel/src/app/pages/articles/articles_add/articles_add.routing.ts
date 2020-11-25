import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesAddComponent } from './articles_add.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesAddComponent,
    data: { title: 'Add article' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesAddRouting {}
