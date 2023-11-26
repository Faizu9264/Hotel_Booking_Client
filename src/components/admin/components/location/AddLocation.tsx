// AddLocation.tsx
// AddLocation.tsx
import React, { useEffect, useRef } from 'react';
import { useValue } from '../../../../context/ContextProvider';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Geocoder from './Geocoder';
import ChangeView from './ChangeView';
import { ErrorBoundary } from 'react-error-boundary';

const AddLocation = () => {
  const {
    state: {
      location: { lng, lat },
    },
    dispatch,
  } = useValue();

  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (lng !== null && lat !== null && mapRef.current) {
      mapRef.current.setView([lat, lng], 8);
    }
  }, [lng, lat]);

  useEffect(() => {
    console.log('Updated Location:', { lng, lat });
  }, [lng, lat]);

  const fallback = ({ error, resetErrorBoundary }: any) => (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );

  return (
    <ErrorBoundary FallbackComponent={fallback}>
      <div
        style={{
          height: 330,
          position: 'relative',
        }}
      >
        {/* Geocoder is now a child of MapContainer */}
        <MapContainer
          center={[lat || 0, lng || 0]}
          zoom={8}
          style={{ width: '100%', height: '100%' }}
        >
          <Geocoder />
          <ChangeView center={[lat || 0, lng || 0]} zoom={8} />
          <Marker
            position={[lat || 0, lng || 0]}
            draggable={true}
            eventHandlers={{
              dragend: (e: any) => {
                const { lat, lng } = e.target._latlng;
                dispatch({
                  type: 'UPDATE_LOCATION',
                  payload: { lng, lat },
                });
              },
            }}
          />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </ErrorBoundary>
  );
};

export default AddLocation;


// import React, { useEffect, useRef, useState } from 'react';
// import { Box } from '@mui/material';
// import ReactMapGL, {
//   GeolocateControl,
//   Marker,
//   NavigationControl,
//   ViewState,
//   LngLat,
//   MapRef,
// } from 'react-map-gl';
// import { useValue } from '../../../../context/ContextProvider';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import Geocoder from './Geocoder';

// interface Location {
//   lng: number;
//   lat: number;
// }

// const AddLocation: React.FC = () => {
//   const {
//     state: {
//       location: { lng, lat },
//     },
//     dispatch,
//   } = useValue();

//   const mapRef = useRef<MapRef | null>(null);

//   const [initialViewState, setInitialViewState] = useState<ViewState>({
//     longitude: lng || 0,
//     latitude: lat || 0,
//     zoom: 8,
//     bearing: 0,
//     pitch: 0,
//     padding: { top: 0, bottom: 0, left: 0, right: 0 },
//   });

//   useEffect(() => {
//     if (!lng && !lat) {
//       fetch('https://ipapi.co/json')
//         .then((response) => response.json())
//         .then((data) => {
//           mapRef.current?.getMap().flyTo({
//             center: [data.longitude, data.latitude],
//           });

//           dispatch({
//             type: 'UPDATE_LOCATION',
//             payload: { lng: data.longitude, lat: data.latitude },
//           });
//         });
//     }
//   }, [dispatch, lng, lat]);

//   return (
//     <Box
//       sx={{
//         height: 400,
//         position: 'relative',
//       }}
//     >
//       <ReactMapGL
//         ref={mapRef}
//         mapboxAccessToken={import.meta.env.REACT_APP_MAP_TOKEN}
//         {...initialViewState}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//       >
//         <Marker
//   latitude={lat || 0}
//   longitude={lng || 0}
//   draggable
//   onDragEnd={(e) =>
//     dispatch({
//       type: 'UPDATE_LOCATION',
//       payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
//     })
//   }
// />
//         <NavigationControl position="bottom-right" />
//         <GeolocateControl
//           position="top-left"
//           trackUserLocation
//           onGeolocate={(e) =>
//             dispatch({
//               type: 'UPDATE_LOCATION',
//               payload: { lng: e.coords.longitude, lat: e.coords.latitude },
//             })
//           }
//         />
//         <Geocoder />
//       </ReactMapGL>
//     </Box>
//   );
// };

