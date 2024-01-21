
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
import LoadingSpinner from '../common/LoadingSpinner';
import './MyBookings.css'
import { minHeight, styled } from '@mui/system';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useNavigate } from 'react-router-dom';
import { addBooking } from '../../redux/slices/AllBookingsSlice';
import { Booking } from '../../types/booking';


const FlipContainer = styled('div')({
  perspective: '1000px',
  marginBottom: '20px',
});

const Flipper = styled('div')<{ isFlipped: boolean }>((props) => ({
  transformStyle: 'preserve-3d',
  transition: 'transform 1s ease-in-out',
  height: '100%',
  transform: props.isFlipped ? 'rotateY(180deg)' : 'none',
}));


const Front = styled('div')({
  backfaceVisibility: 'hidden',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: 1,
});

const Back = styled('div')({
  backfaceVisibility: 'hidden',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  transform: 'rotateY(180deg)',
  zIndex: 0,
})

interface TableContainerProps {
  component?: React.ElementType;
}

const TableContainerStyled = styled(TableContainer)<TableContainerProps>(({ theme }) => ({
  position: 'relative',
  overflowY: 'auto',
}));

const MyBookings: React.FC = () => {
 
  const [completedBookings, setCompletedBookings] = useState<Booking[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeTable, setActiveTable] = useState<'completed' | 'upcoming'>('upcoming');
  const userData = useSelector((state: RootState) => state.auth.user);
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const userId = String(userData._id || userData.userId);
      const response = await api.getBookingsByUserId(userId);
      const today = new Date();

      const completed = response.filter(
        (booking: any) => new Date(booking.checkOutDate) < today
      );
      const upcoming = response.filter(
        (booking: any) => new Date(booking.checkOutDate) >= today
      );

      setCompletedBookings(completed);
      setUpcomingBookings(upcoming);
      dispatch(addBooking(response));

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

  const toggleTable = () => {
    setActiveTable((prevTable) => (prevTable === 'completed' ? 'upcoming' : 'completed'));
  };

  const renderTable = () => {
    if (activeTable === 'completed') {
      return renderCompletedBookingsTable();
    } else {
      return renderUpcomingBookingsTable();
    }
  };

  const handleCancelBookingClick = async (bookingId: string,total:number): Promise<void> => {
    if (bookingId) {
      showCancelConfirmationDialog(bookingId,total);
    }
  };
  const showCancelConfirmationDialog = (bookingId: string,total:number) => {
    Swal.fire({
      title: 'Confirm Cancellation',
      text: 'Are you sure you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        CancelBooking(bookingId,total);
      }
    });
  };
  const CancelBooking = async (bookingId: string,total:number) => {
    try {
      
     await dispatch(api.cancelBooking(bookingId,total,userData.userId));
     const refundAmount = total || 0;
     await api.refundBooking(userData.userId, { amount: refundAmount, paymentMethod: 'booking canceled by user' });
      Swal.fire({
        title: 'Refund Successful!',
        text: 'The booking has been canceled and the amount refunded.',
        icon: 'success',
      });
      fetchData();
    } catch (error: any) {
      console.error('Error canceling booking:', error.message);
    }
  };
  const handleOpenReviewPage = (booking: Booking) => {
    navigate(`/reviews/add?bookingId=${booking._id}`);
  };
  const getStatusBadgeColor = (status: string): string => {
    switch (status) {
      case 'confirmed':
        return 'green';
        case 'success':
          return 'green';
          case 'failed':
          return 'red';
      case 'pending':
        return 'orange';
      case 'canceled by admin':
        return 'red';
        case 'canceled by user':
          return 'red';
      case 'approved by admin':
        return 'blue';
      default:
        return 'gray';
    }
  };
  const renderUpcomingBookingsTable = () => (
    <FlipContainer className={`${activeTable}`}>
   <Flipper isFlipped={activeTable === 'completed'}>
      <Front>
      <TableContainerStyled component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'blue' }}>Hotel Name</TableCell>
            <TableCell sx={{ color: 'blue' }}>Room Type</TableCell>
            <TableCell sx={{ color: 'blue' }}>Check-In Date</TableCell>
            <TableCell sx={{ color: 'blue' }}>Check-Out Date</TableCell>
            <TableCell sx={{ color: 'blue' }}>Total</TableCell>
            <TableCell sx={{ color: 'blue' }}>Payment Status</TableCell>
            <TableCell sx={{ color: 'blue' }}>Booking Status</TableCell>
            <TableCell sx={{ color: 'blue' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {upcomingBookings.map((booking: any) => (
            <TableRow key={booking._id}>
              <TableCell>{booking.RoomId.hotelName}</TableCell>
              <TableCell>{booking.RoomId.roomType}</TableCell>
              <TableCell>{formatDate(booking.checkInDate)}</TableCell>
              <TableCell>{formatDate(booking.checkOutDate)}</TableCell>
              <TableCell>{formatCurrency(booking.total)}</TableCell>
              <TableCell sx={{ color: 'green' }}>{booking.paymentStatus}</TableCell>
              <TableCell style={{ color: getStatusBadgeColor(booking?.BookingStatus) }}>{booking.BookingStatus}</TableCell>
              <TableCell>
                <Button onClick={() => handleViewDetails(booking)}>View</Button>
                {isUpcomingBooking(booking) &&
                  booking.BookingStatus !== 'canceled by user' &&
                  booking.BookingStatus !== 'canceled by admin' && (
                    <Button sx={{ color: 'red' }} onClick={() => handleCancelBookingClick(booking._id,booking.total)}>
                      Cancel
                    </Button> 
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainerStyled>
      </Front>
      </Flipper>
    </FlipContainer>
  );

  const renderCompletedBookingsTable = () => (
    <FlipContainer>
  <Flipper isFlipped={activeTable === 'completed'}>
    <Back>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'blue' }}>Hotel Name</TableCell>
            <TableCell sx={{ color: 'blue' }}>Room Type</TableCell>
            <TableCell sx={{ color: 'blue' }}>Check-In Date</TableCell>
            <TableCell sx={{ color: 'blue' }}>Check-Out Date</TableCell>
            <TableCell sx={{ color: 'blue' }}>Total</TableCell>
            <TableCell sx={{ color: 'blue' }}>Payment Status</TableCell>
            <TableCell sx={{ color: 'blue' }}>Booking Status</TableCell>
            <TableCell sx={{ color: 'blue' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {completedBookings.map((booking: any) => (
            <TableRow key={booking._id}>
              <TableCell>{booking.RoomId.hotelName}</TableCell>
              <TableCell>{booking.RoomId.roomType}</TableCell>
              <TableCell>{formatDate(booking.checkInDate)}</TableCell>
              <TableCell>{formatDate(booking.checkOutDate)}</TableCell>
              <TableCell>{formatCurrency(booking.total)}</TableCell>
              <TableCell sx={{ color: 'green' }}>{booking.paymentStatus}</TableCell>
              <TableCell style={{ color: getStatusBadgeColor(booking?.BookingStatus) }}>{booking.BookingStatus}</TableCell>
              <TableCell>
                <Button  onClick={() => handleViewDetails(booking)}>View</Button>
                {booking.BookingStatus === 'approved by admin' && (
              <Button onClick={() => handleOpenReviewPage(booking)}>
                Add Review
              </Button>
            )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Back>
      </Flipper>
    </FlipContainer>
  );

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


  const isUpcomingBooking = (booking: Booking): boolean => {
    const today = new Date();
    const checkOutDate = new Date(booking.checkOutDate);
    return checkOutDate >= today;
  };

  return (
    <div style={{minHeight:'900px'}}>
    <Container className="" >
    <Typography variant="h4" align="center" gutterBottom>
      My Bookings
    </Typography>
    <div className="table-headings">
  <Typography
    variant="h5"
    sx={{
      textAlign: 'center',
      cursor: 'pointer',
      color: activeTable === 'completed' ? 'black' : 'blue',
      fontSize: activeTable === 'completed' ? '1.5rem' : '1rem',
    }}
    onClick={activeTable === 'completed' ? undefined : toggleTable}
    className={`table-heading ${activeTable === 'completed' ? 'disabled' : ''}`}
    gutterBottom
  >
    Completed Bookings {activeTable === 'upcoming' && '➤'}
  </Typography>
  <Typography
    variant="h5"
    sx={{
      textAlign: 'center',
      cursor: 'pointer',
      color: activeTable === 'upcoming' ? 'black' : 'blue',
      fontSize: activeTable === 'upcoming' ? '1.5rem' : '1rem',
    }}
    onClick={activeTable === 'upcoming' ? undefined : toggleTable}
    className={`table-heading ${activeTable === 'upcoming' ? 'disabled' : ''}`}
    gutterBottom
  >
    Upcoming Bookings {activeTable === 'completed' && '➤'}
  </Typography>
</div>



      {renderTable()}

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
                
                <Typography variant="body1" >
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
    </div>
  );
};

export default MyBookings;
