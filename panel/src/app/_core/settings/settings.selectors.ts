import { createSelector } from '@ngrx/store';

import { SettingsState } from './settings.model';
import { selectSettingsState } from '../core.state';

export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state
);

export const selectTheme = createSelector(
  selectSettings,
  (settings) => settings.theme
);

export const selectAutoNightMode = createSelector(
  selectSettings,
  (settings) => settings.autoNightMode
);

export const selectNightTheme = createSelector(
  selectSettings,
  (settings) => settings.nightTheme
);

export const selectHour = createSelector(
  selectSettings,
  (settings) => settings.hour
);

export const selectIsNightHour = createSelector(
  selectAutoNightMode,
  selectHour,
  (autoNightMode, hour) => autoNightMode && (hour >= 19 || hour <= 7) // above 7:00 PM under 07:00 AM
);

export const selectEffectiveTheme = createSelector(
  selectTheme,
  selectNightTheme,
  selectIsNightHour,
  (theme, nightTheme, isNightHour) =>
    (isNightHour ? nightTheme : theme).toLowerCase()
);

export const selectIsFixedHeader = createSelector(
  selectSettings,
  (state: SettingsState) => state.fixedHeader
);

export const selectIsFixedSidebar = createSelector(
  selectSettings,
  (settings) => settings.fixedSidebar
);

export const selectHeaderBackground = createSelector(
  selectSettings,
  (settings) => settings.headerBackground
);

export const selectSidebarBackground = createSelector(
  selectSettings,
  (settings) => settings.sidebarBackground
);
