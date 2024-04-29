import {combineReducers} from 'redux';
import authReducer from './AuthSlice/authSlice';
import shuffleReducer from './ShuffleSlice/shuffleSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  shuffle: shuffleReducer,
});

export default rootReducer;
