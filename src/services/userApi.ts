// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/user';

// let userData: any = {};

// const api = {
//   sendOTP: async (email: string) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/signup`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ email }),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//       }

//       return response.json();
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   },

//   verifyOTP: async (otp: string) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/verify-otp`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ email: userData.email, otp }),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//       }

//       return response.json();
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   },

//   completeSignup: async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/complete-signup`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//       }

//       return response.json();
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   },

//   setUserData: (data: any) => {
//     userData = { ...userData, ...data };
//   },

//   login: async (email: string, password: string) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//       }

//       return response.json();
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   },

//   googleLogin: async (email: string, username: string, token: string, isGoogle: boolean) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/google-login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ email, username, token, isGoogle }),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//       }

//       return response.json();
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   },

//   resendOTP: async (email: string): Promise<any> => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/resend-otp`, { email });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// export default api;




// userApi.ts
import createAxiosInstance from './axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:5000/user';
import { setRefreshToken, removeRefreshToken } from './tokenHandler';
import { setHotels } from '../redux/slices/hotelSlice'
const axiosInstance = createAxiosInstance(API_BASE_URL);

let userData: any = {};

 

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
      console.log(' email, password', email, password);
      
      const response = await axiosInstance.post('/login', { email, password });

      const accessToken = response.data.accessToken;
       
      const refreshToken = response.data.refreshToken;
      setRefreshToken(refreshToken);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  googleLogin: async (email: string, username: string, token: string, isGoogle: boolean) => {
    try {
      const response = await axiosInstance.post('/google-login', { email, username, token, isGoogle });
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
  }

};

export default api;
