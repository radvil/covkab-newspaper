import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogModule, PageTitleModule } from '../../../_shared';

import { ArticlesDetailRouting } from './articles_detail.routing';
import { ArticlesDetailComponent } from './articles_detail.component';

@NgModule({
  declarations: [ArticlesDetailComponent],
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    PageTitleModule,
    ConfirmDialogModule,

    ArticlesDetailRouting,
  ],
})
export class ArticlesDetailModule {}
