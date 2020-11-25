import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared';

import { ArticleDetailComponent } from './article_detail.component';
import { ArticleDetailRouting } from './article_detail.routing';

@NgModule({
  declarations: [ArticleDetailComponent],
  imports: [SharedModule, ArticleDetailRouting],
})
export class ArticleDetailModule {}
