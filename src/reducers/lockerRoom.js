import { ADD_TO_CHECKOUT, REMOVE_FROM_CHECKOUT } from '../constants/actionTypes/lockerRoom';

const initialState = {
	checkout: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_CHECKOUT:
			return {
				...state,
				checkout: [...state.checkout, action.item]
			};

		case REMOVE_FROM_CHECKOUT:
			return {
				...state,
				checkout: state.checkout.filter(checkoutItem => checkoutItem !== action.item)
			};

		default:
			return state;
	}
}
