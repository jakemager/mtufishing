import * as types from '../constants/actionTypes/lockerRoom';

export const addToCheckout = item => ({
	type: types.ADD_TO_CHECKOUT,
	item
});
