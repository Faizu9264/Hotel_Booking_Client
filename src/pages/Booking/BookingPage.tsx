

import React, { useState, useEffect,useRef } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Grid,
  Box,
  IconButton, 
} from '@mui/material';   
import './datePicker.css'
import { differenceInDays } from 'date-fns';
import { DateRangePicker, DateRange } from 'react-date-range';
import { isBefore } from 'date-fns';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBookingDetails } from '../../redux/slices/bookingSlice';
import { RootState } from '../../redux/store';

import { useSelector } from 'react-redux';
import { selectBookingDetails } from '../../redux/slices/bookingSlice';
import { toast,ToastContainer } from 'react-toastify';
import Divider from '@mui/material/Divider';
import api from '../../services/userApi';

export interface BookingDetails{
    guestName: string;
    email: string;
    phone: string;
    specialRequests: string;
    checkInDate: Date;
    checkOutDate: Date;
    adultCount: number;
    childrenCount: number;
    roomCount: number;
    nightCount:number
    maxPeople: number;
    total: number;
    discountPrice: number;
    roomDetails: {
      id: string;
      roomType: string;
      hotelName: string;
      hotelId: string;
      amenities: string[];
      rentAmount: number;
      discountPrice: number;
      roomsCount: number;
      maxPeople: number;
      description: string;
      images: string[];
    };
  }

