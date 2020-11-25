import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleDetailComponent } from './article_detail.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleDetailComponent,
    data: { title: 'Detail Artikel' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleDetailRouting {}
