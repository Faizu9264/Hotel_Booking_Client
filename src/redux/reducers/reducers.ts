import { combineReducers } from 'redux';
import authReducer from './authReducer'; 
import adminReducer from './adminReducer';
import hotelReducer from '../slices/hotelSlice';
import mapReducer from '../slices/mapSlice';
import roomReducer from '../slices/roomSlice';
import singleRoomSlice from '../slices/singleRoomSlice';
import AllBookingSlice from '../slices/AllBookingsSlice';
import walletSlice from '../slices/walletSlice';

const rootReducer = combineReducers({
  user: authReducer,
  admin: adminReducer,
  hotel: hotelReducer,
  map: mapReducer,
  rooms: roomReducer ,
  room:singleRoomSlice,
  allBooking:AllBookingSlice,
  wallet: walletSlice,
});

export default rootReducer;