const BookingPage = () => {
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const bookingDetails = useSelector(selectBookingDetails);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [guestNameError, setGuestNameError] = useState('');
const [emailError, setEmailError] = useState('');
const [phoneError, setPhoneError] = useState('');
const userData = useSelector((state: RootState) => state.auth.user);

 
  const [BookingDetails, setBookingDetails] = useState<BookingDetails>({
    guestName: '', 
    email: '',
    phone: '',
    specialRequests: '',
    checkInDate:new Date(bookingDetails.checkInDate),
    checkOutDate:new Date(bookingDetails.checkOutDate),
    adultCount:bookingDetails.adultCount,
    childrenCount: bookingDetails.childrenCount,
    nightCount:1,
    roomCount: bookingDetails.roomCount,
    maxPeople: bookingDetails.roomDetails.maxPeople,
    total: bookingDetails.roomDetails.rentAmount,
    discountPrice: bookingDetails.roomDetails.discountPrice,
    roomDetails: {
      id: bookingDetails.roomDetails.id,
      roomType: bookingDetails.roomDetails.roomType,
      hotelName:bookingDetails.roomDetails.hotelName,
      hotelId: bookingDetails.roomDetails.hotelId,
      amenities: bookingDetails.roomDetails.amenities,
      rentAmount: bookingDetails.roomDetails.rentAmount,
      discountPrice: bookingDetails.roomDetails.discountPrice,
      roomsCount: bookingDetails.roomDetails.roomsCount,
      maxPeople: bookingDetails.roomDetails.maxPeople,
      description: bookingDetails.roomDetails.description,
      images: bookingDetails.roomDetails.images,
    },
  });
  
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalRent, setTotalRent] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleIncreaseAdultCount = () => {
    setBookingDetails((prevState) => {
      console.log('Previous state:', prevState);
      const totalCount = prevState.adultCount + prevState.childrenCount;
      const maxPeopleAllowed = prevState.roomDetails.roomsCount * prevState.roomDetails.maxPeople;
  
      if (totalCount < maxPeopleAllowed) {
        return {
          ...prevState,
          adultCount: prevState.adultCount + 1,
        };
      }
      return prevState;
    });
  };
  
  const handleIncreaseChildrenCount = () => {
    setBookingDetails((prevState) => {
      console.log('Previous state:', prevState);
      const totalCount = prevState.adultCount + prevState.childrenCount;
      const maxPeopleAllowed = prevState.roomDetails.roomsCount * prevState.roomDetails.maxPeople;
     
      if (totalCount < maxPeopleAllowed) {
        return {
          ...prevState,
          childrenCount: prevState.childrenCount + 1,
        };
      }
      return prevState;
    });
  };
  

  const handleDecreaseAdultCount = () => {
    setBookingDetails((prevState) => ({
      ...prevState,
      adultCount: Math.max(0, prevState.adultCount - 1),
    }));
  };
  
  const handleDecreaseChildrenCount = () => {
    setBookingDetails((prevState) => ({
      ...prevState,
      childrenCount: Math.max(0, prevState.childrenCount - 1),
    }));
  };
  



  useEffect(() => {
    const totalCount = BookingDetails.adultCount + BookingDetails.childrenCount;  
    const nights = differenceInDays(BookingDetails.checkOutDate, BookingDetails.checkInDate);
    const calculatedNightCount = nights > 0 ? nights+1 : 1; 
  
    setBookingDetails((prevState) => ({
      ...prevState,
      nightCount: calculatedNightCount,
    }));
  
    if (BookingDetails.roomCount > BookingDetails.roomDetails.roomsCount) {
      return;
    }
  
    const updatedRoomCount = Math.ceil(totalCount / BookingDetails.roomDetails.maxPeople);
    const updatedMaxPeopleValue = updatedRoomCount * BookingDetails.roomDetails.maxPeople;
  
    if (totalCount > updatedMaxPeopleValue) {
      
      setBookingDetails((prevState) => ({
        ...prevState,
        roomCount: updatedRoomCount + 1,
        maxPeople: updatedMaxPeopleValue,
      }));
    } else {
      
      setBookingDetails((prevState) => ({
        ...prevState,
        roomCount: updatedRoomCount,
        maxPeople: updatedMaxPeopleValue,
      }));
    }
  
    const totalRent = updatedRoomCount * BookingDetails.roomDetails.rentAmount * calculatedNightCount;
    const totalDiscount = updatedRoomCount * BookingDetails.roomDetails.discountPrice * calculatedNightCount;
  
    setTotalRent(totalRent);
    setTotalDiscount(totalDiscount);
  
    setBookingDetails((prevState) => ({
      ...prevState,
      total: totalRent - totalDiscount,
      discountPrice: totalDiscount,
    }));
  }, [BookingDetails.adultCount, BookingDetails.childrenCount, BookingDetails.checkInDate, BookingDetails.checkOutDate, BookingDetails.roomDetails]);
  


  const handleIncreaseRoomCount = () => {
    setBookingDetails((prevState) => {
      const maxRoomsAvailable = prevState.roomDetails.roomsCount;
      const newRoomCount = Math.min(prevState.roomCount + 1, maxRoomsAvailable);
      const updatedMaxPeopleValue = newRoomCount * prevState.roomDetails.maxPeople;
  
      const nights = differenceInDays(prevState.checkOutDate, prevState.checkInDate);
      const calculatedNightCount = nights > 0 ? nights + 1 : 1;
  
      const totalRent = newRoomCount * prevState.roomDetails.rentAmount * calculatedNightCount;
      const totalDiscount = newRoomCount * prevState.roomDetails.discountPrice * calculatedNightCount;
  
      return {
        ...prevState,
        roomCount: newRoomCount,
        maxPeople: updatedMaxPeopleValue,
        total: totalRent - totalDiscount,
        discountPrice: totalDiscount,
      };
    });
  };
  
  const handleDecreaseRoomCount = () => {
    setBookingDetails((prevState) => {
      const newRoomCount = Math.max(prevState.roomCount - 1, 1);
      const updatedMaxPeopleValue = newRoomCount * prevState.roomDetails.maxPeople;
  
      const totalRent = newRoomCount * prevState.roomDetails.rentAmount * BookingDetails.nightCount;
      const totalDiscount = newRoomCount * prevState.roomDetails.discountPrice * BookingDetails.nightCount;
  
      return {
        ...prevState,
        roomCount: newRoomCount,
        maxPeople: updatedMaxPeopleValue,
        total: totalRent - totalDiscount,
        discountPrice: totalDiscount,
      };
    });
  };
  

  const [dateRange, setDateRange] = useState([
    {
      startDate: BookingDetails.checkInDate,
      endDate: BookingDetails.checkOutDate,
      key: 'selection',
    },
  ]);
  
  const handleDateSelect = (ranges: any) => {
    const startDate = isBefore(ranges.selection.startDate, new Date()) ? new Date() : ranges.selection.startDate;

    setDateRange([{ startDate, endDate: ranges.selection.endDate, key: 'selection' }]);
    setBookingDetails({
      ...BookingDetails,
      checkInDate: startDate,
      checkOutDate: ranges.selection.endDate,
    });
  };
  const toggleDatePicker = () => {
    setDatePickerVisible(!datePickerVisible);
  };

  const handleBookNow = async () => {
    try {
      const userId = userData._id||userData.userId;
      console.log('userId',userId);
      
      if (!guestName || !email || !phone) {
        if (!guestName) setGuestNameError('Guest Name is required');
        if (!email) setEmailError('Email is required');
        if (!phone) setPhoneError('Phone is required');
        toast.error('Please fill in all required fields.');
        return;
      }
      const updatedBookingDetails: Partial<BookingDetails> = {
        ...BookingDetails,
        guestName: guestName, 
        email: email, 
        phone: phone,
        specialRequests: specialRequests,
      };
      
      setBookingDetails(updatedBookingDetails as BookingDetails);
      await api.handleBooking(userId, updatedBookingDetails);
      localStorage.setItem('bookingDetails', JSON.stringify(updatedBookingDetails));
      localStorage.setItem('userId', userId);
      
    } catch (error:any) {
      console.error('Error handling booking:', error.message);
  
    }
  };
    // navigate('/booking-confirmation');
  

 

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '110vh',
        backgroundColor: '#f0f0f0',
        marginTop:'15px',
        marginBottom:'15px'
      }}
    >
      <ToastContainer/>
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          width: '90%',
          maxWidth: '1000px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Booking Details
        </Typography>
        <Grid container spacing={3}>
          {/* Left Column - User Details */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2} mt={2} mb={4}>
            <TextField
  label="Guest Name"
  variant="outlined"
  fullWidth
  value={guestName}
  onChange={(e) => {
    setGuestName(e.target.value);
    setGuestNameError('');
  }}
  error={!!guestNameError}
  helperText={guestNameError}
