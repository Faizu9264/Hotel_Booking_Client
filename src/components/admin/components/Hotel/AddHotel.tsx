// AddHotel.tsx

import { Box, Button, Container, Stack, Step, StepButton, Stepper } from '@mui/material';
import { Send } from '@mui/icons-material'; // Import the Send icon
import { useEffect, useState } from 'react';
import AddImages from '../../../../components/admin/components/Images/AddImages';
import AddLocation from '../location/AddLocation';
import { useValue } from '../../../../context/ContextProvider';
import AddDetails from '../Details/AddDetails';
import adminApi from '../../../../services/adminApi';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate()
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

  const findUnfinished = () => {
    return steps.findIndex((step) => !step.completed);
  };

  const setComplete = (index: number, status: boolean) => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      newSteps[index].completed = status;
      return newSteps;
    });
  };

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

  const handleSubmit = async () => {
    const hotelDetails = {
      location: {
        lat: location.lat,
        lng: location.lng,
      },
      details: {
        hotelName: details.hotelName,
        minRent: details.minRent,
        location:details.location,
        contactNo: details.contactNo,
        emailAddress: details.emailAddress,
        description: details.description,
      },
      images,
    }
    try {
      const response = await adminApi.createHotel(hotelDetails);
      toast.success('Hotel created successfully');
      setTimeout(() => {
        navigate('/admin/dashboard/hotels');
      }, 3000);
    } catch (error) {
      toast.error('Error creating hotel');
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
      <Box sx={{ pb: 7 ,mb:10 }}>
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
            <Button variant="contained" endIcon={<Send />} onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default AddHotel;