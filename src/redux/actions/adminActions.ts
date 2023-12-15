// redux/actions/adminActions.ts
import { AnyAction } from 'redux';
import { AdminData } from '../../types/authTypes';  
import { createAsyncThunk } from '@reduxjs/toolkit';
import adminApi from '../../services/adminApi'

export const SET_ADMIN_DATA = 'SET_ADMIN_DATA';
export const CLEAR_ADMIN_DATA = 'CLEAR_ADMIN_DATA';
export const SET_ADMIN_LOGIN_STATUS = 'SET_ADMIN_LOGIN_STATUS';

export const setAdminLoginStatus = (isLoggedIn: boolean): AnyAction => ({
  type: SET_ADMIN_LOGIN_STATUS,
  payload: isLoggedIn,
});

export const setAdminData = (adminData: Partial<AdminData>): AnyAction => ({
  type: SET_ADMIN_DATA,
  payload: adminData,
});

// Import necessary dependencies

export const logoutAdmin = (): AnyAction => {
  localStorage.removeItem('AdminToken');

  return {
    type: CLEAR_ADMIN_DATA,
  };
};

