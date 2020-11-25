import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PageTitleModule } from '../../_shared';

import { DashboardRouting } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { StatsBoxes } from './stats_boxes/stats_boxes';

@NgModule({
  declarations: [DashboardComponent, StatsBoxes],
  imports: [CommonModule, HttpClientModule, PageTitleModule, DashboardRouting],
})
export class DashboardModule {}
