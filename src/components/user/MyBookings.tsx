import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import api from '../../services/userApi';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../common/LoadingSpinner';

interface Booking {
  _id: string;
  guestName: string;
  email: string;
  phone: string;
  specialRequests: string;
  checkInDate: Date;
  checkOutDate: Date;
  adultCount: number;
  childrenCount: number;
  roomCount: number;
  nightCount: number;
  maxPeople: number;
  total: number;
  discountPrice: number;
  paymentStatus: string;
  BookingStatus:string;
  RoomId: {
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

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const userData = useSelector((state: RootState) => state.auth.user);
  const [imageLoaded, setImageLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const userId = String(userData._id || userData.userId);
      const response = await api.getBookingsByUserId(userId);
      console.log('response123', response);
      setBookings(response);
    } catch (error: any) {
      console.error('Error fetching bookings:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userData]);

  const handleViewDetails = (selectedBooking: Booking) => {
    setSelectedBooking(selectedBooking);
  };

  const handleCloseDetails = () => {
    setSelectedBooking(null);
  };

  const formatDate = (dateString: Date | '') => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2, 4);
    return `${day}/${month}/${year}`;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <Container sx={{ minHeight: '280px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Bookings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hotel Name</TableCell>
              <TableCell>Room Type</TableCell>
              <TableCell>Check-In Date</TableCell>
              <TableCell>Check-Out Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell sx={{ color: 'green' }}>Payment Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings &&
              bookings?.map((booking: any) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.RoomId.hotelName}</TableCell>
                  <TableCell>{booking.RoomId.roomType}</TableCell>
                  <TableCell>{formatDate(booking.checkInDate)}</TableCell>
                  <TableCell>{formatDate(booking.checkOutDate)}</TableCell>
                  <TableCell>{formatCurrency(booking.total)}</TableCell>
                  <TableCell sx={{ color: 'green' }}>{booking.paymentStatus}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleViewDetails(booking)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!selectedBooking} onClose={handleCloseDetails}>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5">
                Hotel Name: {selectedBooking?.RoomId.hotelName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
              {!imageLoaded && <LoadingSpinner />}
              <CardMedia
                  component="img"
                  height="140"
                  src={selectedBooking?.RoomId.images[0] || ''}
                  alt={selectedBooking?.RoomId.hotelName || ''}
                  onLoad={() => setImageLoaded(true)} 
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography variant="body1">
                  Room Type: {selectedBooking?.RoomId.roomType}
                </Typography>
                <Typography variant="body1">
                  Check-In Date: {formatDate(selectedBooking?.checkInDate || '')}
                </Typography>
                <Typography variant="body1">
                  Check-Out Date: {formatDate(selectedBooking?.checkOutDate || '')}
                </Typography>
                <Typography variant="body1">
                  Room Count: {selectedBooking?.roomCount || 0}
                </Typography>
                <Typography variant="body1">
                  Night: {selectedBooking?.nightCount || 0}
                </Typography>
                <Typography variant="body1">
                  Adult: {selectedBooking?.adultCount || 0}
                </Typography>
                <Typography variant="body1">
                  Children: {selectedBooking?.childrenCount || 0}
                </Typography>
                <Typography variant="body1">
                  Total: {formatCurrency(selectedBooking?.total || 0)}
                </Typography>
                <Typography variant="body1">
                  Payment Status: {selectedBooking?.paymentStatus}
                </Typography>
                <Typography variant="body1">
                  Booking Status: {selectedBooking?.BookingStatus}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Description: {selectedBooking?.RoomId.description}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyBookings;
