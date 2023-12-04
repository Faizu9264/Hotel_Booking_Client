import { combineReducers } from 'redux';
import authReducer from './authReducer'; 
import adminReducer from './adminReducer';
import hotelReducer from '../slices/hotelSlice';
import mapReducer from '../slices/mapSlice';
const rootReducer = combineReducers({
  user: authReducer,
  admin: adminReducer,
  hotel: hotelReducer,
  map: mapReducer,
});

export default rootReducer;