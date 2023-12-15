
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
  Typography,
  Pagination,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import RoomPriceSlider from '../../components/searchBar/RoomPriceSlider';
import api from '../../services/userApi'; 
import { useDispatch } from 'react-redux';
import { setRooms,clearAddress,setRoomDetails } from '../../redux/slices/roomSlice';
import ErrorMessage from '../../components/common/ErrorMessage';
import LoadingSpinner from '../../components/common/LoadingSpinner';
const PAGE_SIZE = 6;


interface RoomListScreenProps {
  onRoomClick: (roomId: string) => void;
}

const RoomListScreen: React.FC<RoomListScreenProps> = ({ onRoomClick }) => {
  const hotelId = new URLSearchParams(window.location.search).get('hotelId') ?? '';
  const allRooms = useSelector((state: RootState) => state.rooms.filteredRooms);
  console.log('allRooms',allRooms)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        
        const response = await api.getRoomsByHotelId(hotelId);
        console.log('response',response)
        dispatch(setRooms(response));
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching room data:', error);
        setLoading(false);
        setError('Failed to fetch rooms. Please try again.')
      }
    };

    fetchRooms();
    return () => {
      dispatch(clearAddress());
    };
  }, [hotelId, dispatch]);

  const filteredRooms = allRooms.filter((room) =>
    room.roomType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;

  const currentRooms = filteredRooms.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1);
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  const handleRoomClick = (roomId: string) => {
    const selectedRoom = allRooms.find((room) => room._id === roomId);
    dispatch(setRoomDetails(selectedRoom));
    onRoomClick(roomId);
  };
  
  return (
    <Container sx={{ p: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <TextField
            label="Search Room"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: '80%' }} 
          />
        </Grid>
        <Grid item xs={6} sm={6}>
        <RoomPriceSlider />
        </Grid>
      </Grid>

      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr)) !important',
        }}
      >
        {currentRooms.map((room) => (
          <Tooltip title="Click to view room details!" key={room._id}>
           
            <Card sx={{ width: '100%', height: '270px' }}  onClick={() => handleRoomClick(room._id)}>
              <ImageListItem sx={{ height: '100% !important' }}>
                <ImageListItemBar
                  sx={{
                    background: '0',
                  }}
                  title={room.roomType}
                  subtitle={`Rooms in ${room.hotelName}`}
                  actionIcon={<Avatar src={'/logo/StayCationLogo.webp'} sx={{ m: '10px' }} />}
                  position="top"
                />
                 <img src={room.images[0]} alt={room.hotelName} style={{ cursor: 'pointer' }} loading="lazy" />
                <ImageListItemBar
                  title={`₹${room.rentAmount}`}
                  subtitle={'Rent per night'}
                />
              </ImageListItem>
            </Card>
          </Tooltip>
        ))}
      </ImageList>

      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pagination
          count={Math.ceil(filteredRooms.length / PAGE_SIZE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Container>
    </Container>
  );
};

export default RoomListScreen;









