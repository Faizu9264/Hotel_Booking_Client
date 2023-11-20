// src/types/authTypes.ts
export interface UserData {
  id?:string;
  username: string;
  email: string;
  password?: string;
  token?:string;
  isGoogle?:boolean
  confirmPassword?: string;
  profileImage?: string;
}
