import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ApiInterceptor, ErrorInterceptor, JwtInterceptor } from './helper';
import { reducers, metaReducers } from './core.state';
import { AuthEffects } from './auth/auth.effects';
import { SlideEffects } from './slide/slide.effects';
import { SettingsEffects } from './settings/settings.effects';

export const PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  // { provide: ErrorHandler, useClass: ErrorInterceptor },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
];

@NgModule({
  providers: [...PROVIDERS],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AuthEffects, SlideEffects, SettingsEffects]),
    // StoreDevtoolsModule.instrument({ maxAge: 18 }),
    QuillModule.forRoot(),
  ],
})
export class CoreModule {}
