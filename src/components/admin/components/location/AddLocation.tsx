// AddLocation.tsx
import React, { useEffect, useRef } from "react";
import { useValue } from "../../../../context/ContextProvider";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Geocoder from "./Geocoder";
import ChangeView from "./ChangeView";
import { ErrorBoundary } from "react-error-boundary";
import { RootState } from "src/redux/store";
import { useSelector } from "react-redux/es/hooks/useSelector";

const AddLocation = () => {
  const {
    state: {
      location: { lng, lat },
    },
    dispatch,
  } = useValue();

  const hotelId = new URLSearchParams(window.location.search).get("hotelId");
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const isEditMode = Boolean(
    new URLSearchParams(window.location.search).get("hotelId")
  );

  useEffect(() => {
    if (hotels.length > 0 && isEditMode) {
      const hotelToUpdate = hotels.find((hotel: any) => hotel._id === hotelId);

      if (hotelToUpdate) {
        dispatch({
          type: "UPDATE_LOCATION",
          payload: {
            lat: hotelToUpdate.location.lat,
            lng: hotelToUpdate.location.lng,
          },
        });
      }
    }
  }, [isEditMode, hotelId, hotels, dispatch]);

  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (lng !== null && lat !== null && mapRef.current) {
      mapRef.current.setView([lat, lng], 8);
    }
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
          position: "relative",
        }}
      >
        {/* Geocoder is now a child of MapContainer */}
        <MapContainer
          center={[lat || 0, lng || 0]}
          zoom={8}
          style={{ width: "100%", height: "100%" }}
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
                  type: "UPDATE_LOCATION",
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
