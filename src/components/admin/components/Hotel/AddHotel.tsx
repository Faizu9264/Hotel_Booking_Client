import { Box, Button, Container, Stack, Step, StepButton, Stepper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { updateLocation } from '../../../../redux/slices/hotelSlice';
import AddImages from '../../../../components/admin/components/Images/AddImages'; 
import AddLocation from '../location/AddLocation';

const AddHotel = () => {
  const dispatch = useDispatch();
  const { location, details, images } = useSelector((state: RootState) => state.hotel);
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    { label: 'Location', completed: false },
    { label: 'Details', completed: false },
    { label: 'Images', completed: false },
  ]);

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
    if (details.title.length > 4 && details.description.length > 9) {
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

  return (
    <Container sx={{ my: 4 }}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((step, index) => (
          <Step key={step.label} completed={step.completed}>
            <StepButton onClick={() => setActiveStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box>
        {activeStep === 0 && <AddLocation />}
        {activeStep === 2 && <AddImages  />}
      </Box>
      <Stack direction="row" sx={{ pt: 2, pb: 7, justifyContent: 'space-around' }}>
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
    </Container>
  );
};

export default AddHotel;
