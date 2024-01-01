



import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Button, Typography } from '@material-tailwind/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './modal.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setSelectedBookingId } from '../../../../redux/slices/AllBookingsSlice';

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const selectedBookingId = useSelector((state: RootState) => state.allBooking.selectedBookingId);
  const bookingDetails = useSelector((state: RootState) =>
    state.allBooking.allBookings.find((booking) => booking._id === selectedBookingId)
  );

  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  useEffect(() => {
    if (!isOpen) {
      dispatch(setSelectedBookingId(null));
    }
  }, [isOpen, dispatch]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <div className="modal-content" >
        <Typography variant="h6" color="blue-gray"
                placeholder={'typography'}
                >
          Booking Details
        </Typography>
       
        {bookingDetails && (
          <div className="mt-4">
            <Slider {...sliderSettings}>
              {bookingDetails.RoomId.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Room Image ${index + 1}`} className="mt-2 rounded-md" />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>

   
      <div className="p-4 modal-content">

        {bookingDetails && (
          <div className="mt-4">
            <p>
              <strong>Guest Name:</strong> {bookingDetails.guestName}
            </p>
            <p>
              <strong>Email:</strong> {bookingDetails.email}
            </p>
            <p>
              <strong>Phone:</strong> {bookingDetails.phone}
            </p>
            <p>
              <strong>Special Requests:</strong> {bookingDetails.specialRequests}
            </p>
            <p>
              <strong>Check-In Date:</strong>{' '}
              {new Date(bookingDetails.checkInDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Check-Out Date:</strong>{' '}
              {new Date(bookingDetails.checkOutDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Adults:</strong> {bookingDetails.adultCount}
            </p>
            <p>
              <strong>Children:</strong> {bookingDetails.childrenCount}
            </p>
            <p>
              <strong>Total Rooms:</strong> {bookingDetails.roomCount}
            </p>
            <p>
              <strong>Nights:</strong> {bookingDetails.nightCount}
            </p>
            <p>
              <strong>Total:</strong> {bookingDetails.total}
            </p>
            <p>
              <strong>Discount Price:</strong> {bookingDetails.discountPrice}
            </p>
            <p>
              <strong>Payment Status:</strong> {bookingDetails.paymentStatus}
            </p>
            <p>
              <strong>Booking Status:</strong> {bookingDetails.BookingStatus}
            </p>
            
          </div>
          
        )}
      </div>
      <div>
     <button onClick={onClose} className="modal-close-btn">
          <i className="material-icons">close</i>
        </button>
     </div>
    </Modal>
  );
};

export default BookingDetailsModal;