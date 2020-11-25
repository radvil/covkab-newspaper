import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
} from '@ngrx/store';
import { initStateFromLocalStorage } from './helper/init-state.reducer';

import { SlidesState, SlidesReducer } from './slide';
import { SettingsState } from './settings/settings.model';
import { settingsReducer } from './settings/settings.reducer';

import { AuthState } from './auth/auth.model';
import { authReducer } from './auth/auth.reducer';

/** Feature Selectors */
export const selectSettingsState = createFeatureSelector<
  AppState,
  SettingsState
>('settings');
export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

/** App Reducers */
export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  slides: SlidesReducer,
  settings: settingsReducer,
};
export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage,
];

/** App State */
export interface AppState {
  readonly auth: AuthState;
  readonly settings: SettingsState;
  readonly slides: SlidesState;
}
