



// userApi.ts
import createAxiosInstance from './axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import jwt from 'jsonwebtoken';
const API_BASE_URL = 'http://localhost:5000/user';
const axiosInstance = createAxiosInstance(API_BASE_URL, 'UserToken');

let userData: any = {};

const base64Decode = (str: string) => {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
};

const api = {
  sendOTP: async (email: string) => {
    try {
      const response = await axiosInstance.post('/signup', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verifyOTP: async (otp: string) => {
    try {
      const response = await axiosInstance.post('/verify-otp', { email: userData.email, otp });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  completeSignup: async () => {
    try {
      const response = await axiosInstance.post('/complete-signup', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  setUserData: (data: any) => {
    userData = { ...userData, ...data };
  },

  login: async (email: string, password: string) => {
    try {

  
      const response = await axiosInstance.post('/login', { email, password });
  
      // Access token is under the 'message' key in the response
      const accessToken = response.data.accessToken;
      
      localStorage.setItem('UserToken', accessToken);
  
      if (!accessToken) {
        console.error('Access token is missing or invalid');
        throw new Error('Access token is missing or invalid');
      }
  
      // Decode and parse access token payload
      const payloadBase64 = accessToken.split('.')[1];
      const payload = base64Decode(payloadBase64);
      const payloadObject = JSON.parse(payload);
  
      const _id = payloadObject.userId || null;
  
      // Update to use the user data from the response
      api.setUserData({ ...response.data.user, _id });
 
  
      return response.data;
    } catch (error: any) {
      console.error('Error during login:', error);
      throw new Error(error.message);
    }
  },
  
  googleLogin: async (_id:string,email: string, username: string,profileImage:string, token: string, isGoogle: boolean) => {
    try {
      const response = await axiosInstance.post('/google-login', {_id, email, username,profileImage, token, isGoogle });
      const accessToken = response.data.accessToken;
      localStorage.setItem('UserToken', accessToken);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  resendOTP: async (email: string): Promise<any> => {
    try {
      const response = await axiosInstance.post('/resend-otp', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateUserProfile: async (userId: string, data: any) => {
    try {
      const response = await axiosInstance.patch(`/${userId}/update-profile`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (userId: string, data: any) => {
    try {
      const response = await axiosInstance.patch(`/${userId}/change-password`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
    
  getAllHotels:async()=>{
    try {
      console.log('Attempting to fetch hotels...');
      const response = await axiosInstance.get(`/hotel/all`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('All Hotels Response:', response);
      const hotels = response.data;
      // dispatch(setHotels(hotels));
      return hotels;
    } catch (error: any) {
      console.error('Error fetching hotels:', error.message);
      throw new Error(error.message);
    }
  },
  getRoomsByHotelId: async (hotelId: string): Promise<any> => {
    try {
      console.log('Attempting to fetch rooms...');
      const response = await axiosInstance.get(`/room/by-hotel/${hotelId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('Rooms Response:', response);
      const rooms = response.data;

      return rooms;
    } catch (error: any) {
      console.error('Error fetching rooms:', error.message);
      throw new Error(error.message);
    }
  },

};

export default api;
