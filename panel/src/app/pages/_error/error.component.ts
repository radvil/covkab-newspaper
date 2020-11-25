import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {}

const routes: Routes = [
  {
    path: '',
    component: ErrorComponent,
    data: { title: 'Error' },
  },
];

@NgModule({
  declarations: [ErrorComponent],
  imports: [RouterModule.forChild(routes)],
})
export class ErrorModule {}
