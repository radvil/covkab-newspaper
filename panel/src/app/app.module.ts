import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';

import { CoreModule } from './_core/core.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HeaderComponent, SidebarComponent } from './layout';
import { ThemeDialogModule } from './_shared';

const LAYOUT_COMPONENTS = [HeaderComponent, SidebarComponent];

@NgModule({
  declarations: [AppComponent, ...LAYOUT_COMPONENTS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CoreModule,
    AppRouting,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSnackBarModule,

    ThemeDialogModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
