// store.ts

import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './reducers/adminReducer';
import thunk from 'redux-thunk';
import hotelSlice from './slices/hotelSlice';
import mapReducer from './slices/mapSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  admin:adminReducer,
  hotel:hotelSlice,
  map: mapReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
