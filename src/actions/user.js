import * as types from '../constants/actionTypes/user';
import axios from 'axios';

export const setUser = () => dispatch => {
	const params = new URLSearchParams();
	params.append('accessToken', localStorage.getItem('mtuFishingAccessToken'));
	params.append('userId', localStorage.getItem('mtuFishingUserId'));
	axios({
		method: 'post',
		url: 'http://localhost:8888/server/login/getUser.php',
		data: params
	}).then(res => {
		if (res.data) {
			dispatch({
				type: types.SET_USER,
				user: res.data
			});
		}
	});
};
