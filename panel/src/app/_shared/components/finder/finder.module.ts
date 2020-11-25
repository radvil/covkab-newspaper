import { NgModule } from '@angular/core';
import { FinderComponent } from './finder.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [FinderComponent],
  imports: [MatInputModule, MatIconModule],
  exports: [FinderComponent],
})
export class FinderModule {}
