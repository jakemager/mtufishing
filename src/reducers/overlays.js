import { OPEN_SIDEMENU } from '../constants/actionTypes/overlays';

const initialState = {
	sidemenu: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case OPEN_SIDEMENU:
			return {
				...state,
				sidemenu: action.menu
			};

		default:
			return state;
	}
}
