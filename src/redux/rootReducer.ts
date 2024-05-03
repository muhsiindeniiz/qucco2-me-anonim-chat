import {combineReducers} from 'redux';
import authReducer from './AuthSlice/authSlice';
import shuffleReducer from './ShuffleSlice/shuffleSlice';
import tabbarVisibleReducer from './tabbarVisibleSlice/tabbarVisibleSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  shuffle: shuffleReducer,
  tabbarVisible: tabbarVisibleReducer,
});

export default rootReducer;
