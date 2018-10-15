import { combineReducers } from 'redux';
import lockerRoom from './lockerRoom';
import user from './user';
import overlays from './overlays';

export default combineReducers({
	lockerRoom,
	user,
	overlays
});
