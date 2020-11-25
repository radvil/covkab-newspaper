import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// 3rd party libs
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// utils modules
import { ErrorInterceptor } from './services/error.interceptor';

export const PROVIDERS = [
    { provide: ErrorHandler, useClass: ErrorInterceptor },
];

@NgModule({
    providers: [...PROVIDERS],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        // 3rd party libs
        LoadingBarModule,
        LoadingBarHttpClientModule,
        LoadingBarRouterModule,
    ],
})
export class CoreModule { }