// export default AddLocation;




// // AddLocation.tsx
// import React, { useEffect, useRef } from 'react';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import Geocoder from './Geocoder';
// import { useValue } from '../../../../context/ContextProvider';

// const AddLocation = () => {
//   const { state, dispatch } = useValue();
//   const { lng, lat } = state.location;
//   const mapRef = useRef<google.maps.Map | null>(null);

//   useEffect(() => {
//     if (!lng && !lat) {
//       fetch('https://ipapi.co/json')
//         .then((response) => response.json())
//         .then((data) => {
//           mapRef.current?.panTo({
//             lat: data.latitude,
//             lng: data.longitude,
//           });
//           dispatch({
//             type: 'UPDATE_LOCATION',
//             payload: { lng: data.longitude, lat: data.latitude },
//           });
//         });
//     }
//   }, [dispatch, lat, lng]);

//   const containerStyle = {
//     width: '100%',
//     height: '100%',
//   };

//   return (
//     <div className="h-96 relative">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={{ lat: lat, lng: lng }}
//         zoom={8}
//         onLoad={(map) => mapRef.current?.panTo({ lat: lat, lng: lng })}
//       >
//         <Marker
//           position={{ lat: lat, lng: lng }}
//           draggable
//           onDragEnd={(e) => {
//             if (e.latLng) {
//               dispatch({
//                 type: 'UPDATE_LOCATION',
//                 payload: { lng: e.latLng.lng(), lat: e.latLng.lat() },
//               });
//             }
//           }}
//         />
//         {/* Other components like controls or additional markers can be added here */}
//         <Geocoder />
//       </GoogleMap>
//     </div>
//   );
// };

// export default AddLocation;






// import React, { useEffect, useRef, useState } from 'react';
// import { Box } from '@mui/material';
// import { Map, Marker, NavigationControl, GeolocateControl, MapRef } from 'react-map-gl';
// import Geocoder from './Geocoder';
// import 'maplibre-gl/dist/maplibre-gl.css';
// import { useValue } from '../../../../context/ContextProvider';

// interface Location {
//   lng: number;
//   lat: number;
// }

// const AddLocation: React.FC = () => {
//   const {
//     state: {
//       location: { lng, lat },
//     },
//     dispatch,
//   } = useValue();

//   const mapRef = useRef<MapRef | null>(null);

//   const [initialViewState, setInitialViewState] = useState({
//     longitude: lng || 0,
//     latitude: lat || 0,
//     zoom: 8,
//     bearing: 0,
//     pitch: 0,
//     padding: { top: 0, bottom: 0, left: 0, right: 0 },
//   });

//   useEffect(() => {
//     if (!lng && !lat) {
//       fetch('https://ipapi.co/json')
//         .then((response) => response.json())
//         .then((data) => {
//           mapRef.current?.getMap().flyTo({
//             center: [data.longitude, data.latitude],
//           });

//           dispatch({
//             type: 'UPDATE_LOCATION',
//             payload: { lng: data.longitude, lat: data.latitude },
//           });
//         });
//     }
//   }, [dispatch, lng, lat]);

//   return (
//     <Box
//       sx={{
//         height: 400,
//         position: 'relative',
//       }}
//     >
//       <Map
//   ref={mapRef}
//   {...initialViewState}
//   style={{ width: '100%', height: '100%' }}
//   mapStyle="https://api.maplibre.com/styles/v1/maplibre/streets-v11"
// >
//         <Marker
//           latitude={lat || 0}
//           longitude={lng || 0}
//           draggable
//           onDragEnd={(e) =>
//             dispatch({
//               type: 'UPDATE_LOCATION',
//               payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
//             })
//           }
//         />
//         <NavigationControl position="bottom-right" />
//         <GeolocateControl
//           position="top-left"
//           trackUserLocation
//           onGeolocate={(e) =>
//             dispatch({
//               type: 'UPDATE_LOCATION',
//               payload: { lng: e.coords.longitude, lat: e.coords.latitude },
//             })
//           }
//         />
//         <Geocoder />
//       </Map>
//     </Box>
//   );
// };

// export default AddLocation;


