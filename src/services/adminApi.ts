// src/services/adminApi.ts
import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import createAxiosInstance from "./axiosConfig";
import { setHotels } from "../redux/slices/hotelSlice";
import { setRooms } from "../redux/slices/roomSlice";
import { addBooking } from "../redux/slices/AllBookingsSlice";
const ADMIN_API_BASE_URL = import.meta.env.VITE_ADMIN_API_BASE_URL
const axiosInstance = createAxiosInstance(ADMIN_API_BASE_URL, "AdminToken");
import {
  setAllUsers,
  blockUser,
  unblockUser,
} from "../redux/actions/authActions";
import {
  fetchCouponsSuccess,
  fetchCouponsStart,
  fetchCouponsFailure,
} from "../redux/slices/couponSlice";

const adminApi = {
  adminLogin: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/login", { email, password });

      const accessToken = response.data.accessToken;
      localStorage.setItem("AdminToken", accessToken);

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
            "Content-Type": "application/json",
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
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  getAllHotels: createAsyncThunk(
    "hotel/getAllHotels",
    async (_, { dispatch }) => {
      try {
        const response = await axiosInstance.get(
          `${ADMIN_API_BASE_URL}/hotel/all`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        const hotels = response.data;
        dispatch(setHotels(hotels));
        return hotels;
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  ),
  createRoom: async (roomDetails: any) => {
    try {
      const response = await axiosInstance.post(
        `${ADMIN_API_BASE_URL}/room/create`,
        roomDetails,
        {
          headers: {
            "Content-Type": "application/json",
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
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  getAllRooms: createAsyncThunk("room/getAllRooms", async (_, { dispatch }) => {
    try {
      const response = await axiosInstance.get(
        `${ADMIN_API_BASE_URL}/room/all`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const rooms = response.data;
      dispatch(setRooms(rooms));
      return rooms;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }),
  getAllUsers: createAsyncThunk("user/getAllUsers", async (_, { dispatch }) => {
    try {
      const response = await axiosInstance.get(`${ADMIN_API_BASE_URL}/users`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

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
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
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
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

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
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(unblockUser(userId));

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getAllBookings: createAsyncThunk(
    "bookings/getAllBookings",
    async (_, { dispatch }) => {
      try {
        const response = await axiosInstance.get(
          `${ADMIN_API_BASE_URL}/bookings/allBookings`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const bookings = response.data;
        dispatch(addBooking(bookings));
        return bookings;
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  ),

  approveBooking: (bookingId: string) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.patch(
        `${ADMIN_API_BASE_URL}/approve/${bookingId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

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
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  addCoupon: async (couponData: any) => {
    try {
      const response = await axiosInstance.post("/add-coupon", couponData);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  editCoupon: async (couponId: string, updatedDetails: any) => {
    try {
      const response = await axiosInstance.patch(
        `${ADMIN_API_BASE_URL}/edit-coupon/${couponId}`,
        updatedDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  refundBooking: async (
    userId: string,
    data: { amount: number; paymentMethod: string }
  ) => {
    try {
      const response = await axiosInstance.post(
        `${ADMIN_API_BASE_URL}/refund-booking`,
        { userId, data }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const getAllCoupons = createAsyncThunk(
  "coupon/getAllCoupons",
  async (_, { dispatch }) => {
    try {
      dispatch(fetchCouponsStart());

      const response = await axiosInstance.get(
        `${ADMIN_API_BASE_URL}/get-all-coupons`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(fetchCouponsSuccess(response.data));

      return response.data;
    } catch (error: any) {
      dispatch(fetchCouponsFailure(error.message));

      throw error;
    }
  }
);

export default adminApi;
