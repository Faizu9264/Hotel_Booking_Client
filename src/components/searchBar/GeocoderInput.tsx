// GeocoderInput.tsx
import React, { useEffect, useRef } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useDispatch } from 'react-redux';
import { clearAddress, setAddressFilter } from '../../redux/slices/hotelSlice';

const ctrl = new MapboxGeocoder({
  marker: false,
  accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
});

const GeocoderInput: React.FC = () => {
  const dispatch = useDispatch();
  const mapRef = useRef<any>(null);
  const containerRef = useRef<any>();

  useEffect(() => {
    console.log('GeocoderInput useEffect');

    if (!mapRef.current) {
      return;
    }

    if (containerRef.current) {
      const firstChild = containerRef.current.children[0] as HTMLElement | null;
      if (firstChild) {
        firstChild.remove();
      }
    }

    console.log('containerRef.current:', containerRef.current);

    const map = mapRef.current?.getMap();
    console.log('map:', map);

    if (map && containerRef.current) {
      const mapElement = containerRef.current as HTMLElement;
      mapElement.appendChild(ctrl.onAdd(map));

      ctrl.on('result', (e) => {
        const coords = e.result.geometry.coordinates;
        const hotelName = e.result.text;
        dispatch(setAddressFilter({ longitude: coords[0], latitude: coords[1], hotelName }));
      });

      ctrl.on('clear', () => dispatch(clearAddress()));
    }
  }, [mapRef, containerRef, dispatch]);

  return <div ref={containerRef}></div>;
};

export default GeocoderInput;
