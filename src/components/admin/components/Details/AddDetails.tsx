

import React, { useState, ChangeEvent,useEffect } from 'react';
import { RootState } from 'src/redux/store';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
  Stack,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputAdornment,
  FormControl,
  Box,
} from '@mui/material';
import { useValue } from '../../../../context/ContextProvider';
import InfoField from './InfoField';
import { toast ,ToastContainer} from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setHotelDetails } from '../../../../redux/slices/hotelSlice';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AddDetails = () => {
  const {
    state: {
      details: { hotelName, location, contactNo, emailAddress, minRent, description },
    },
    dispatch,
  } = useValue();
  // const { hotelId } = useParams();
 const navigate  = useNavigate()
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const isEditMode = Boolean(new URLSearchParams(window.location.search).get('hotelId'));
  const hotelId = new URLSearchParams(window.location.search).get('hotelId');
  
  useEffect(() => {
    if (hotels.length > 0 && isEditMode) {
      const hotelToUpdate = hotels.find((hotel: any) => {
        return hotel._id === hotelId;
      });
  
      if (hotelToUpdate) {
        // dispatch(setHotelDetails(hotelToUpdate.details));
        dispatch({type:'UPDATE_DETAILS',payload:{
          minRent:hotelToUpdate.details.minRent,
          hotelName:hotelToUpdate.details.hotelName
          ,contactNo:hotelToUpdate.details.contactNo,
          location:hotelToUpdate.details.location,
          emailAddress:hotelToUpdate.details.emailAddress,
          description:hotelToUpdate.details.description,
        }})
      }
    }
  }, [hotelId,isEditMode , hotels,dispatch]);


  const handleMinRentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    
    if (value <= 0) {
      toast.error('minimum rent must be greater than zero')
    }else  if (value > 3500) {
      toast.error('minimum rent must be less than or equal to 3500')
    } else {
      dispatch({ type: 'UPDATE_DETAILS', payload: { minRent: value } });
    }
  };

  const handleHotelNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_DETAILS', payload: { hotelName: e.target.value } });
  };

  const handleContactNoChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_DETAILS', payload: { contactNo: e.target.value } });
  };

  const handleEmailAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_DETAILS', payload: { emailAddress: e.target.value } });
  };

  return (
    <Stack
      sx={{
        alignItems: 'center',
        '& .MuiTextField-root': {
          width: '100%',
          maxWidth: '500px',
          m: '0.5rem',
          '& input': {
            height: '15px',
          },
        },
        '& .MuiFormControlLabel-root': {
          marginLeft: '-11px', 
        },
      }}
    >
      <ToastContainer/>
      <FormControl>
        <RadioGroup name="costType" value={1} onChange={() => {}}>
          <Box display="flex" alignItems="flex-start">
            <FormControlLabel value={1} control={<Radio />} label="Min Rent" />
            <TextField
            sx={{ width: '10ch !important' }}
              variant="standard"
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
              inputProps={{ type: 'number', min: 100, max: 3500 }}
              value={minRent}
              onChange={handleMinRentChange}
              name="minRent"
            />
          </Box>
        </RadioGroup>
      </FormControl>
     
      <Stack direction="row">
        <InfoField
          {...{ name: 'hotelName', label: 'Hotel Name', value: hotelName }}
          minLength={5}
          onChange={handleHotelNameChange}
        />
        <InfoField {...{ name: 'location', label: 'Location', value: location }} minLength={5} />
      </Stack>
      <Stack direction="row">
        <InfoField
          {...{ name: 'contactNo', label: 'Contact Number', value: contactNo }}
          minLength={10}
          onChange={handleContactNoChange}
        />
        <InfoField
          {...{ name: 'emailAddress', label: 'Email Address', value: emailAddress }}
          minLength={5}
          onChange={handleEmailAddressChange}
        />
      </Stack>
      <InfoField
        {...{ name: 'description', label: 'Description', value: description }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 4 }}
      />
    </Stack>
  );
};

export default AddDetails;


