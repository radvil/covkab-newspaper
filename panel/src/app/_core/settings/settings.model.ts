import { AppState } from '../core.state';

export const NIGHT_MODE_THEME = 'app-theme-black';

export interface SettingsState {
	theme: string;
	autoNightMode: boolean;
	nightTheme: string;
	hour: number;
	fixedHeader: boolean;
  fixedSidebar: boolean;
  headerBackground: string;
  sidebarBackground: string;
}

export interface State extends AppState {
	settings: SettingsState;
}
