// // hotelSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface HotelState {
//   hotels: any[]; 
// }

// const initialState: HotelState = {
//   hotels: [],
// };

// const hotelSlice = createSlice({
//   name: 'hotel',
//   initialState,
//   reducers: {
//     setHotels: (state, action: PayloadAction<any[]>) => {
//       state.hotels = action.payload;
//     },
//   },
// });

// export const { setHotels } = hotelSlice.actions;
// export default hotelSlice.reducer;



// hotelSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HotelState {
  hotels: any[];
  addressFilter?: { longitude?: number; latitude?: number; hotelName?: string };
  priceFilter?: number;
  filteredHotels: any[];
}

const initialState: HotelState = {
  hotels: [],
  filteredHotels: [],
  priceFilter: 3500,
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotels: (state, action: PayloadAction<any[]>) => {
      state.hotels = action.payload;
      state.filteredHotels = applyFilter(state.hotels, state.addressFilter, state.priceFilter || 0);
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

  if (price < 3500) {
    filteredHotels = filteredHotels.filter(hotel => hotel.minimumRent <= price);
  }

  return filteredHotels;
};

export const { setHotels, setAddressFilter, setPriceFilter, clearAddress } = hotelSlice.actions;
export default hotelSlice.reducer;
