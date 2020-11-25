import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages.component';
import { MessageComponent } from './message.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesComponent,
    data: {title: 'List of Messages'}
  },
  {
    path: '/:id',
    component: MessageComponent,
    data: {title: 'Message detail'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRouting { }
