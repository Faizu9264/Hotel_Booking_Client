// src/services/adminApi.ts
import { Dispatch } from 'redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import createAxiosInstance from './axiosConfig';
import { setHotels } from '../redux/slices/hotelSlice'
import { setRooms } from '../redux/slices/roomSlice';
import { addBooking } from '../redux/slices/AllBookingsSlice';
const ADMIN_API_BASE_URL = 'http://localhost:5000/admin';
const axiosInstance = createAxiosInstance(ADMIN_API_BASE_URL, 'AdminToken');
import { setAllUsers,blockUser,unblockUser } from '../redux/actions/authActions';


const adminApi = {
  adminLogin: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/login', { email, password });
      console.log('response', response);

      const accessToken = response.data.accessToken;
      localStorage.setItem('AdminToken', accessToken);
      console.log();
      
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
  createRoom: async (roomDetails: any) => {
    try {
      console.log('roomDetails',roomDetails);
      
      const response = await axiosInstance.post(
        `${ADMIN_API_BASE_URL}/room/create`,
        roomDetails,
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

  updateRoom: async (roomId: string, updatedDetails: any) => {
    try {
      const response = await axiosInstance.patch(
        `${ADMIN_API_BASE_URL}/room/update/${roomId}`,
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

  getAllRooms: createAsyncThunk('room/getAllRooms', async (_, { dispatch }) => {
    try {
      const response = await axiosInstance.get(`${ADMIN_API_BASE_URL}/room/all`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('All Rooms Response:', response);
      const rooms = response.data;
      dispatch(setRooms(rooms));
      return rooms;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }),
  getAllUsers: createAsyncThunk('user/getAllUsers', async (_, { dispatch }) => {
    try {
      const response = await axiosInstance.get(`${ADMIN_API_BASE_URL}/users`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log('All Users Response:', response.data);
      const users = response.data;
      dispatch(setAllUsers(users));
      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }),

  editUserById: async (userId: string, updatedDetails: any): Promise<void> => {
    try {
      const response = await axiosInstance.patch(
        `${ADMIN_API_BASE_URL}/user/update/${userId}`,
        updatedDetails,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log('User updated:', response);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  blockUser: (userId: string) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.patch(
        `${ADMIN_API_BASE_URL}/user/block/${userId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
  
      console.log('User blocked:', response.data);
  
      dispatch(blockUser(userId));
  
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  
  unblockUser: (userId: string) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.patch(
        `${ADMIN_API_BASE_URL}/user/unblock/${userId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
  
      console.log('User unblocked:', response);
  
      dispatch(unblockUser(userId));
  
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getAllBookings : createAsyncThunk('bookings/getAllBookings', async (_, { dispatch }) => {
    try {
      const response = await axiosInstance.get(`${ADMIN_API_BASE_URL}/bookings/allBookings`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      const bookings = response.data;
      console.log('bookingss',bookings)
      dispatch(addBooking(bookings));
      return bookings;
    } catch (error:any) {
      throw new Error(error.message);
    }
  }),
  
  approveBooking: (bookingId: string) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.patch(
        `${ADMIN_API_BASE_URL}/approve/${bookingId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
  
      console.log('User unblocked:', response);
  
      // dispatch(unblockUser(userId));
  
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  cancelBooking: (bookingId: string) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.patch(
        `${ADMIN_API_BASE_URL}/cancel/${bookingId}`,
        {},
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
};

export default adminApi;
