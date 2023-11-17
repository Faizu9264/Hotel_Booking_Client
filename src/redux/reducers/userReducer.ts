// // userReducer.ts

// import { SET_USER_DATA, CLEAR_USER_DATA } from '../actions/authActions';

// interface UserState {
//   userData: any; 
// }

// const initialState: UserState = {
//   userData: {},
// };

// const userReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case SET_USER_DATA:
//       return {
//         ...state,
//         userData: action.payload,
//       };
//     case CLEAR_USER_DATA:
//       return {
//         ...state,
//         userData: {},
//       };
//     default:
//       return state;
//   }
// };

// export default userReducer;
