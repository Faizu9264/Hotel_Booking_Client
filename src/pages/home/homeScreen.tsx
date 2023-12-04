import React,{useEffect} from 'react';

import { Box, Button, TextField } from '@mui/material';
import { CorporateFare, LockTwoTone, TravelExplore } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
// import { AppDispatch } from '../../../store/store';
// import { getHotels } from '../../../actions/hotel';
import MapScreen from '../map/ClusterMap';
import HotelListScreen from '../hotel/HotelListScreen';
import api from '../../services/userApi';
import { setHotels } from '../../redux/slices/hotelSlice';
import { RootState } from '../../redux/store';
const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotel.hotels);

  const handleFindHotels = async() => {
    try {
        const response = await api.getAllHotels();
        dispatch(setHotels(response as any));
        if(response){
            navigate('/user/find-hotels');
        }

      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
   
  };


  const handleViewHotels = async() => {
    console.log('hotels.length',hotels.length);
    
    if(hotels.length<=0){
        const response = await api.getAllHotels();
        dispatch(setHotels(response as any));
    }
    navigate('/user/view-hotels');
  };

  return (
    <>
      {location.pathname === '/user/find-hotels' ? (
        <MapScreen />
      ) : location.pathname === '/user/view-hotels' ? (
      <>
       <HotelListScreen/></>
      ) : (
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'end', position: 'absolute', width: '100%', top: '10%', right: '20px', gap: 1, transform: 'translateY(-50%)' }}>
            <Button variant='outlined' onClick={handleViewHotels}  sx={{ borderColor: 'white', color: 'white' }} endIcon={<CorporateFare />}>
              View Hotels
            </Button>
            <Button variant='outlined' onClick={handleFindHotels} sx={{ borderColor: 'white', color: 'white' }} endIcon={<TravelExplore />}>
              Find Hotels
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', zIndex: -1 }}>
            <img src='/logo/hotel.jpeg' style={{ width: '50%' }} alt="HomeImage1" />
            <img src='/logo/hotel.jpeg' style={{ width: '50%' }} alt="BackgroundImage" />
          </Box>
        </Box>
      )}
    </>
  );
};

export default HomeScreen;