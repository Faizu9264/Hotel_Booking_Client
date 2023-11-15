// reducers/userReducer.ts
interface UserState {
    userData: {
      // Define your user data structure here
      // For example:
      username: string;
      email: string;
      // ... other properties
    };
  }
  
  const initialState: UserState = {
    userData: {
      username: '',
      email: '',
      // ... other default values
    },
  };
  
  const userReducer = (state = initialState, action: any) => {
    // Handle actions here
    return state;
  };
  
  export default userReducer;
  