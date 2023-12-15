// path-to-your/singleRoomSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SingleRoomState {
  roomDetails: {
    id: string;
    roomType: string;
    hotelName: string;
    hotelId:string;
    amenities: string[];
    rentAmount: number;
    discountPrice: number;
    roomsCount: number;
    maxPeople: number;
    description: string;
    images: string[];
  };
}

const initialState: SingleRoomState = {
  roomDetails: {
    id: '',
    roomType: '',
    hotelName: '',
    hotelId:'',
    amenities: [],
    rentAmount: 0,
    discountPrice: 0,
    roomsCount: 0,
    maxPeople: 0,
    description: '',
    images: [], 
  },
};

const singleRoomSlice = createSlice({
  name: 'singleRoom',
  initialState,
  reducers: {
    setSingleRoomDetails: (state, action: PayloadAction<any>) => {
      state.roomDetails = action.payload;
    },
    clearSingleRoomDetails: (state) => {
      state.roomDetails = initialState.roomDetails;
    },
    updateSingleRoomDetails: (state, action: PayloadAction<any>) => {
      state.roomDetails = {
        ...state.roomDetails,
        ...action.payload,
      };
    },    
    addImageToRoom: (state, action: PayloadAction<string>) => {
      state.roomDetails.images.push(action.payload);
    },
    removeImageFromRoom: (state, action: PayloadAction<string>) => {
      state.roomDetails.images = state.roomDetails.images.filter(
        (image) => image !== action.payload
      );
    },
    updateRoomImages: (state, action: PayloadAction<string[]>) => {
      state.roomDetails.images = action.payload;
    },
  },
});

export const {
  setSingleRoomDetails,
  clearSingleRoomDetails,
  updateSingleRoomDetails,
  addImageToRoom,
  removeImageFromRoom,
  updateRoomImages,
} = singleRoomSlice.actions;

export default singleRoomSlice.reducer;
