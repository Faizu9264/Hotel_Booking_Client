// Geocoder.tsx
import React, { useState, useCallback } from "react";
import { useValue } from "../../../../context/ContextProvider";
import { useMap } from "react-leaflet";

const Geocoder = () => {
  const { dispatch } = useValue();
  const [address, setAddress] = useState("");
  const map = useMap();

  const handleSearch = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=0c89fc18019241bdb4af360b41cfea1b`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch geocoding data");
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const latLng = data.results[0].geometry;

        dispatch({
          type: "UPDATE_LOCATION",
          payload: { lng: latLng.lng, lat: latLng.lat },
        });

        map.setView([latLng.lat, latLng.lng], 13);

      } else {
        console.error("No results found for the selected address.");
      }
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  }, [dispatch, address, map]);

  const handleSelect = async (value: string) => {
    setAddress(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
          visibility: "visible",
          position: "absolute",
          top: 10,
          left: "79%",
          width: "20%",
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
