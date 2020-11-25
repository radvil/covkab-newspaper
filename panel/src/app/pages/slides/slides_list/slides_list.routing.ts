import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlidesListComponent } from './slides_list.component';

const routes: Routes = [
  {
    path: '',
    component: SlidesListComponent,
    data: { title: 'Slides list' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlidesListRouting {}
