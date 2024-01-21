// redux/actions/adminActions.ts
import { AnyAction } from 'redux';
import { AdminData } from '../../types/authTypes';  


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


export const logoutAdmin = (): AnyAction => {
  localStorage.removeItem('adminInfo');

  return {
    type: CLEAR_ADMIN_DATA,
  };
};

