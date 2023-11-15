// src/redux/reducers/authReducer.ts
import { VERIFY_OTP_SUCCESS } from '../actions/authActions';

const initialState = {
  // Your initial state...
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case VERIFY_OTP_SUCCESS:
      // Handle the success action, if needed
      return state; // Or return the updated state

    // Other cases...

    default:
      return state;
  }
};

export default authReducer;
