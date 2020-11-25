import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatsComponent } from './stats.component';

const routes: Routes = [
  {
    path: '',
    component: StatsComponent,
    data: { title: 'Stats' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsRouting {}
