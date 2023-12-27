import React,{useEffect,useState} from 'react';

import { Box, Button, TextField } from '@mui/material';
import { CorporateFare, LockTwoTone, TravelExplore } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import RoomListScreen from '../room/RoomListinig';
import MapScreen from '../map/ClusterMap';
import HotelListScreen from '../hotel/HotelListScreen';
import RoomDetailsScreen from '../room/ RoomDetailsScreen';
import api from '../../services/userApi';
import { setHotels } from '../../redux/slices/hotelSlice';
import { RootState } from '../../redux/store';
import UserProfileModal from '../../components/user/UserProfileModal';
import BookingPage from '../Booking/BookingPage'; 
import PaymentSuccess from '../../components/payment/PaymentSuccess'
import PaymentFailure from '../../components/payment/PaymentFailure';
import MyBookings from '../../components/user/MyBookings';

interface HomeScreenProps {
  handleOpenProfileModal: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ handleOpenProfileModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const userData = useSelector((state: RootState) => state.auth.user);
  const handleCloseProfileModal = () => {
    setProfileModalOpen(false);
  };
  const handleFindHotels = async() => {
    try {
      if(hotels.length<=0){
        const response = await api.getAllHotels();
        dispatch(setHotels(response as any));
    }
    navigate('/user/find-hotels');

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
  const handleViewRooms = (hotelId: string) => {
    navigate(`/user/view-rooms?hotelId=${hotelId}`);
  };
  const handleViewRoomDetails = (hotelId: string) => {
    navigate(`/user/room-details?roomId=${hotelId}`);
  };
  return (
    <>
      {location.pathname === '/user/find-hotels' ? (
        <MapScreen />
      ) : location.pathname === '/user/view-hotels' ? (
      <>
       <HotelListScreen onHotelClick={handleViewRooms}/></>
      ) 
      : location.pathname.startsWith('/user/view-rooms') ? (
        <RoomListScreen  onRoomClick={handleViewRoomDetails} /> 
      ) : 
      location.pathname.startsWith('/user/room-details') ? (
        <RoomDetailsScreen /> 
      ) : 
      location.pathname.startsWith('/user/checkout') ? (
        <BookingPage/> 
      ): 
      location.pathname.startsWith('/user/payment/success') ? (
        <PaymentSuccess/> 
      ): 
      location.pathname.startsWith('/user/payment/failed') ? (
        <PaymentFailure /> 
      ) : 
      location.pathname.startsWith('/user/bookings') ? (
        <MyBookings /> 
      ) : 
      (
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
       <UserProfileModal isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} user={userData} />
    </>
  );
};

export default HomeScreen;