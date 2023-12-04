// mapSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import L from 'leaflet';

interface MapState {
  mapRef: React.RefObject<L.Map> | null;
}

const initialState: MapState = {
  mapRef: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapRef: (state, action: PayloadAction<React.RefObject<L.Map> | null>) => {
      state.mapRef = action.payload;
    },
  },
});

export const { setMapRef } = mapSlice.actions;
export default mapSlice.reducer;
