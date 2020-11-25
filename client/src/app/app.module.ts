import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './_core/core.module';
import { AppRouting } from './app.routing';
import { DirectivesModule, SharedModule } from './_shared';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { FooterComponent, ContactDialogComponent } from './components';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';

const LAYOUT_COMPONENTS = [
  AppComponent,
  ContactDialogComponent,
];

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    ReactiveFormsModule,

    CoreModule,
    AppRouting,
    SharedModule,
    DirectivesModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    RouterModule,
  ],
  declarations: [...LAYOUT_COMPONENTS, FooterComponent],
  entryComponents: [ContactDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
