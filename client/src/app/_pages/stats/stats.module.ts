import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../../_shared';

import { StatsComponent } from './stats.component';
import { StatsRouting } from './stats.routing';

@NgModule({
  declarations: [StatsComponent],
  imports: [HttpClientModule, SharedModule, StatsRouting],
})
export class StatsModule {}
