import * as types from '../constants/actionTypes/overlays';

export const openSideMenu = menu => ({
	type: types.OPEN_SIDEMENU,
	menu
});

export const closeSideMenu = () => ({
	type: types.OPEN_SIDEMENU,
	menu: null
});
