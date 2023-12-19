// path-to-your/singleRoomSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '../../types/RoomType';

interface SingleRoomState {
  room: any[];
  roomDetails: {
    selectedRoom: Room; 
  };
}


const initialState: SingleRoomState = {
  room:[],
  roomDetails: {
    selectedRoom: {
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
  }},
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
      state.roomDetails.selectedRoom.images.push(action.payload);
    },
    removeImageFromRoom: (state, action: PayloadAction<string>) => {
      state.roomDetails.selectedRoom.images = state.roomDetails.selectedRoom.images.filter(
        (image) => image !== action.payload
      );
    },
    updateRoomImages: (state, action: PayloadAction<string[]>) => {
      state.roomDetails.selectedRoom.images = action.payload;
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
