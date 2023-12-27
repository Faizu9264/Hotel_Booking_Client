import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography, Avatar } from '@material-tailwind/react';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { RootState } from '../../../../redux/store';
import adminApi from '../../../../services/adminApi';
import { Dispatch } from 'redux';
import { updateBookingStatus, selectAllBookings } from '../../../../redux/slices/AllBookingsSlice';
import { addBooking } from '../../../../redux/slices/AllBookingsSlice';


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
  BookingStatus: string;
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

export const BookingListingTable: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  // const bookings: Booking[] = useSelector(selectAllBookings) ?? [];
  const bookings: Booking[] = useSelector((state: RootState) => state.allBooking.allBookings) ?? [];


  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState<null | Booking>(null);

  const pageSize: number = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(adminApi.getAllBookings());
        console.log('Response:', response);
        console.log('Updated Bookings:',bookings);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchData();
  }, [dispatch,bookings]);

  const startIndex: number = (selectedPage - 1) * pageSize;
  const displayedBookings: Booking[] = bookings?.slice(startIndex, startIndex + pageSize) || [];


  const handlePageClick = (pageNumber: number): void => {
    setSelectedPage(pageNumber);
  };

  const handleManageBookingClick = (bookingId: string): void => {
    const selectedBooking = bookings.find((booking) => booking._id === bookingId);
    setSelectedBookingDetails(selectedBooking || null);
  };

  const handleApproveBookingClick = async (bookingId?: string): Promise<void> => {
    if (bookingId) {
      try {
        await dispatch(updateBookingStatus({ bookingId, bookingStatus: 'Approved' }));
      } catch (error) {
        console.error('Error approving booking:', error);
      }
    }
  };

  const handleCancelBookingClick = async (bookingId?: string): Promise<void> => {
    if (bookingId) {
      try {
        await dispatch(updateBookingStatus({ bookingId, bookingStatus: 'Cancelled' }));
      } catch (error) {
        console.error('Error cancelling booking:', error);
      }
    }
  };

  return (
    <Card className="h-full w-full overflow-hidden">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray" className="ml-3 mt-3">
              Manage Bookings
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-x-auto px-0">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Hotel Name
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Room Type
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Check-In Date
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Check-Out Date
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Total
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Payment Status
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Booking Status
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
          {displayedBookings.map(
              ({ _id, RoomId, checkInDate, checkOutDate, total, paymentStatus, BookingStatus }) => {
                const isLast = _id === displayedBookings[displayedBookings.length - 1]._id;
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray">
                        {RoomId.hotelName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray">
                        {RoomId.roomType}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray">
                        {new Date(checkInDate).toLocaleDateString()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray">
                        {new Date(checkOutDate).toLocaleDateString()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray">
                        {total}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray">
                        {paymentStatus}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray">
                        {BookingStatus}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button
                        variant="outlined"
                        onClick={() => handleManageBookingClick(_id)}
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <FaBan className="h-4 w-4" style={{ color: 'red' }} />
                        Manage
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button
          variant="outlined"
          size="sm"
          disabled={selectedPage === 1}
          onClick={() => handlePageClick(selectedPage - 1)}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {[...Array(Math.ceil(bookings.length / pageSize)).keys()].map(
            (pageNumber) => (
              <Button
                key={pageNumber + 1}
                variant={
                  pageNumber + 1 === selectedPage ? 'filled' : 'text'
                }
                color={pageNumber + 1 === selectedPage ? 'blue' : 'gray'}
                onClick={() => handlePageClick(pageNumber + 1)}
                className="rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              >
                {pageNumber + 1}
              </Button>
            )
          )}
        </div>
        <Button
          variant="outlined"
          size="sm"
          disabled={startIndex + pageSize >= bookings.length}
          onClick={() => handlePageClick(selectedPage + 1)}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingListingTable;
