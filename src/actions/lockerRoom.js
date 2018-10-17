import * as types from '../constants/actionTypes/lockerRoom';

export const addToCheckout = item => ({
	type: types.ADD_TO_CHECKOUT,
	item
});

export const removeFromCheckout = itemId => ({
	type: types.REMOVE_FROM_CHECKOUT,
	itemId
});

export const updateQuantity = (itemId, quantity) => ({
	type: types.UPDATE_QUANTITY,
	itemId,
	quantity
});
