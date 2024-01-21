// slices/couponSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Coupon {
  _id: string;
  code: string;
  discountType: string;
  discountAmount: number;
  discountPercentage: number;
  maxDiscount: number;
  minCart: number;
  expiryDate: string;
  description: string;
  couponCount: number;
  createdAt: Date;
  isApplied: boolean; 
}

interface CouponState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  coupons: [],
  loading: false,
  error: null,
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    fetchCouponsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCouponsSuccess(state, action: PayloadAction<Coupon[]>) {
      state.coupons = action.payload.map((coupon) => ({
        ...coupon,
        isApplied: true,
      }));
      state.loading = false;
      state.error = null;
    },
    fetchCouponsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    cancelCoupon(state, action: PayloadAction<string>) {
      const couponId = action.payload;
      const coupon = state.coupons.find((c) => c._id === couponId);
      if (coupon) {
        coupon.isApplied = false;
      }
    },
  },
});

export const {
  fetchCouponsStart,
  fetchCouponsSuccess,
  fetchCouponsFailure,
  cancelCoupon,
} = couponSlice.actions;

export default couponSlice.reducer;
