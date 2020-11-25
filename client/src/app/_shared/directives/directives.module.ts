import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { nglpScrollDirective } from './scroll.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    nglpScrollDirective,
  ],
  exports: [
    nglpScrollDirective,
  ]
})
export class DirectivesModule { }