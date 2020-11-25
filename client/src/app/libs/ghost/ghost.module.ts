import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtDetailGhostComponent } from './art-detail-ghost/art-detail-ghost.component';
import { ArtListGhostComponent } from './art-list-ghost/art-list-ghost.component';
import { HomeGhostComponent } from './home-ghost/home-ghost.component';


@NgModule({
  declarations: [ArtDetailGhostComponent, ArtListGhostComponent, HomeGhostComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ArtDetailGhostComponent,
    ArtListGhostComponent,
    HomeGhostComponent,
  ],
})
export class GhostModule { }
