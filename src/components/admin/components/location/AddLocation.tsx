import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { updateLocation } from '../../../../redux/slices/hotelSlice';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AddLocation = () => {
  const dispatch = useDispatch();
  const { lng, lat } = useSelector((state: RootState) => state.hotel.location);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!lng && !lat && mapRef.current) {
      fetch('https://ipapi.co/json')
        .then((response) => response.json())
        .then((data) => {
          mapRef.current.setView([data.latitude, data.longitude], 8);
          dispatch(updateLocation({ lng: data.longitude, lat: data.latitude }));
        })
        .catch((error) => {
          console.error('Error fetching location:', error);
        });
    }
  }, [dispatch, lng, lat]);

  return (
    <Box
      sx={{
        height: 330,
        position: 'relative',
      }}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={8}
        style={{ width: '100%', height: '100%' }}
      >
        <Marker
          position={[lat, lng]}
          draggable={true}
          eventHandlers={{
            dragend: (e: any) => {
              const { lat, lng } = e.target.getLatLng();
              dispatch(updateLocation({ lat, lng }));
            },
          }}
        />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </Box>
  );
};

export default AddLocation;
