import {
	ADD_TO_CHECKOUT,
	REMOVE_FROM_CHECKOUT,
	UPDATE_QUANTITY
} from '../constants/actionTypes/lockerRoom';

const initialState = {
	checkout: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_CHECKOUT:
			return {
				...state,
				checkout: [...state.checkout, { ...action.item, quantity: 1 }]
			};

		case REMOVE_FROM_CHECKOUT:
			return {
				...state,
				checkout: state.checkout.filter(checkoutItem => checkoutItem.Id !== action.itemId)
			};

		case UPDATE_QUANTITY:
			return {
				...state,
				checkout: state.checkout.map(item => {
					if (item.Id === action.itemId) {
						return {
							...item,
							quantity: action.quantity
						};
					}
					return item;
				})
			};

		default:
			return state;
	}
}
