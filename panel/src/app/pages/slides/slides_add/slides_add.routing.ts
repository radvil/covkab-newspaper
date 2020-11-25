import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlidesAddComponent } from './slides_add.component';

const routes: Routes = [
  {
    path: '',
    component: SlidesAddComponent,
    data: { title: 'Add new slide' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlidesAddRouting {}
