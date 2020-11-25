import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared';

import { ArticlesComponent } from './articles.component';
import { ArticlesRouting } from './articles.routing';

@NgModule({
  declarations: [ArticlesComponent],
  imports: [SharedModule, ArticlesRouting],
})
export class ArticlesModule {}
