// userApi.ts
import createAxiosInstance from "./axiosConfig";
const API_BASE_URL = import.meta.env.VITE_USER_API_BASE_URL
const axiosInstance = createAxiosInstance(API_BASE_URL, "UserToken");
import { loadStripe } from "@stripe/stripe-js";
import { BookingDetails } from "../types/booking";
import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCouponsSuccess,
  fetchCouponsStart,
  fetchCouponsFailure,
} from "../redux/slices/couponSlice";
import {
  setWalletBalance,
  setWalletHistory,
} from "../redux/slices/walletSlice";

let userData: any = {};

const base64Decode = (str: string) => {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
};

const api = {
  sendOTP: async (email: string) => {
    try {
      const response = await axiosInstance.post("/signup", { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (email: string) => {
    try {
      const response = await axiosInstance.post("/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  setNewPassword: async (email: string, newPassword: string) => {
    try {
      const response = await axiosInstance.post("/reset-password", {
        email,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  verifyOTP: async (otp: string) => {
    try {
      const response = await axiosInstance.post("/verify-otp", {
        email: userData.email,
        otp,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  completeSignup: async () => {
    try {
      const response = await axiosInstance.post("/complete-signup", userData);
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
      const response = await axiosInstance.post("/login", { email, password });

      const accessToken = response.data.accessToken;

      localStorage.setItem("UserToken", accessToken);

      if (!accessToken) {
        console.error("Access token is missing or invalid");
        throw new Error("Access token is missing or invalid");
      }

      const payloadBase64 = accessToken.split(".")[1];
      const payload = base64Decode(payloadBase64);
      const payloadObject = JSON.parse(payload);

      const _id = payloadObject.userId || null;

      api.setUserData({ ...response.data.user, _id });

      return response.data;
    } catch (error: any) {
      console.error("Error during login:", error);
      throw new Error(error.message);
    }
  },

  googleLogin: async (
    _id: string,
    email: string,
    username: string,
    profileImage: string,
    token: string,
    isGoogle: boolean
  ) => {
    try {
      const response = await axiosInstance.post("/google-login", {
        _id,
        email,
        username,
        profileImage,
        token,
        isGoogle,
      });
      const accessToken = response.data.accessToken;
      localStorage.setItem("UserToken", accessToken);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  resendOTP: async (email: string): Promise<any> => {
    try {
      const response = await axiosInstance.post("/resend-otp", { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateUserProfile: async (userId: string, data: any) => {
    try {
      const response = await axiosInstance.patch(
        `/${userId}/update-profile`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (userId: string, data: any) => {
    try {
      const response = await axiosInstance.patch(
        `/${userId}/change-password`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllHotels: async () => {
    try {
      const response = await axiosInstance.get(`/hotel/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const hotels = response.data;
      return hotels;
    } catch (error: any) {
      console.error("Error fetching hotels:", error.message);
      throw new Error(error.message);
    }
  },
  getRoomsByHotelId: async (hotelId: string): Promise<any> => {
    try {
      const response = await axiosInstance.get(`/room/by-hotel/${hotelId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const rooms = response.data;

      return rooms;
    } catch (error: any) {
      console.error("Error fetching rooms:", error.message);
      throw new Error(error.message);
    }
  },

  handleBooking: async (
    userId: string,
    bookingDetails: Partial<BookingDetails>,
    useStripe: boolean = true
  ) => {
    try {
      if (useStripe) {
        let STRIPE_PUBLIC_KEY: string | undefined = import.meta.env
          .VITE_STRIPE_PUBLIC_KEY as string;

        if (!STRIPE_PUBLIC_KEY) {
          console.error("STRIPE_PUBLIC_KEY is undefined");
          throw new Error("STRIPE_PUBLIC_KEY is not defined");
        }

        const stripe = await loadStripe(STRIPE_PUBLIC_KEY);

        if (!stripe) {
          console.error("Failed to load Stripe.");
          throw new Error("Failed to load Stripe.");
        }

        const currency = "INR";

        const sessionResponse = await axiosInstance.post("/checkout", {
          bookingDetails,
          currency,
          userId,
        });

        const sessionData = sessionResponse.data;

        const onSuccess = async () => {
          if (sessionData && sessionData.sessionId) {
            const result = await stripe.redirectToCheckout({
              sessionId: sessionData.sessionId,
            });

            if (result?.error) {
              const msg = result.error.message;
              console.error(msg);
            }
          }
        };

        onSuccess();
      } else {
        const response = await axiosInstance.post("/checkout", {
          userId,
          bookingDetails,
        });
        return response;
      }
    } catch (error: any) {
      console.error("Error handling booking:", error.message);
      throw new Error(error.message);
    }
  },
  getBookingsByUserId: async (userId: string): Promise<any> => {
    try {
      const response = await axiosInstance.get(`/bookings/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const Bookings = response.data;
      return Bookings;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  cancelBooking:
    (bookingId: string, total: number, userId: string) =>
    async (dispatch: Dispatch) => {
      try {
        const response = await axiosInstance.patch(
          `${API_BASE_URL}/cancelBooking/${bookingId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        return response;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  refundBooking: async (
    userId: string,
    data: { amount: number; paymentMethod: string }
  ) => {
    try {
      const response = await axiosInstance.post("/refund-booking", {
        userId,
        data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  AddMoney: async (
    userId: string,
    data: { amount: number; paymentMethod: string }
  ) => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

      if (!stripe) {
        console.error("Failed to load Stripe.");
        throw new Error("Failed to load Stripe.");
      }
      const sessionResponse = await axiosInstance.post("/add-money", {
        userId,
        data,
      });

      const sessionData = sessionResponse.data;

      const onSuccess = async () => {
        if (sessionData && sessionData.sessionId) {
          const result = await stripe.redirectToCheckout({
            sessionId: sessionData.sessionId,
          });
          if (result?.error) {
            const msg = result.error.message;
            console.error(msg);
          }
        }
      };

      onSuccess();
    } catch (error) {
      throw error;
    }
  },
  getWalletByUserId: async (
    dispatch: Dispatch,
    userId: string
  ): Promise<any> => {
    try {
      const response = await axiosInstance.get(`/wallet/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const WalletDetails = response.data;
      const { walletAmount, walletTransactions } = response.data;

      dispatch(setWalletBalance(walletAmount));
      dispatch(setWalletHistory(walletTransactions));
      return WalletDetails;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  addReview: async (reviewData: {
    userId: string;
    hotelId: string;
    rating: number;
    reviewText: string;
    comment: string;
  }): Promise<any> => {
    try {
      const response = await axiosInstance.post(
        `/${reviewData.hotelId}/add-review`,
        reviewData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getReviews: async (signal?: AbortSignal): Promise<any> => {
    try {
      const response = await axiosInstance.get("/all-reviews", { signal });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const getAllCoupons = createAsyncThunk(
  "/getAllCoupons",
  async (_, { dispatch }) => {
    try {
      dispatch(fetchCouponsStart());

      const response = await axiosInstance.get(
        `${API_BASE_URL}/get-all-coupons`,
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

export default api;
