import {combineReducers} from 'redux';
import authReducer from './AuthSlice/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
