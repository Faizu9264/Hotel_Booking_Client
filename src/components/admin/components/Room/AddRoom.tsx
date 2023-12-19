import { Box, Button, Container, Stack, Step, StepButton, Stepper } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import AddImages from '../../../../components/admin/components/RoomImages/AddImages';

import AddDetails from '../RoomDetails/AddDetails'
import adminApi from '../../../../services/adminApi';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleRoomDetails, clearSingleRoomDetails } from '../../../../redux/slices/singleRoomSlice'; // Import singleRoomSlice
import { RootState } from 'src/redux/store';
import { setRooms, setAddressFilter, setPriceFilter, clearAddress } from '../../../../redux/slices/roomSlice';

import { Room } from '../../../../types/RoomType';
interface RoomDetails {
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
}
export const AddRooms = () => {
  const dispatch = useDispatch();
  const selected: Room = useSelector((state: RootState) => state.room.roomDetails.selectedRoom);
  const  singleRoomDetails = selected
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    { label: 'Details', completed: false },
    { label: 'Images', completed: false },
  ]);
  const [showSubmit, setShowSubmit] = useState(false);
  const navigate = useNavigate();
  const isEditMode = Boolean(new URLSearchParams(window.location.search).get('roomId'));
  const roomId = new URLSearchParams(window.location.search).get('roomId');
  const rooms = useSelector((state: RootState) => state.rooms.rooms);

  useEffect(() => {
    if (isEditMode && roomId && rooms.length > 0) {
      const roomToUpdate = rooms.find((room: any) => room._id === roomId);

      if (roomToUpdate) {
        dispatch(setSingleRoomDetails(roomToUpdate));
      }
    }
  }, [isEditMode, roomId, dispatch, rooms]);

  useEffect(() => {
    if (singleRoomDetails && singleRoomDetails.images.length>0) {    
      if (!steps[1].completed) setComplete(1, true);
    } else {
      if (steps[1].completed) setComplete(1, false);
    }
  }, [singleRoomDetails]);

  useEffect(() => {
    if (
      singleRoomDetails &&
      singleRoomDetails.roomType &&
      singleRoomDetails.hotelName &&
      singleRoomDetails.rentAmount &&
      singleRoomDetails.roomsCount &&
      singleRoomDetails.maxPeople &&
      singleRoomDetails.description
    ) {
      if (!steps[0].completed) setComplete(0, true);
    } else {
      if (steps[0].completed) setComplete(0, false);
    }
  }, [singleRoomDetails]);

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
  const convertFieldsToNumbers = (roomDetails: RoomDetails) => {
    const convertedDetails: RoomDetails = { ...roomDetails };
  
    if (convertedDetails.rentAmount) {
      convertedDetails.rentAmount = parseFloat(convertedDetails.rentAmount.toString());
    }
  
    if (convertedDetails.discountPrice) {
      convertedDetails.discountPrice = parseFloat(convertedDetails.discountPrice.toString());
    }
  
    if (convertedDetails.roomsCount) {
      convertedDetails.roomsCount = parseInt(convertedDetails.roomsCount.toString(), 10);
    }
  
    if (convertedDetails.maxPeople) {
      convertedDetails.maxPeople = parseInt(convertedDetails.maxPeople.toString(), 10);
    }
  
    return convertedDetails;
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
    if (!singleRoomDetails) {
      return;
    }
    const modifiedRoomDetails = convertFieldsToNumbers(singleRoomDetails);

    const roomDetails = {
      roomDetails: modifiedRoomDetails,
      images: singleRoomDetails.images,
    };
  
    try {
      if (isEditMode) {
        await adminApi.updateRoom(roomId!, roomDetails);
        dispatch(setRooms([...rooms])); 
  
        toast.success('Room updated successfully');
      } else {
        await adminApi.createRoom(roomDetails);
  
        toast.success('Room created successfully');
      }
  
      setTimeout(() => {
        navigate('/admin/dashboard/rooms');
      }, 3000);
    } catch (error) {
      toast.error(isEditMode ? 'Error updating room' : 'Error creating room');
    }
  
    console.log(roomDetails, 'room');
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
          {activeStep === 0 && <AddDetails />}
          {activeStep === 1 && <AddImages />}
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
  
  export default AddRooms;
  