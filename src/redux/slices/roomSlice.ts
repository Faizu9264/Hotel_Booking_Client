// roomSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoomState {
  rooms: any[];
  addressFilter?: { roomName?: string };
  priceFilter?: number;
  filteredRooms: any[];
  roomDetails: {
    id: string;
    roomType: string;
    hotelName: string;
    amenities: string[];
    rentAmount: number;
    discountPrice: number;
    roomsCount: number;
    maxPeople: number;
    hotelId:string;
    description: string;
    images: string[];
  } | null;
}

const initialState: RoomState = {
  rooms: [],
  filteredRooms: [],
  priceFilter: 3500,
  roomDetails: null,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<any[]>) => {
      state.rooms = action.payload;
      state.filteredRooms = [...applyFilter(state.rooms, state.addressFilter, state.priceFilter || 0)];
    },
    setAddressFilter: (state, action: PayloadAction<{ roomName?: string } | undefined>) => {
      state.addressFilter = action.payload;
      state.filteredRooms = applyFilter(state.rooms, state.addressFilter, state.priceFilter || 0);
    },
    setPriceFilter: (state, action: PayloadAction<number | undefined>) => {
      state.priceFilter = action.payload;
      state.filteredRooms = applyFilter(state.rooms, state.addressFilter, action.payload || 0);
    },
    clearAddress: (state) => {
      state.addressFilter = undefined;
      state.filteredRooms = applyFilter(state.rooms, state.addressFilter, state.priceFilter || 0);
    },
    setRoomDetails: (state, action: PayloadAction<any>) => {
      state.roomDetails = action.payload;
    },
  },
});

const applyFilter = (rooms: any[], address: { roomName?: string } | undefined, price: number): any[] => {
  let filteredRooms = rooms;

  if (address) {
    const { roomName } = address;
    filteredRooms = filteredRooms.filter((room) => room.roomName.toLowerCase().includes(roomName?.toLowerCase() || ''));
  }

  const dynamicRentAmount = price;

  if (filteredRooms.length > 0 && filteredRooms[0].rentAmount !== undefined) {
    filteredRooms = filteredRooms.filter((room) => room.rentAmount <= dynamicRentAmount);
  }

  return filteredRooms;
};

export const { setRooms, setAddressFilter, setPriceFilter, clearAddress, setRoomDetails } = roomSlice.actions;
export default roomSlice.reducer;
