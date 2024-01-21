import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

export interface BookingState {
  guestName: string;
  email: string;
  phone: string;
  specialRequests: string;
  checkInDate: Date;
  checkOutDate: Date;
  adultCount: number;
  childrenCount: number;
  roomCount: number;
  nightCount:number;
  maxPeople: number;
  total: number;
  discountPrice: number;
  roomDetails: {
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
interface RoomDetails {
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
}

interface BookingSlice extends SliceCaseReducers<BookingState> {
  setBookingDetails: (
    state: BookingState,
    action: PayloadAction<Partial<BookingState & { roomDetails: { hotelId: string } }>>
  ) => BookingState;
}

const initialState: BookingState = {
  guestName: '',
  email: '',
  phone: '',
  specialRequests: '',
  checkInDate:new Date(),
  checkOutDate: new Date(),
  adultCount: 1,
  childrenCount: 0,
  roomCount: 1,
  nightCount:1,
  maxPeople: 1,
  total: 0,
  discountPrice: 0,
  roomDetails: {
    id: '',
    roomType: '',
    hotelName: '',
    hotelId: '',
    amenities: [],
    rentAmount: 0,
    discountPrice: 0,
    roomsCount: 0,
    maxPeople: 0,
    description: '',
    images: [], 
  },
};

const bookingSlice = createSlice<BookingState, BookingSlice>({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDetails: (state, action) => {
      return {
        ...state,
        ...action.payload,
        roomDetails: {
          ...state.roomDetails,
          ...action.payload.roomDetails,
        } as RoomDetails,
      };
    },
  },
});

export const { setBookingDetails } = bookingSlice.actions;
export const selectBookingDetails = (state: { booking: BookingState }) => state.booking;
export default bookingSlice.reducer;