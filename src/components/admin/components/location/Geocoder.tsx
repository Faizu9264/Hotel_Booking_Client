
//with mapbox

// import React from 'react';
// import MapBoxGeocoder, {  GeocoderOptions  } from '@mapbox/mapbox-gl-geocoder';
// import { useControl } from 'react-map-gl';
// import { useValue } from '../../../../context/ContextProvider';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

// const Geocoder: React.FC = () => {
//   const { dispatch } = useValue();
  
//   const geocoderOptions:  GeocoderOptions  = {
//     accessToken:import.meta.env.REACT_APP_MAP_TOKEN,
//     marker: false,
//     collapsed: true,
//   };

//   const ctrl = new MapBoxGeocoder(geocoderOptions);

//   useControl(() => ctrl);

//   ctrl.on('result', (e) => {
//     const coords = e.result.geometry.coordinates;
//     dispatch({
//       type: 'UPDATE_LOCATION',
//       payload: { lng: coords[0], lat: coords[1] },
//     });
//   });

//   return null;
// };

// export default Geocoder;

//with leaflet
// Geocoder.tsx
// Geocoder.tsx
import React, { useState, useCallback } from 'react';
import { useValue } from '../../../../context/ContextProvider';
import { useMap } from 'react-leaflet';

const Geocoder = () => {
  const { dispatch } = useValue();
  const [address, setAddress] = useState('');
  const map = useMap();

  const handleSearch = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=0c89fc18019241bdb4af360b41cfea1b`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch geocoding data');
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const latLng = data.results[0].geometry;

        dispatch({
          type: 'UPDATE_LOCATION',
          payload: { lng: latLng.lng, lat: latLng.lat },
        });

        map.setView([latLng.lat, latLng.lng], 8);

        console.log('Selected Address:', address);
      } else {
        console.error('No results found for the selected address.');
      }
    } catch (error) {
      console.error('Error selecting address:', error);
    }
  }, [dispatch, address, map]);

  const handleSelect = async (value: string) => {
    setAddress(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        placeholder="Search Places ..."
        className="location-search-input w-full p-2 border rounded text-blue"
        style={{
          zIndex: 1000,
          visibility: 'visible',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <button onClick={handleSearch}>Search</button>

      {address && <p>Selected Address: {address}</p>}
    </div>
  );
};

export default Geocoder;





//with maplibre

// import React from 'react';
// import MapLibreGeocoder, { GeocoderOptions, MapboxGeocoderEvent } from '@maplibre/maplibre-gl-geocoder';
// import { useControl } from 'react-map-gl';
// import { useValue } from '../../../../context/ContextProvider';
// import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';

// const Geocoder: React.FC = () => {
//   const { dispatch } = useValue();

//   const geocoderOptions: GeocoderOptions = {
//     marker: false,
//     collapsed: true,
//   };

//   const ctrl = new MapLibreGeocoder(geocoderOptions);

//   useControl(() => ctrl);

//   ctrl.on('result', (e: MapboxGeocoderEvent) => {
//     const coords = e.result.geometry.coordinates;
//     dispatch({
//       type: 'UPDATE_LOCATION',
//       payload: { lng: coords[0], lat: coords[1] },
//     });
//   });

//   return null;
// };

// export default Geocoder;
