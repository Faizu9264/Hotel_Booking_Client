// src/services/adminApi.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import createAxiosInstance from './axiosConfig';
import { setRefreshToken, removeRefreshToken } from './tokenHandler';
import { setHotels } from '../redux/slices/hotelSlice'
const ADMIN_API_BASE_URL = 'http://localhost:5000/admin';

const axiosInstance = createAxiosInstance(ADMIN_API_BASE_URL);


const adminApi = {
  adminLogin: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/login', { email, password });
      console.log('response', response);

      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      setRefreshToken(refreshToken);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createHotel: async (hotelDetails: any) => {
    try {
      const response = await axiosInstance.post(
        `${ADMIN_API_BASE_URL}/hotel/create`,
        hotelDetails,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  updateHotel: async (hotelId: string, updatedDetails: any) => {
    try {
      
      const response = await axiosInstance.patch(
        `${ADMIN_API_BASE_URL}/hotel/update/${hotelId}`,
        updatedDetails,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  getAllHotels: createAsyncThunk('hotel/getAllHotels', async (_, { dispatch }) => {
    try {
      const response = await axiosInstance.get(`${ADMIN_API_BASE_URL}/hotel/all`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('All Hotels Response:', response);
      const hotels = response.data;
      dispatch(setHotels(hotels));
      return hotels;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }),
};

export default adminApi;
