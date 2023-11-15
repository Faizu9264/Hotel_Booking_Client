// authActions.ts

// authActions.ts
export const setUserData = (userData: any) => {
  return {
    type: 'SET_USER_DATA',
    payload: userData,
  };
};

export const clearUserData = () => {
  return {
    type: 'CLEAR_USER_DATA',
    // any additional payload if needed
  };
};

export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
