import { combineReducers } from 'redux';
import lockerRoom from './lockerRoom';
import user from './user';

export default combineReducers({
	lockerRoom,
	user
});
