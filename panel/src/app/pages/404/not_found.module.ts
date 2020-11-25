import { NgModule } from '@angular/core';

import { NotFoundRouting } from './not_found.routing';
import { NotFoundComponent } from './not_found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [NotFoundRouting],
})
export class NotFoundModule {}
