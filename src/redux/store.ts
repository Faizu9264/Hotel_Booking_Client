// store.ts

import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
// import userReducer from './reducers/userReducer';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer,

});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
