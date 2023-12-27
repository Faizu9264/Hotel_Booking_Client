import { Dispatch, AnyAction } from 'redux';
import api from '../../services/userApi';
import { UserData } from '../../types/authTypes';


export const SET_USER_DATA = 'SET_USER_DATA';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
export const SET_ALL_USERS = 'SET_ALL_USERS';
export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
export const BLOCK_USER = 'BLOCK_USER';
export const UNBLOCK_USER = 'UNBLOCK_USER';

export const setLoginStatus = (isLoggedIn: boolean): AnyAction => ({
  type: SET_LOGIN_STATUS,
  payload: isLoggedIn,
});
export const setUserData = (userData: Partial<UserData>): AnyAction => ({
  type: SET_USER_DATA,
  payload: userData,
});

export const clearUserData = (): AnyAction => ({
  type: CLEAR_USER_DATA,
});
export const setAllUsers = (users: UserData[]): AnyAction => ({
  type: SET_ALL_USERS,
  payload: users,
});

export const blockUser = (userId: string): AnyAction => ({
  type: BLOCK_USER,
  payload: userId,
});

export const unblockUser = (userId: string): AnyAction => ({
  type: UNBLOCK_USER,
  payload: userId,
});
export const loginUser = (email: string, password: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const user = await api.login(email, password);

    const userWithProfileImage = {
      ...user,
      profileImage: user.profileImage || '/logo/logo.jpg', 
    };

    dispatch(setUserData(userWithProfileImage));
  } catch (error: any) {

    console.error(error.message);
  }
};


export const logoutUser = (): AnyAction => {
  localStorage.removeItem('UserData');

  return {
    type: CLEAR_USER_DATA,
  };
};
