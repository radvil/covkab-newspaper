import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesListComponent } from './articles_list.component';
import { ArticleResolver } from '../../../_core';

const routes: Routes = [
  {
    path: '',
    component: ArticlesListComponent,
    data: { title: 'List article' },
    resolve: { totalDocuments: ArticleResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesListRouting {}
