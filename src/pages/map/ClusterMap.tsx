
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ReactMapGL, { GeolocateControl, ViewState, Marker, Popup  } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Avatar, Box, Paper, Tooltip } from '@mui/material';
import SuperCluster from 'supercluster';
import api from '../../services/userApi';
import { setHotels } from '../../redux/slices/hotelSlice';
import PopupHotel from './PopupHotel';
import PriceSlider from '../../components/searchBar/PriceSlider';
import GeocoderInput from '../../components/searchBar/GeocoderInput';
import './cluster.css';
interface Hotel {
  _id: string;
  details: {
    hotelName: string;
    minRent: number;
    location: string;
    emailAddress: string;
    description: string;
    contactNo: number;
  };
  images: string[];
  location: { lat: number; lng: number };
  dropImage: string;
  createdAt: Date;
}

interface PointFeature {
  type: 'Feature';
  properties: {
    cluster: boolean;
    hotelId: string;
    hotelName: string;
    minimumRent: number;
    description: string;
    hotelImage: string[];
    longitude: number;
    latitude: number;
    dropImage: string;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  id?: string;
}

const superCluster = new SuperCluster({
  radius: 75,
  maxZoom: 20,
});

const MapScreen: React.FC = () => {
  const dispatch = useDispatch<any>();
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const mapRef = useRef<any>(null);

  const [points, setPoints] = useState<PointFeature[]>([]);
  const [clusters, setClusters] = useState<PointFeature[]>([]);
  const [bounds, setBounds] = useState<number[]>([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState<number>(0);
  const [popupInfo, setPopupInfo] = useState<PointFeature | null>(null);

  const updateLocation = (coords: { longitude: number; latitude: number }) => {
    // Example: dispatch(updateLocationAction(coords));
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.getAllHotels();
  //       dispatch(setHotels(response as any));
  //     } catch (error) {
  //       console.error('Error fetching hotel data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const updatedPoints: PointFeature[] = hotels.map((hotel: Hotel) => ({
      type: 'Feature',
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
        type: 'Point',
        coordinates: [hotel.location.lng, hotel.location.lat],
      },
    }));
    setPoints(updatedPoints);
  }, [hotels]);

  useEffect(() => {
    superCluster.load(points);
    const newClusters: PointFeature[] = superCluster.getClusters(bounds as any, zoom) as PointFeature[];
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
          position: 'relative',
          height: 400,
        }}
      >
     <ReactMapGL
        style={{ width:'100%'}}
        initialViewState={{ latitude: 11, longitude: 76, zoom: 0 }}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN as string}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        ref={mapRef}
        onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom as number))}
      >
          <GeolocateControl
            style={{ position: 'absolute', top: 0, left: 0, margin: 10 }}
            trackUserLocation
            onGeolocate={(e: any) =>
              dispatch(updateLocation({ longitude: e.coords.longitude, latitude: e.coords.latitude }))
            }
          />

        {clusters.map((cluster) => {
          const { cluster: isCluster, point_count } = cluster.properties as any;
          const [longitude, latitude] = cluster.geometry.coordinates;
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                longitude={longitude}
                latitude={latitude}
              >
                <div className="cluster-marker" style={{
                  width:`${10+(point_count/points.length)*20}px`,
                  height:`${10+(point_count/points.length)*20}px`
                }}
                onClick={() => {
                  const zoom = Math.min(superCluster.getClusterExpansionZoom(Number(cluster.id)),20)
                  mapRef?.current?.flyTo({
                    center:[longitude,latitude],
                    zoom,
                    speed:1
                  })
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
          )
        })}
        <PriceSlider/>
        <GeocoderInput/>
     {/* <Geocoder/> */}

        {popupInfo && (
            <Popup longitude={popupInfo.geometry.coordinates[0]}
            latitude={popupInfo.geometry.coordinates[1]}
            maxWidth='auto'
            closeOnClick={false}
            focusAfterOpen={false}
            onClose={() => setPopupInfo(null)}
            >
  
            <PopupHotel {...{popupInfo}} />
  
            </Popup>
          
          )}
        </ReactMapGL>
      </Box>
    </>
  );
};

export default MapScreen;