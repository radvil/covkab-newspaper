import { NgModule, Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  changeHeaderBackground,
  changeFixedHeader,
  changeFixedSidebar,
} from 'src/app/_core/settings/settings.actions';
import { SettingsState } from 'src/app/_core/settings/settings.model';
import { selectSettingsState } from 'src/app/_core/core.state';

@Component({
  selector: 'app-theme-dialog',
  templateUrl: './theme-dialog.component.html',
  styleUrls: ['./theme-dialog.component.scss'],
})
export class ThemeDialogComponent implements OnInit {
  public windowTitle = 'Konfigurasi Tema';

  bgClasses = [
    'bg-light',
    'bg-danger',
    'bg-warning',
    'bg-success',
    'bg-primary',
  ];
  settings$: Observable<SettingsState>;

  constructor(
    public dialogRef: MatDialogRef<ThemeDialogComponent>,
    public store: Store
  ) {}

  ngOnInit() {
    this.settings$ = this.store.select(selectSettingsState);
  }

  onBackgroundClick(index: number) {
    const headerBackground = this.bgClasses[index];
    this.store.dispatch(changeHeaderBackground({ headerBackground }));
  }

  onToggleFixedHeader({checked: fixedHeader}) {
    this.store.dispatch(changeFixedHeader({ fixedHeader }));
  }

  onToggleFixedSidebar({checked: fixedSidebar}) {
    this.store.dispatch(changeFixedSidebar({ fixedSidebar }));
  }

  resetDefaultBg() {
    const headerBackground = 'bg-warning';
    const fixedHeader = true;
    this.store.dispatch(changeHeaderBackground({ headerBackground }));
    this.store.dispatch(changeFixedHeader({ fixedHeader }));
  }

  closeMe() {
    this.dialogRef.close(null);
  }
}

@NgModule({
  declarations: [ThemeDialogComponent],
  entryComponents: [ThemeDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
})
export class ThemeDialogModule {}
