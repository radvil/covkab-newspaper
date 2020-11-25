import { createAction, props } from '@ngrx/store';

export const changeTheme = createAction(
	'[Settings] Change Theme',
	props<{ theme: string }>()
);

export const changeAutoNightMode = createAction(
	'[Settings] Change Auto Night Mode',
	props<{ autoNightMode: boolean }>()
);

export const changeHour = createAction(
	'[Settings] Change Hour',
	props<{ hour: number }>()
);

export const changeFixedHeader = createAction(
	'[Settings] Change Fixed Header',
	props<{ fixedHeader: boolean }>()
);

export const changeFixedSidebar = createAction(
	'[Settings] Change Fixed Sidebar',
	props<{ fixedSidebar: boolean }>()
);

export const changeHeaderBackground = createAction(
	'[Settings] Change Header Background',
	props<{ headerBackground: string }>()
);

export const changeSidebarBackground = createAction(
	'[Settings] Change Sidebar Background',
	props<{ sidebarBackground: string }>()
);
