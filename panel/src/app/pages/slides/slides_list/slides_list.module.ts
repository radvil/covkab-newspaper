import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { StoreModule } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PageTitleModule, ConfirmDialogModule } from '../../../_shared';
// import { reducers, effects } from '../../../_core';

import { SlidesListRouting } from './slides_list.routing';
import { SlidesListComponent } from './slides_list.component';
// import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [SlidesListComponent],
  imports: [
    CommonModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    PageTitleModule,
    ConfirmDialogModule,

    SlidesListRouting,
    // StoreModule.forFeature('slides', reducers),
    // EffectsModule.forFeature(effects),
  ],
})
export class SlidesListModule {}
