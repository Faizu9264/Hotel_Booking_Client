// src/types/authTypes.ts
export interface UserData {
  _id:string;
  username: string;
  email: string;
  password?: string;
  phoneNumber?:number;
  token?:string;
  isGoogle?:boolean
  confirmPassword?: string;
  profileImage?: string;
  blocked?: boolean;
}


export interface AdminData {
  id: string;
  username: string;
  isAdminLoggedIn:boolean;
}



import { AnyAction } from 'redux';

export type AuthActionTypes =
  | { type: 'SET_USER_DATA'; payload: Partial<UserData> }
  | { type: 'CLEAR_USER_DATA' }
  | { type: 'SET_LOGIN_STATUS'; payload: boolean };

export type AuthAction = AuthActionTypes | AnyAction;
