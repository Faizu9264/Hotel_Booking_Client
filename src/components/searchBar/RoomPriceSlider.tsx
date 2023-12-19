// RoomPriceSlider.tsx
import { Box, IconButton, Slider, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setPriceFilter } from '../../redux/slices/roomSlice';
import { CurrencyRupee } from '@mui/icons-material';

const marks = [
  { value: 100, label: '₹100' },
  { value: 2000, label: '₹2000' },
  { value: 3500, label: '₹3500' },
];

const RoomPriceSlider: React.FC = () => {
  const dispatch = useDispatch();
  const containerRef = useRef<any>(null);
  const priceFilter = useSelector((state: RootState) => state.rooms.priceFilter);
  const handleSliderChange = (_event: Event, price: number | number[]) => {
    const newPrice = Array.isArray(price) ? price[0] : price;
    dispatch(setPriceFilter(newPrice));
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton color="inherit" size="small" sx={{ fontSize: 'bold', mr: 1 }}>
          <CurrencyRupee />
        </IconButton>
        <Typography variant="caption" color="textSecondary">
          Rent Amount
        </Typography>
      </Box>
      <Box sx={{ width: '100%', mb: 2 }}>
        <Slider
          min={100}
          max={3500}
          defaultValue={3500}
          sx={{ width: '97%', color: 'grey' }}
          valueLabelDisplay="auto"
          marks={marks}
          value={priceFilter !== undefined ? priceFilter : 3500}
          onChange={handleSliderChange}
        />
      </Box>
    </Box>
  );
};

export default RoomPriceSlider;
