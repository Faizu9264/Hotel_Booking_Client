// authReducer.ts

import { SET_USER_DATA, CLEAR_USER_DATA ,SET_LOGIN_STATUS } from '../actions/authActions';

interface AuthState {
  user: any | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
      case SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
