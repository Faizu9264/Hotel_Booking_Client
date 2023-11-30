import { combineReducers } from 'redux';
import authReducer from './authReducer'; 
import adminReducer from './adminReducer';
import hotelReducer from '../slices/hotelSlice';
const rootReducer = combineReducers({
  user: authReducer,
  admin: adminReducer,
  hotel: hotelReducer,
});

export default rootReducer;