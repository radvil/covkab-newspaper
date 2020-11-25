import { Action, createReducer, on } from '@ngrx/store';
import { SettingsState, NIGHT_MODE_THEME } from './settings.model';
import * as fromActions from './settings.actions';

export const initialState: SettingsState = {
	theme: 'app-theme-white',
	autoNightMode: false,
	nightTheme: NIGHT_MODE_THEME,
	hour: 0,
	fixedHeader: true,
	fixedSidebar: true,
	headerBackground: 'bg-warning',
	sidebarBackground: 'bg-light'
};

const reducer = createReducer(
	initialState,
	on(
		fromActions.changeTheme,
		fromActions.changeAutoNightMode,
		fromActions.changeHour,
		fromActions.changeFixedHeader,
		fromActions.changeFixedSidebar,
    fromActions.changeHeaderBackground,
    fromActions.changeSidebarBackground,
		(state, action) => ({ ...state, ...action })
	),
);

export function settingsReducer(
	state: SettingsState | undefined,
	action: Action
) {
	return reducer(state, action);
}
