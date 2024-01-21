// allReviewsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../../types/Review';

interface AllReviewsState {
  allReviews: Review[];
  averageRatings: Record<string, number>; 
}

const initialState: AllReviewsState = {
  allReviews: [],
  averageRatings: {},
};

const allReviewsSlice = createSlice({
  name: 'allReviews',
  initialState,
  reducers: {
    setAllReviews: (state, action: PayloadAction<Review[]>) => {
      state.allReviews = action.payload;
    },
    setAverageRating: (state, action: PayloadAction<{ hotelId: string; averageRating: number }>) => {
      const { hotelId, averageRating } = action.payload;
      state.averageRatings[hotelId] = averageRating;
    },
  },
});

export const { setAllReviews, setAverageRating } = allReviewsSlice.actions;
export const selectAllReviews = (state: { allReviews: AllReviewsState }) => state.allReviews;

export default allReviewsSlice.reducer;
