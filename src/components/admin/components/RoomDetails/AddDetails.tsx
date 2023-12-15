import React, { useState, ChangeEvent, useEffect } from 'react';
import { RootState } from 'src/redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
  Stack,
  RadioGroup,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  InputAdornment,
  FormControl,
  Box,
  Grid,
  TextField ,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import InfoField from './InfoField';
import { updateSingleRoomDetails } from '../../../../redux/slices/singleRoomSlice';
import adminApi from '../../../../services/adminApi';
import {Hotel} from '../../../../types/hotelActionTypes';
import { Dispatch } from 'redux';
interface HotelData {
  name: string;
  id: string;
  minRent?: number;
  location?: string; 
  email?: string; 
  phone?: string; 
}
import { styled } from '@mui/system';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    backgroundColor: theme.palette.primary?.main || '', 
    color: theme.palette.primary?.contrastText || '',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogContentText-root': {
    color: theme.palette.text?.primary || '',
  },
}));


const AddDetails = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const [selectedHotel, setSelectedHotel] = useState<HotelData | null>(null);
  const singleRoomDetails = useSelector((state: RootState) => state.room.roomDetails) || {};
  const isEditMode = Boolean(new URLSearchParams(window.location.search).get('roomId'));
  const roomId = new URLSearchParams(window.location.search).get('roomId');
  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  const [hotelDropdownOptions, setHotelDropdownOptions] = useState<HotelData[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [extraAmenity, setExtraAmenity] = useState<string>('');
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLButtonElement | null>(null);
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const [viewHotelModal, setViewHotelModal] = useState<boolean>(false);
  const [minRent, setMinRent] = useState<number>(0);

  const handleViewHotel = (hotel: HotelData) => {
    setSelectedHotel(hotel);
    setViewHotelModal(true);
  };

  const handleCloseViewHotelModal = () => {
    setViewHotelModal(false);
    setSelectedHotel(null);
  };


const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
  setPopoverAnchor(event.currentTarget);
};

const handlePopoverClose = () => {
  setPopoverAnchor(null);
};
useEffect(() => {
  if (Array.isArray(singleRoomDetails.amenities)) {
    setSelectedAmenities(singleRoomDetails.amenities);
  }
}, [singleRoomDetails]);
const handleRentAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = parseFloat(e.target.value);
  console.log(minRent);
  
  if (value < minRent) {
    toast.error(`Rent amount must be greater than hotel minimum Rent ${minRent}`);
  }
   else if (value > 3500) {
    toast.error('Rent amount must be less than or equal to 3500');
  } else {
    dispatch(updateSingleRoomDetails({ rentAmount: value }));
  }
};
 useEffect(() => {
    if (selectedHotel) {
      setMinRent(selectedHotel.minRent || 0);
    }
  }, [handleRentAmountChange]);

useEffect(() => {
  if (Array.isArray(singleRoomDetails.amenities)) {
    setSelectedAmenities(singleRoomDetails.amenities);
  }
}, [singleRoomDetails]);

