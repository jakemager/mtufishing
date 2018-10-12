import * as types from '../constants/actionTypes/user';

export const setUser = user => ({
	type: types.SET_USER,
	user
});
