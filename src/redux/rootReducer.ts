import {combineReducers} from 'redux';
import authReducer from './auth-slice/auth-slice';
import tabbarVisibleReducer from './tabbar-visible-slice/tabbar-visible-slice';
import shuffleReducer from './shuffle-slice/shuffle-slice';
import userSlice from './user-slice/user-slice';
import chatSlice from './chat-slice/chat-slice';

const rootReducer = combineReducers({
  auth: authReducer,
  shuffle: shuffleReducer,
  tabbarVisible: tabbarVisibleReducer,
  user: userSlice,
  chat: chatSlice,
});

export default rootReducer;
