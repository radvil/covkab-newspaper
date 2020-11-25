import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../../_shared';

import { AboutComponent } from './about.component';
import { AboutRouting } from './about.routing';

@NgModule({
  declarations: [AboutComponent],
  imports: [HttpClientModule, SharedModule, AboutRouting],
})
export class AboutModule {}
