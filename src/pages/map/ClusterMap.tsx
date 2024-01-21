import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Avatar, Box, Paper, Tooltip } from "@mui/material";
import SuperCluster from "supercluster";

import PopupHotel from "./PopupHotel";
import PriceSlider from "../../components/searchBar/PriceSlider";
import GeocoderInput from "../../components/searchBar/GeocoderInput";
import "./cluster.css";
import { Hotel } from "../../types/hotel";
import { PointFeature } from "src/types/map";

const superCluster = new SuperCluster({
  radius: 75,
  maxZoom: 20,
});

const MapScreen: React.FC = () => {
  const hotels = useSelector((state: RootState) => state.hotel.filteredHotels);
  const mapRef = useRef<any>(null);

  const [points, setPoints] = useState<PointFeature[]>([]);
  const [clusters, setClusters] = useState<PointFeature[]>([]);
  const [bounds, setBounds] = useState<number[]>([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState<number>(0);
  const [popupInfo, setPopupInfo] = useState<PointFeature | null>(null);

  const handleSearchLocation = async (location: string) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          location
        )}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
      );
      const data = await response.json();
      const [longitude, latitude] = data.features[0].center;
      mapRef?.current?.flyTo({
        center: [longitude, latitude],
        zoom: 12,
        speed: 1,
      });
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  useEffect(() => {
    const updatedPoints: PointFeature[] = hotels.map((hotel: Hotel) => ({
      type: "Feature",
      properties: {
        cluster: false,
        hotelId: hotel._id,
        hotelName: hotel.details.hotelName,
        email: hotel.details.emailAddress,
        minimumRent: hotel.details.minRent,
        place: hotel.details.location,
        description: hotel.details.description,
        hotelImage: hotel.images,
        contactNo: hotel.details.contactNo,
        longitude: hotel.location.lng,
        latitude: hotel.location.lat,
        dropImage: hotel.images[0],
      },
      geometry: {
        type: "Point",
        coordinates: [hotel.location.lng, hotel.location.lat],
      },
    }));
    setPoints(updatedPoints);
  }, [hotels]);

  useEffect(() => {
    superCluster.load(points);
    const newClusters: PointFeature[] = superCluster.getClusters(
      bounds as any,
      zoom
    ) as PointFeature[];
    setClusters(newClusters);
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef?.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: 400,
        }}
      >
        <ReactMapGL
          style={{ width: "100%" }}
          initialViewState={{ latitude: 11, longitude: 76, zoom: 0 }}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN as string}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          ref={mapRef}
          onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom as number))}
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            showUserLocation={true}
            position="top-left"
          />

          {clusters.map((cluster) => {
            const { cluster: isCluster, point_count } =
              cluster.properties as any;
            const [longitude, latitude] = cluster.geometry.coordinates;
            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}`}
                  longitude={longitude}
                  latitude={latitude}
                >
                  <div
                    className="cluster-marker"
                    style={{
                      width: `${10 + (point_count / points.length) * 20}px`,
                      height: `${10 + (point_count / points.length) * 20}px`,
                    }}
                    onClick={() => {
                      const zoom = Math.min(
                        superCluster.getClusterExpansionZoom(
                          Number(cluster.id)
                        ),
                        20
                      );
                      mapRef?.current?.flyTo({
                        center: [longitude, latitude],
                        zoom,
                        speed: 1,
                      });
                    }}
                  >
                    {point_count}
                  </div>
                </Marker>
              );
            }

            return (
              <Marker
                key={`hotel-${cluster.properties.hotelId}`}
                longitude={longitude}
                latitude={latitude}
              >
                <Tooltip title={cluster.properties.hotelName}>
                  <Avatar
                    src={cluster.properties.dropImage}
                    component={Paper}
                    elevation={2}
                    onClick={() => setPopupInfo(cluster)}
                  />
                </Tooltip>
              </Marker>
            );
          })}
          <Box
            sx={{
              position: "absolute",
              bottom: 285,
              left: 70,
              zIndex: 1,
              backgroundColor: "lightblue",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <PriceSlider />
          </Box>

          <GeocoderInput onSearch={handleSearchLocation} />
          {popupInfo && (
            <Popup
              longitude={popupInfo.geometry.coordinates[0]}
              latitude={popupInfo.geometry.coordinates[1]}
              maxWidth="auto"
              closeOnClick={false}
              focusAfterOpen={false}
              onClose={() => setPopupInfo(null)}
            >
              <PopupHotel {...{ popupInfo }} />
            </Popup>
          )}
        </ReactMapGL>
      </Box>
    </>
  );
};

export default MapScreen;
