// hotelSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Hotel } from '../../types/hotelActionTypes';
import { getHotels } from '../../redux/actions/hotelActions';

interface HotelState {
  hotels: Hotel[];
  loading: boolean;
  error: string | null | undefined;
  location: { lng: number; lat: number };
  details: {
    title: string;
    description: string;
    images: string[];
  };
}

const initialState: HotelState = {
  hotels: [],
  loading: false,
  error: null,
  location: { lng: 0, lat: 0 },
  details: { title: '', description: '', images: [] },
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    updateLocation: (state, action: PayloadAction<{ lng: number; lat: number }>) => {
      state.location = action.payload;
    },
    addImage: (state, action: PayloadAction<string | string[]>) => {
      // Convert single URL to an array for consistency
      const urls = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.details.images.push(...urls);
    },
    deleteImage: (state, action: PayloadAction<string>) => {
      state.details.images = state.details.images.filter((image) => image !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHotels.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
      })
      .addCase(getHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateLocation, addImage, deleteImage } = hotelSlice.actions;

export const selectHotelDetails = (state: RootState) => state.hotel.details;

export default hotelSlice.reducer;