useEffect(() => {
  if (hotels.length > 0) {
    const hotelData = hotels.map((hotel: any) => ({
      name: hotel.details.hotelName,
      id: hotel._id,
      minRent:hotel.details.minRent,
      location:hotel.details.location,
      email:hotel.details.emailAddress,
      phone:hotel.details.contactNo,
    }));
    console.log('hotelData',hotelData);
    
    setHotelDropdownOptions(hotelData);
  } else {
    const fetchData = async () => {
      try {
        const action = await dispatch(adminApi.getAllHotels());
        const response: Hotel[] = Array.isArray(action) ? action : [];
        console.log('API Response:', response);

        const hotelData = response.map((hotel: any) => ({
          name: hotel.details.hotelName,
          id: hotel._id,
          minRent:hotel.details.minRent,
          location:hotel.details.location,
          email:hotel.details.emailAddress,
          phone:hotel.details.contactNo,
        }));
        setHotelDropdownOptions(hotelData);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };
  
    fetchData();
  }
}, [rooms, dispatch]);
  useEffect(() => {
    if (rooms.length > 0 && isEditMode && roomId) {
      const roomToUpdate = rooms.find((room: any) => room._id === roomId);

      if (roomToUpdate) {
        dispatch(updateSingleRoomDetails(roomToUpdate.details));
      }
    }
  }, [roomId, isEditMode, rooms, dispatch]);


  
  const handleRoomTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim(); 
    if (!value) {
      toast.error('Please enter a valid room type');
    } else {
      dispatch(updateSingleRoomDetails({ roomType: value }));
    }
  };
  

  const handleHotelNameChange = (e: SelectChangeEvent<string | HotelData>) => {
    const selectedHotel: HotelData | undefined = typeof e.target.value === 'string'
      ? hotelDropdownOptions.find((hotel) => hotel.name === e.target.value)
      : e.target.value;
   console.log('selectedHotel',selectedHotel);
   
    if (selectedHotel) {
      dispatch(updateSingleRoomDetails({
        hotelName: selectedHotel.name,
        hotelId: selectedHotel.id,
      }));
    } else {
      console.error('Selected hotel is undefined');
    }
  };
  
  
  



  const handleAmenityCheckboxChange = (amenity: string) => {
    const updatedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];

    setSelectedAmenities(updatedAmenities);
    dispatch(updateSingleRoomDetails({ amenities: updatedAmenities }));
  };

  const handleAddNewAmenity = () => {
    if (extraAmenity.trim() === '') {
      toast.error('Please enter a valid amenity');
      return;
    }

    if (!selectedAmenities.includes(extraAmenity.trim())) {
      const updatedAmenities = [...selectedAmenities, extraAmenity.trim()];
      setSelectedAmenities(updatedAmenities);
      setExtraAmenity('');
      dispatch(updateSingleRoomDetails({ amenities: updatedAmenities }));
    } else {
      toast.error('Amenity already added');
    }
  }

  const handleDiscountPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const rentAmount = singleRoomDetails.rentAmount || 0;
  
    if (isNaN(value)) {
      toast.error('Please enter a valid discount price');
    } else if (value <= 0) {
      toast.error('Discount price must be greater than zero');
    } else if (value >= rentAmount) {
      toast.error('Discount price must be less than rent amount');
    } else {
      dispatch(updateSingleRoomDetails({ discountPrice: value }));
    }
  };
  

  const handleRoomsCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
  
    if (isNaN(value) || value <= 0) {
      toast.error('Please enter a valid number of rooms greater than zero');
    } else {
      dispatch(updateSingleRoomDetails({ roomsCount: value }));
    }
  };
  
  const handleMaxPeopleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
  
    if (isNaN(value) || value <= 0) {
      toast.error('Please enter a valid number of people greater than zero');
    } else {
      dispatch(updateSingleRoomDetails({ maxPeople: value }));
    }
  };
  
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSingleRoomDetails({ description: e.target.value }));
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': {
          width: '100%',
          maxWidth: '500px',
          marginY: '0.5rem',
        },
      }}
    >
      <ToastContainer />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InfoField
            label="Room Type"
            value={singleRoomDetails.roomType || ''}
            onChange={(e) => handleRoomTypeChange(e)}
            minLength={5}
            fieldKey="roomType"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl style={{ width: '100%', maxWidth: '500px', marginTop: '8px' }}>
            <InputLabel id="hotelNameLabel">Hotel Name</InputLabel>
            <Select
              labelId="hotelNameLabel"
              id="hotelName"
              value={singleRoomDetails.hotelName || ''}
              onChange={(e) => handleHotelNameChange(e)}
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between', // Align items to the end
                maxWidth: '500px',
                minWidth: '50px',
                '@media (min-width:50px)': {
                  maxWidth: '500px',
                },
              }}
            >
              {hotelDropdownOptions.map((hotelData) => (
                <MenuItem key={hotelData.id} value={hotelData.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span>{hotelData.name}</span>
                    <Button
                      variant='outlined'
                      onClick={() => handleViewHotel(hotelData)}
                    >
                      View
                    </Button>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <CustomDialog open={viewHotelModal} onClose={handleCloseViewHotelModal}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#2196f3', 
          color: 'white', 
          padding: '16px',
        }}
      >
          Hotel Details
          <IconButton onClick={handleCloseViewHotelModal} sx={{ marginLeft: 'auto' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ color: 'green', paddingTop: '20px' }}>
  {selectedHotel && (
    <>
      <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ color: 'black', marginRight: '8px', fontWeight: 'bold' }}>Name:</span> {selectedHotel.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ color: 'black', marginRight: '8px', fontWeight: 'bold' }}>Min Rent:</span> {selectedHotel.minRent}
      </Typography>
      <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ color: 'black', marginRight: '8px', fontWeight: 'bold' }}>Location:</span> {selectedHotel.location}
      </Typography>
      <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ color: 'black', marginRight: '8px', fontWeight: 'bold' }}>Email:</span> {selectedHotel.email}
      </Typography>
      <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ color: 'black', marginRight: '8px', fontWeight: 'bold' }}>Phone:</span> {selectedHotel.phone}
      </Typography>
    </>
  )}