/>
<TextField
  label="Email"
  type="email"
  variant="outlined"
  fullWidth
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setEmailError('');
  }}
  error={!!emailError}
  helperText={emailError}
/>
<TextField
  label="Phone"
  type="tel"
  variant="outlined"
  fullWidth
  value={phone}
  onChange={(e) => {
    setPhone(e.target.value);
    setPhoneError('');
  }}
  error={!!phoneError}
  helperText={phoneError}
/>

              <TextField
                label="Special Requests"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
            <TextField
              id="checkInTextField"
              label="Check-In Date"
              variant="outlined"
              value={BookingDetails.checkInDate.toLocaleDateString()}
            />
            <TextField
              id="checkOutTextField"
              label="Check-Out Date"
              variant="outlined"
              value={BookingDetails.checkOutDate.toLocaleDateString()}
            />

            {/* Icon button to toggle date picker visibility */}
            <IconButton onClick={toggleDatePicker} color="primary" aria-label="open date picker">
              <EventIcon />
            </IconButton>
          </Stack>
         <Stack>
          {/* Date Range Picker */}
          {datePickerVisible && (
            <DateRangePicker
              ranges={dateRange}
              onChange={handleDateSelect}
              minDate={new Date()}
            />
          )}
        </Stack>
          </Grid>
          {/* Right Column - Room Details */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                {/* Room Image */}
                <img
                  src={BookingDetails.roomDetails.images[0]}
                  alt="Room"
                  style={{ width: '100%', height: 'auto', maxHeight: '200px', marginTop: '15px' }}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'left' }}>
      <Typography variant="h6" sx={{ marginBottom: 2, color: '#2196F3' }}>
        Room Type: {BookingDetails.roomDetails.roomType}
      </Typography>
      <Stack direction="column" spacing={1} sx={{ marginBottom: 2 }}>
        <Typography variant="body1">
          <strong>Max People:</strong> {BookingDetails.maxPeople}
        </Typography>
        <Typography variant="body1">
          <strong>Rent Per Night:</strong> &#x20b9;{BookingDetails.roomDetails.rentAmount} /Only
        </Typography>
        <Typography variant="body1">
          <strong>Discount Per Night:</strong> &#x20b9;{BookingDetails.roomDetails.discountPrice}
        </Typography>
      </Stack>

      <Divider sx={{ marginY: 2, borderColor: '#9E9E9E' }} />

      <Stack direction="column" spacing={1}>


        <Typography variant="body1">
          <strong>Nights:</strong> {BookingDetails.nightCount}
        </Typography>
        <Typography variant="body1">
          <strong>Room Left:</strong> {BookingDetails.roomDetails.roomsCount}
        </Typography>
        <Typography variant="body1">
          <strong>Room Count:</strong> {BookingDetails.roomCount}
        </Typography>
        <Typography variant="body1">
          <strong>Total Discount:</strong> &#x20b9;{BookingDetails.discountPrice}
        </Typography>
        <Typography variant="body1">
          <strong>Total Rent:</strong> &#x20b9;{BookingDetails.total}
        </Typography>
        <Stack direction="row" spacing={2} >
  <TextField
    label="Room Count"
    type="number"
    variant="outlined"
    sx={{marginTop:'10px'}}
    value={BookingDetails.roomCount}
  />
  <Button
    variant="contained"
    color="primary"
    sx={{backgroundColor:'rgb(8, 51, 68)'}}
    onClick={handleIncreaseRoomCount}
  >
    +
  </Button>
  <Button
    variant="contained"
    color="primary"
    sx={{backgroundColor:'rgb(8, 51, 68)'}}
    onClick={handleDecreaseRoomCount}
  >
    -
  </Button>
