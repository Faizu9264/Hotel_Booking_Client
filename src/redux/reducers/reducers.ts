import { combineReducers } from 'redux';
import authReducer from './authReducer'; 
import adminReducer from './adminReducer';
import hotelReducer from './hotelReducer';
const rootReducer = combineReducers({
  user: authReducer,
  admin: adminReducer,
  hotel: hotelReducer,
});

export default rootReducer;