import { Dispatch, AnyAction } from 'redux';
import api from '../../services/api';
import { UserData } from '../../types/authTypes';

export const SET_USER_DATA = 'SET_USER_DATA';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';

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

export const loginUser = (email: string, password: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const user = await api.login(email, password);

    const userWithProfileImage = {
      ...user,
      profileImage: user.profileImage || '/logo/logo.jpg', 
    };

    dispatch(setUserData(userWithProfileImage));
  } catch (error: any) {
    // Handle login failure
    console.error(error.message);
  }
};

// Modify the logoutUser action creator to return an action object
export const logoutUser = (): AnyAction => ({
  type: CLEAR_USER_DATA,
});
