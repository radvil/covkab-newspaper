import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { QuillModule } from 'ngx-quill';
import { ConfirmDialogModule, PageTitleModule } from '../../../_shared';

import { ArticlesAddRouting } from './articles_add.routing';
import { ArticlesAddComponent } from './articles_add.component';

@NgModule({
  declarations: [ArticlesAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    QuillModule,
    PageTitleModule,
    ConfirmDialogModule,

    ArticlesAddRouting,
  ],
})
export class ArticlesAddModule {}
