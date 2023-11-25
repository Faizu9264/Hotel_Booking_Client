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
  images: string[];  // Add this line
}

const initialState: HotelState = {
  hotels: [],
  loading: false,
  error: null,
  location: { lng: 0, lat: 0 },
  details: { title: '', description: '', images: [] },
  images: [],  // Add this line
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    updateLocation: (state, action: PayloadAction<{ lng: number; lat: number }>) => {
      state.location = action.payload;
    },
    addImage: (state, action: PayloadAction<string>) => {
      state.details.images.push(action.payload);
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

export const selectHotels = (state: RootState) => state.hotel.hotels;

export default hotelSlice.reducer;
