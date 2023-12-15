


import { Box, Button, Container, Stack, Step, StepButton, Stepper } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import AddImages from '../../../../components/admin/components/Images/AddImages';
import AddLocation from '../location/AddLocation';
import AddDetails from '../Details/AddDetails';
import adminApi from '../../../../services/adminApi';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useValue } from '../../../../context/ContextProvider';
import { setHotels, setAddressFilter, setPriceFilter, clearAddress } from '../../../../redux/slices/hotelSlice';
import { RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';


const AddHotel = () => {
  const {
    state: { images, details, location },
    dispatch,
  } = useValue();
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    { label: 'Location', completed: false },
    { label: 'Details', completed: false },
    { label: 'Images', completed: false },
  ]);
  const [showSubmit, setShowSubmit] = useState(false);
  const navigate = useNavigate();
  const isEditMode = Boolean(new URLSearchParams(window.location.search).get('hotelId'));
  const hotelId = new URLSearchParams(window.location.search).get('hotelId');
  console.log('hotelId:', typeof hotelId, hotelId);
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const state = useSelector((state: RootState) => state.hotel);
  useEffect(() => {
    if (isEditMode && hotelId && hotels.length > 0) {
      const hotelToUpdate = hotels.find((hotel: any) => hotel._id === hotelId);
  
      if (hotelToUpdate) {
        // Update the state with the fetched details
        dispatch({
          type: 'UPDATE_LOCATION',
          payload: { lat: hotelToUpdate.location?.lat, lng: hotelToUpdate.location?.lng },
        });
        dispatch({
          type: 'UPDATE_DETAILS',
          payload: {
            hotelName: hotelToUpdate.details?.hotelName,
            minRent: hotelToUpdate.details?.minRent,
            location: hotelToUpdate.details?.location,
            contactNo: hotelToUpdate.details?.contactNo,
            emailAddress: hotelToUpdate.details?.emailAddress,
            description: hotelToUpdate.details?.description,
          },
        });
        dispatch({
          type: 'UPDATE_IMAGES',
          payload: hotelToUpdate.images,
        });
      }
    }
    
  }, [isEditMode, hotelId, dispatch,hotels]);

  useEffect(() => {
    if (images.length) {
      if (!steps[2].completed) setComplete(2, true);
    } else {
      if (steps[2].completed) setComplete(2, false);
    }
  }, [images]);

  useEffect(() => {
    if (details.hotelName.length > 4 && details.description.length > 9) {
      if (!steps[1].completed) setComplete(1, true);
    } else {
      if (steps[1].completed) setComplete(1, false);
    }
  }, [details]);

  useEffect(() => {
    if (location.lng !== 0 || location.lat !== 0) {
      if (!steps[0].completed) setComplete(0, true);
    } else {
      if (steps[0].completed) setComplete(0, false);
    }
  }, [location]);

  useEffect(() => {
    if (findUnfinished() === -1) {
      if (!showSubmit) setShowSubmit(true);
    } else {
      if (showSubmit) setShowSubmit(false);
    }
  }, [steps, showSubmit]);

  const setComplete = (index: number, status: boolean) => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      newSteps[index].completed = status;
      return newSteps;
    });
  };

  const findUnfinished = () => {
    return steps.findIndex((step) => !step.completed);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      const stepIndex = findUnfinished();
      setActiveStep(stepIndex);
    }
  };

  const checkDisabled = () => {
    if (activeStep < steps.length - 1) return false;
    const index = findUnfinished();
    return index === -1;
  };

  const handleSubmit = async () => {
    const hotelDetails = {
      location: {
        lat: location.lat,
        lng: location.lng,
      },
      details: {
        hotelName: details.hotelName,
        minRent: details.minRent,
        location: details.location,
        contactNo: details.contactNo,
        emailAddress: details.emailAddress,
        description: details.description,
      },
      images,
    };
  
    try {
      if (isEditMode) {
        console.log('hotelDetails',hotelDetails);
        
        // If in edit mode, update the existing hotel
        await adminApi.updateHotel(hotelId!, hotelDetails);
      
        // Dispatch an action to update the hotel details in the state
        dispatch({ type: 'SET_HOTEL_DETAILS', payload: hotelDetails });
    
        toast.success('Hotel updated successfully');
      } else {
        // If not in edit mode, create a new hotel
        await adminApi.createHotel(hotelDetails);
    
        toast.success('Hotel created successfully');
      }
  
      setTimeout(() => {
        navigate('/admin/dashboard/hotels');
      }, 3000);
    } catch (error) {
      toast.error(isEditMode ? 'Error updating hotel' : 'Error creating hotel');
    }
  
    console.log(hotelDetails, 'hotel');
  };

  return (
    <Container sx={{ my: 4 }}>
      <ToastContainer />
      <Stepper alternativeLabel nonLinear activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((step, index) => (
          <Step key={step.label} completed={step.completed}>
            <StepButton onClick={() => setActiveStep(index)}>{step.label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ pb: 7, mb: 10 }}>
        {activeStep === 0 && <AddLocation />}
        {activeStep === 1 && <AddDetails />}
        {activeStep === 2 && <AddImages />}
        <Stack direction="row" sx={{ pt: 2, justifyContent: 'space-around' }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prevStep) => prevStep - 1)}
          >
            Back
          </Button>
          <Button disabled={checkDisabled()} onClick={handleNext}>
            Next
          </Button>
        </Stack>
        {showSubmit && (
          <Stack sx={{ alignItems: 'center' }}>
            {isEditMode ? (
              <Button variant="contained" endIcon={<Send />} onClick={handleSubmit}>
                Update
              </Button>
            ) : (
              <Button variant="contained" endIcon={<Send />} onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Stack>
        )}
      </Box>
    </Container>
  );
};


export default AddHotel;
