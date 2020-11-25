import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {
  PageTitleModule,
  ConfirmDialogModule,
  FinderModule,
  MenuActionModule,
} from '../../../_shared';
import { ArticleResolver } from '../../../_core';

import { ArticlesListRouting } from './articles_list.routing';
import { ArticlesListComponent } from './articles_list.component';

@NgModule({
  declarations: [ArticlesListComponent],
  imports: [
    CommonModule,
    FormsModule,

    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    PageTitleModule,
    ConfirmDialogModule,
    FinderModule,
    MenuActionModule,

    ArticlesListRouting,
  ],
  providers: [ArticleResolver],
})
export class ArticlesListModule {}
