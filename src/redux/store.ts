// store.ts

import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './reducers/adminReducer';
import thunk from 'redux-thunk';
import hotelSlice from './slices/hotelSlice';
import mapReducer from './slices/mapSlice';
import roomReducer from './slices/roomSlice'
import singleRoomSlice from './slices/singleRoomSlice';
import bookingReducer from './slices/bookingSlice';
import AllBookingSlice from './slices/AllBookingsSlice';
import couponReducer from './slices/couponSlice';
import allReviewsReducer from './slices/allReviewsSlice'; 
import walletSlice from './slices/walletSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  admin:adminReducer,
  hotel:hotelSlice,
  map: mapReducer,
  rooms:roomReducer,
  room:singleRoomSlice,
  booking: bookingReducer,
  allBooking:AllBookingSlice,
  allReviews: allReviewsReducer,
  wallet: walletSlice,
  coupon: couponReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
