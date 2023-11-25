// hotelSelectors.ts
import { RootState } from '../store';

export const selectHotels = (state: RootState) => state.hotel.hotels;
export const selectImages = (state: RootState) => state.hotel.details.images;
export const selectHotelLoading = (state: RootState) => state.hotel.loading;
export const selectHotelError = (state: RootState) => state.hotel.error;
