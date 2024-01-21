// reducers/adminReducer.ts

import { SET_ADMIN_DATA, CLEAR_ADMIN_DATA, SET_ADMIN_LOGIN_STATUS } from '../actions/adminActions';
interface AdminState {
  admin: any | null;
  isAdminLoggedIn: boolean;

}
const initialState: AdminState = {
  admin: null,
  isAdminLoggedIn: false,

};
const adminReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ADMIN_DATA:
      return {
        ...state,
        admin: action.payload,
        isAdminLoggedIn: true,
      };
    case CLEAR_ADMIN_DATA:
      return {
        ...state,
        admin: null,
        isAdminLoggedIn: false,
      };
    case SET_ADMIN_LOGIN_STATUS:
      return {
        ...state,
        isAdminLoggedIn: action.payload,
      };

    default:
      return state;
  }
};
export default adminReducer;