</Stack>
      </Stack>
    </Grid>
            </Grid>
            <Stack spacing={2} mt={2}>
            <Stack direction="row" spacing={2}>
                <TextField
                  label="Adults"
                  type="number"
                  variant="outlined"
                  value={BookingDetails.adultCount}
                  
                />
                <Button variant="contained"  sx={{backgroundColor:'rgb(8, 51, 68)'}} onClick={handleIncreaseAdultCount}>
                  +
                </Button>
                <Button variant="contained"  sx={{backgroundColor:'rgb(8, 51, 68)'}} onClick={handleDecreaseAdultCount}>
                  -
                </Button>
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Children"
                  type="number"
                  variant="outlined"
                  value={BookingDetails.childrenCount}
                />
                <Button variant="contained"  sx={{backgroundColor:'rgb(8, 51, 68)'}} onClick={handleIncreaseChildrenCount}>
                  +
                </Button>
                <Button variant="contained"  sx={{backgroundColor:'rgb(8, 51, 68)'}} onClick={handleDecreaseChildrenCount}>
                  -
                </Button>
              </Stack>
              
            </Stack>
          </Grid>
        </Grid>
        {/* Book Now Button */}
        <Button
  variant="contained"
  color="primary"
  fullWidth
  onClick={handleBookNow}
  sx={{
    marginTop: '20px',
    backgroundColor: 'rgb(8, 51, 68)',
    width: '200px', 
    height:'40px',
    '@media (max-width: 600px)': {
      width: '50%', 
    },
    '&:hover': {
      backgroundColor: 'rgb(8, 51, 68)',
    },
  }}
>
  Book Now
</Button>

      </Paper>
    </Container>
  );
};

export default BookingPage;
