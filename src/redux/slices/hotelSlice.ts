
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HotelState {
  hotels: any[];
  addressFilter?: { longitude?: number; latitude?: number; hotelName?: string };
  priceFilter?: number;
  filteredHotels: any[];
  hotelDetails: {
    id: string;
    hotelName: string;
    location: string;
    contactNo: string;
    emailAddress: string;
    minRent: number;
    amenities: string[];
    description: string;
    images: string[];
  } | null;
}

const initialState: HotelState = {
  hotels: [],
  filteredHotels: [],
  priceFilter: 3500,
  hotelDetails: null, 
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotels: (state, action: PayloadAction<any[]>) => {
      state.hotels = action.payload;
      state.filteredHotels = [...applyFilter(state.hotels, state.addressFilter, state.priceFilter || 0)];
    },
    setAddressFilter: (state, action: PayloadAction<{ longitude?: number; latitude?: number; hotelName?: string } | undefined>) => {
      state.addressFilter = action.payload;
      state.filteredHotels = applyFilter(state.hotels, state.addressFilter, state.priceFilter || 0);
    },
    setPriceFilter: (state, action: PayloadAction<number | undefined>) => {
      state.priceFilter = action.payload;
      state.filteredHotels = applyFilter(state.hotels, state.addressFilter, action.payload || 0);
    },
    clearAddress: (state) => {
      state.addressFilter = undefined;
      state.filteredHotels = applyFilter(state.hotels, state.addressFilter, state.priceFilter || 0);
    },
    setHotelDetails: (state, action: PayloadAction<any>) => {
      state.hotelDetails = action.payload;
    },
  },
});

const applyFilter = (hotels: any[], address: { longitude?: number; latitude?: number; hotelName?: string } | undefined, price: number): any[] => {
  let filteredHotels = hotels;

  if (address) {
    const { longitude, latitude } = address;
    filteredHotels = filteredHotels.filter(hotel => {
      const longitudeDifference = longitude && hotel.longitude ? Math.abs(longitude - hotel.longitude) : 0;
      const latitudeDifference = latitude && hotel.latitude ? Math.abs(latitude - hotel.latitude) : 0;
      return longitudeDifference <= 1 && latitudeDifference <= 1;
    });
  }

  const dynamicMinRent = price;

  if (filteredHotels.length > 0 && filteredHotels[0].details && filteredHotels[0].details.minRent !== undefined) {
    filteredHotels = filteredHotels.filter(hotel => hotel.details.minRent <= dynamicMinRent);
  }

  return filteredHotels;
};

export const { setHotels, setAddressFilter, setPriceFilter, clearAddress, setHotelDetails } = hotelSlice.actions;
export default hotelSlice.reducer;
