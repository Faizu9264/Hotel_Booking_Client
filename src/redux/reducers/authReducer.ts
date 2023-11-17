// authReducer.ts

import { SET_USER_DATA, CLEAR_USER_DATA } from '../actions/authActions';

interface AuthState {
  user: any | null;
}

const initialState: AuthState = {
  user: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
