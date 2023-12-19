
import React, { forwardRef,useState } from 'react';
import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  Container,
  SlideProps,
  Tooltip,
  Avatar,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from 'swiper';
import 'swiper/swiper-bundle.css';
import { Box, Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { setBookingDetails } from '../../redux/slices/bookingSlice';
import { Room } from '../../types/RoomType';
import Button from '@mui/material/Button';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SpaIcon from '@mui/icons-material/Spa';
import { useDispatch } from 'react-redux';

const Transition = forwardRef<unknown, SlideProps>((props, ref) => {
  return <Slide direction="up" {...props} ref={ref as React.Ref<unknown>} />;
});



const amenityIcons: Record<string, JSX.Element> = {
  WiFi: <WifiIcon style={{ color: 'blue',position:'relative',top:'-5px'}} />,
  'Swimming Pool': <PoolIcon style={{ color: 'green',position:'relative',top:'-5px' }} />,
  Gym: <FitnessCenterIcon style={{ color: 'red',position:'relative',top:'-5px' }} />,
  Spa: <SpaIcon style={{ color: 'purple',position:'relative',top:'-5px' }} />,
};



const RoomDetailsScreen = () => {
  const selected: Room = useSelector((state: RootState) => state.room.roomDetails.selectedRoom);
  const room = selected
  console.log('room',room);
  
  const roomId = new URLSearchParams(window.location.search).get('roomId') ?? '';
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClose = () => {
    navigate(-1);
  };

  const handleBookNow = () => {
    if (room) {
      dispatch(
        setBookingDetails({
          roomDetails: {
            ...room,
            hotelId: room?.hotelId ?? '', 
          },
        })
      );
      navigate('/user/checkout', { state: { roomId } });
    }
  };
  

  return (
    <Dialog
      fullScreen
      open={Boolean(room)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
            {room?.roomType}
          </Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 2 }}>
        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow, Lazy, Zoom]}
          centeredSlides
          slidesPerView={2}
          grabCursor
          navigation
          autoplay
          lazy
          zoom
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {room?.images?.map((url, index) => (
    <SwiperSlide key={index}>
      <div className="swiper-zoom-container">
        <img
          src={url}
          alt={`room-${index}`}
          style={{ width: '60%', height: '60%' }}
        />
      </div>
    </SwiperSlide>
  ))}
  {room?.images && room.images.length > 0 && (
    <Tooltip
      title={room?.hotelName}
      sx={{
        position: 'absolute',
        bottom: '8px',
        left: '8px',
        zIndex: 2
      }}
    >
      <Avatar src={room?.images[0]}></Avatar>
    </Tooltip>
  )}
</Swiper>
        <Stack sx={{ p: 1 }} spacing={2}>
  <Stack direction="row" sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
    <Box>
      <Typography variant='h6' component='span' sx={{ fontWeight: 'bold' }}>
        Rent Per Night:
      </Typography>
      <Typography  component='span' sx={{ textDecoration: 'line-through', color: 'red', marginRight: '8px' }}>
      ₹{room?.rentAmount ?? 0} 
      </Typography>
      <Typography variant='h6' component='span' sx={{ fontWeight: 'bold' }}>
      ₹{(room?.rentAmount ?? 0) - (room?.discountPrice ?? 0)}
      </Typography>
    </Box>
    <Box>
              <Typography variant='h6' component='span' sx={{ fontWeight: 'bold' }}>{`Max people: ${room?.maxPeople}`}</Typography>
             </Box>
  </Stack>
</Stack>


        <Stack
        sx={{p:1}}
        spacing={2}>
          <Stack direction="row"
           sx={{
            justifyContent:'space-between',
            flexWrap:'wrap'
           }}>
            
            
          </Stack>
        </Stack>
        <Stack
        sx={{p:1}}
        spacing={2}>
          <Stack direction="row"
           sx={{
            justifyContent:'space-between',
            flexWrap:'wrap'
           }}>
          
          <Box>
  <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
    Amenities:
  </Typography>

  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px',
    }}
  >
    {room?.amenities?.map((amenity: string, index: number) => (
      <React.Fragment key={index}>
        {index > 0 && <span style={{ marginLeft: '8px' }}>,</span>}
        <Tooltip title={amenity}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              position: 'relative',
              top: '0px', 
              verticalAlign: 'middle', 
            }}
          >
            {amenityIcons[amenity] && amenityIcons[amenity]}
            <Typography
              variant="h6"
              component="span"
              sx={{ marginLeft: amenityIcons[amenity] ? '4px' : '0' }}
            >
              {amenity}
            </Typography>
          </span>
        </Tooltip>
      </React.Fragment>
    ))}
  </Box>
</Box>




<Box>
              <Typography variant='h6' component='span' sx={{ fontWeight: 'bold' }}>{`Room left: `}</Typography>
              <Typography variant='h6' component='span' sx={{color:'red'}}>{room?.roomsCount}</Typography>

             </Box>

          </Stack>
        </Stack>
        <Stack
        sx={{p:1}}
        spacing={2}>
          <Stack direction="row"
           sx={{
            justifyContent:'space-between',
            flexWrap:'wrap'
           }}>
             <Box>
             <Typography variant="h6" component="span"  sx={{ fontWeight: 'bold' }}>
             Description:
           </Typography>
              <Typography  component='span'>{` ${room?.description}`}</Typography>
             </Box>
            
          </Stack>
        </Stack>
        <Button
          variant="contained" 
          className='button1'
          // color="primary"
          size="large"
          fullWidth
          sx={{ borderRadius: 0, marginTop: 'auto', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',fontSize:'20px',fontWeight: 'bold'}}
          onClick={handleBookNow}
        >
          <span>Book Now</span>
        </Button>
        <div className='mb-5'>
        </div>

      </Container>
    </Dialog>
  );
};

export default RoomDetailsScreen;
