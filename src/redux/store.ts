// store.ts

import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './reducers/adminReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  admin:adminReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
