import React from 'react';
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useDispatch } from 'react-redux';
import { updateLocation } from '../../../../redux/actions/hotelActions';

const Geocoder = () => {
  const dispatch = useDispatch();

  const ctrl = new MapBoxGeocoder({
    accessToken: process.env.REACT_APP_MAP_TOKEN || '',
    marker: false,
    collapsed: true,
  });

  useControl(() => ctrl);

  ctrl.on('result', (e: any) => {
    const coords = e.result.geometry.coordinates;
    dispatch(updateLocation({ lng: coords[0], lat: coords[1] }));
  });

  return null;
};

export default Geocoder;
