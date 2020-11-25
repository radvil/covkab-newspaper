import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { SharedModule, DirectivesModule } from '../../_shared';
import { ArtCardsComponent } from './art_cards/art_cards.component';
import { SlidesComponent } from './slides/slides.component';

import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';
@NgModule({
  declarations: [
    HomeComponent,
    ArtCardsComponent,
    SlidesComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CarouselModule,
    SharedModule,
    DirectivesModule,
    HomeRouting,
  ],
})
export class HomeModule {}
