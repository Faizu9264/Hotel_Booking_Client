// authReducer.ts

import { SET_USER_DATA,SET_ALL_USERS,BLOCK_USER, UNBLOCK_USER, CLEAR_USER_DATA ,SET_LOGIN_STATUS } from '../actions/authActions';
import { UserData } from '../../types/authTypes';
interface AuthState {
  user: any | null;
  users: UserData[]; 
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  users: [],
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
      case SET_ALL_USERS: 
      return {
        ...state,
        users: action.payload,
      };
      case BLOCK_USER:
        // Update users and set blocked status
        const blockedUsers = state.users.map((user) =>
          user._id === action.payload ? { ...user, blocked: true } : user
        );
        // Dispatch setAllUsers to update the state
        return {
          ...state,
          users: blockedUsers,
        };
      case UNBLOCK_USER:
        // Update users and set unblocked status
        const unblockedUsers = state.users.map((user) =>
          user._id === action.payload ? { ...user, blocked: false } : user
        );
        // Dispatch setAllUsers to update the state
        return {
          ...state,
          users: unblockedUsers,
        };
      
    default:
      return state;
  }
};

export default authReducer;
