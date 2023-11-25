

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { getHotels as apiGetHotels } from '../../services/hotelApi';
// import { createAction } from '@reduxjs/toolkit';

// export const updateLocation = createAction<{ lng: number; lat: number }>('UPDATE_LOCATION');

// export const addImage = createAction<string>('ADD_IMAGE');

// export const updateAlert = createAction<{ open: boolean; severity: string; message: string }>('UPDATE_ALERT');

// export const deleteImage = createAction<string>('DELETE_IMAGE');
// export const updateImages = createAction<string[]>('UPDATE_IMAGES');

// export const getHotels = createAsyncThunk('hotels/getHotels', async () => {

//   const response = await apiGetHotels();
//   return response.data;
// });

// // src/redux/actions/hotelActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getHotels as apiGetHotels } from '../../services/hotelApi';

export const getHotels = createAsyncThunk('hotels/getHotels', async () => {
  const response = await apiGetHotels();
  return response.data;
});

