// hotelSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HotelState {
  hotels: any[]; 
}

const initialState: HotelState = {
  hotels: [],
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotels: (state, action: PayloadAction<any[]>) => {
      state.hotels = action.payload;
    },
  },
});

export const { setHotels } = hotelSlice.actions;
export default hotelSlice.reducer;
