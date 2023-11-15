// store.ts
import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import { configureStore } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
  user: userReducer,
  // ... other reducers
});

// src/redux/store.ts

const store = configureStore({
  reducer: rootReducer,
  // Add any middleware or other configurations as needed
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