</DialogContent>


      </CustomDialog>
      <Grid container spacing={2}>
      <Grid item xs={6}>
          <InfoField
            label="Amenities"
           value={selectedAmenities ? selectedAmenities.join(', ') : ''}
            minLength={5}
            fieldKey="amenities"
            endAdornment={
              <InputAdornment position="end">
              <Button
                onClick={handlePopoverOpen}
                variant="text"
                color="primary"
                sx={{
                  fontSize: { xs: '7px', sm: '10px',lg:'16px' },
                  fontWeight: { xs: 300, sm: 400 ,lg:600},
                  marginTop: { xs: '8px', sm: '16px' }, 
                }}
              >
                ADD Amenities
              </Button>
            </InputAdornment>
            
            }
          />
          <Popover
            open={Boolean(popoverAnchor)}
            anchorEl={popoverAnchor}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box p={2}>
              <IconButton
                onClick={handlePopoverClose}
                sx={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                }}
              >
                <CloseIcon />
              </IconButton>
              <TextField
                label="Enter New Amenity"
                value={extraAmenity}
                onChange={(e) => setExtraAmenity(e.target.value)}
                sx={{
                  marginTop: { xs: '18px', sm: '18px' },
                }}
              />
              <Button
  variant="contained"
  color="primary"
  onClick={handleAddNewAmenity}
  sx={{
    marginTop: { xs: '25px', sm: '25px' },
    marginLeft: { xs: '0px', sm: '10px' }, 
    color: 'white',
    '&:hover': {
      backgroundColor: '#008CBA',
    },
  }}
>
  Add Amenity
</Button>

              <List>
                {[...new Set(['WiFi', 'Swimming Pool', 'Gym', 'Spa', ...selectedAmenities])].map((amenity) => (
                  <ListItem key={amenity}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => handleAmenityCheckboxChange(amenity)}
                        />
                      }
                      label={amenity}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Popover>
        </Grid>
        <Grid item xs={6}>
          <InfoField
            label="Rent Amount"
            type="number"
            min={100}
            max={3500}
            value={singleRoomDetails.rentAmount || ''}
            onChange={(e) => handleRentAmountChange(e)}
            fieldKey="rentAmount"
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            minLength={5}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InfoField
            label="Discount Price"
            type="number"
            value={singleRoomDetails.discountPrice || ''}
            onChange={(e) => handleDiscountPriceChange(e)}
            fieldKey="discountPrice"
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            minLength={5}
          />
        </Grid>
        <Grid item xs={6}>
          <InfoField
            label="Rooms Count"
            type="number"
            value={singleRoomDetails.roomsCount || ''}
            onChange={(e) => handleRoomsCountChange(e)}
            fieldKey="roomsCount"
            minLength={5}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InfoField
            label="Max People"
            type="number"
            value={singleRoomDetails.maxPeople || ''}
            onChange={(e) => handleMaxPeopleChange(e)}
            fieldKey="maxPeople"
            minLength={5}
          />
        </Grid>
        <Grid item xs={6}>
          <InfoField
            label="Description"
            value={singleRoomDetails.description || ''}
            onChange={(e) => handleDescriptionChange(e)}
            multiline
            rows={4}
            fieldKey="description"
            minLength={10}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddDetails;
