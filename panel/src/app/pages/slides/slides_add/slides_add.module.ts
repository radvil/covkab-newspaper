import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatInputModule } from '@angular/material/input';
import { PageTitleModule } from '../../../_shared';

import { SlidesAddRouting } from './slides_add.routing';
import { SlidesAddComponent } from './slides_add.component';

@NgModule({
  declarations: [SlidesAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    PageTitleModule,

    SlidesAddRouting,
  ],
})
export class SlidesAddModule {}
