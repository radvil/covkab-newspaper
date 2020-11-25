import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// 3rd party libs
import { FlexLayoutModule } from '@angular/flex-layout';
// import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// custom libs
import { GhostModule } from '../libs/ghost/ghost.module';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    // FlexLayoutServerModule,
    LoadingBarRouterModule,
  ],
  exports: [
    CommonModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    LoadingBarRouterModule,
    GhostModule
  ],
})
export class SharedModule { }
