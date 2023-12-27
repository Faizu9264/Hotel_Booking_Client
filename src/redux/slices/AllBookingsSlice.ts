import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

export interface Booking {
  _id: string;
  guestName: string;
  email: string;
  phone: string;
  specialRequests: string;
  checkInDate: Date;
  checkOutDate: Date;
  adultCount: number;
  childrenCount: number;
  roomCount: number;
  nightCount: number;
  maxPeople: number;
  total: number;
  discountPrice: number;
  paymentStatus: string;
  BookingStatus: string;
  RoomId: {
    id: string;
    roomType: string;
    hotelName: string;
    hotelId: string;
    amenities: string[];
    rentAmount: number;
    discountPrice: number;
    roomsCount: number;
    maxPeople: number;
    description: string;
    images: string[];
  };
}

interface AllBookingsSlice extends SliceCaseReducers<{ allBookings: Booking[] }> {
  addBooking: (state: { allBookings: Booking[] }, action: PayloadAction<Booking[]>) => void;
  updateBookingStatus: (
    state: { allBookings: Booking[] },
    action: PayloadAction<{ bookingId: string; bookingStatus: string }>
  ) => void;
}

const initialState: { allBookings: Booking[] } = {
  allBookings: [],
};


const allBookingsSlice = createSlice({
  name: 'allBookings',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      const uniqueBookings = action.payload.filter(
        (newBooking: Booking) => !state.allBookings.some((existingBooking) => existingBooking._id === newBooking._id)
      );      

      state.allBookings = [...state.allBookings, ...uniqueBookings];
    },

    updateBookingStatus: (state, action) => {
      const { bookingId, bookingStatus } = action.payload;
      const index = state.allBookings.findIndex((booking) => booking._id === bookingId);

      if (index !== -1) {
        state.allBookings[index].BookingStatus = bookingStatus;
      }
    },
  },
});


export const { addBooking, updateBookingStatus } = allBookingsSlice.actions;
export const selectAllBookings = (state: { allBookings: Booking[] }) => state.allBookings;

export default allBookingsSlice.reducer;
