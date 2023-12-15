

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
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
import { LocationOnOutlined, Pin, StarBorder } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PriceSlider from '../../components/searchBar/PriceSlider';
import { useNavigate } from 'react-router-dom';
const PAGE_SIZE = 6;
interface HotelListScreenProps {
  onHotelClick: (hotelId: string) => void;
}
const HotelListScreen: React.FC<HotelListScreenProps> = ({ onHotelClick }) => {
  const allHotels = useSelector((state: RootState) => state.hotel.filteredHotels);
  const navigate = useNavigate();

  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const filteredHotels = allHotels.filter((hotel) =>
  hotel.details.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  hotel.details.location.toLowerCase().includes(locationQuery.toLowerCase())
);
  
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;

  const currentHotels = filteredHotels.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setLocationQuery(query); 
    setCurrentPage(1);
  };
  const handleHotelClick = (hotelId: string) => {
    onHotelClick(hotelId);
  };

  return (
    <Container sx={{ p: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} >
          <TextField
            label="Search Hotel"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: '80%' }} 
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <PriceSlider/>
        </Grid>
      </Grid>

      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns: 'repeat(auto-fill,minmax(280px, 1fr)) !important',
        }}
      >
        {currentHotels.map((hotel) => (
          <Tooltip title="Click to check room availability!" key={hotel._id}>
      
      <Card sx={{ width: '100%', height: '270px', cursor: 'pointer' }} onClick={() => handleHotelClick(hotel._id)}>
              <ImageListItem sx={{ height: '100% !important' }}>
                <ImageListItemBar
                  sx={{
                    background: '0',
                  }}
                  title={hotel.details.hotelName}
                  subtitle={`𖡡 ${hotel.details.location}`}
                  actionIcon={<Avatar src={'/logo/StayCationLogo.webp'} sx={{ m: '10px' }} />}
                  position="top"
                />
                <img src={hotel.images[0]} alt={hotel.details.hotelName} style={{ cursor: 'pointer' }} loading="lazy" />
                <ImageListItemBar
                  title={`₹${hotel.details.minRent}`}
                  subtitle={'Rooms start from'}
                  actionIcon={
                    <Rating
                      sx={{ color: 'rgba(255,255,255, 0.8)', mr: '5px' }}
                      name="hotelRating"
                      defaultValue={3.5}
                      precision={0.5}
                      emptyIcon={<StarBorder sx={{ color: 'rgba(255,255,255, 0.8)' }} />}
                    />
                  }
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
          count={Math.ceil(filteredHotels.length / PAGE_SIZE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Container>
    </Container>
  );
};

export default HotelListScreen;



