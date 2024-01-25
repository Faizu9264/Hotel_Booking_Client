import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { FaBan, FaCheckCircle } from "react-icons/fa";
import { RootState } from "../../../../redux/store";
import adminApi from "../../../../services/adminApi";
import { Dispatch } from "redux";
import {
  updateBookingStatus,
  selectAllBookings,
} from "../../../../redux/slices/AllBookingsSlice";
import BookingDetailsModal from "./BookingDetailsModal";
import "react-confirm-alert/src/react-confirm-alert.css";
import Swal from "sweetalert2";
import { setSelectedBookingId } from "../../../../redux/slices/AllBookingsSlice";
import { Booking } from "../../../../types/booking";

export const BookingListingTable: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const bookings: Booking[] =
    useSelector((state: RootState) => state.allBooking.allBookings) ?? [];

  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedBookingDetailsForModal, setSelectedBookingDetailsForModal] =
    useState<Booking | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const pageSize: number = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(adminApi.getAllBookings());
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  useEffect(() => {
    const filtered = bookings.filter(
      ({ RoomId, paymentStatus, BookingStatus }) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          RoomId.hotelName.toLowerCase().includes(searchLower) ||
          RoomId.roomType.toLowerCase().includes(searchLower) ||
          paymentStatus.toLowerCase().includes(searchLower) ||
          BookingStatus.toLowerCase().includes(searchLower)
        );
      }
    );
    setFilteredBookings(filtered);
  }, [searchQuery, bookings]);
  const startIndex: number = (selectedPage - 1) * pageSize;
  const displayedBookings: Booking[] =
    filteredBookings?.slice(startIndex, startIndex + pageSize) || [];

  const handlePageClick = (pageNumber: number): void => {
    setSelectedPage(pageNumber);
  };

  const handleViewDetailsClick = (bookingId: string) => {
    dispatch(setSelectedBookingId(bookingId));
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBookingDetailsForModal(null);
  };

  const handleApproveBookingClick = async (
    bookingId?: string
  ): Promise<void> => {
    if (bookingId) {
      showApproveConfirmationDialog(bookingId);
    }
  };

  const handleCancelBookingClick = async (
    bookingId: string,
    total: number,
    userId: string
  ): Promise<void> => {
    if (bookingId) {
      showCancelConfirmationDialog(bookingId, total, userId);
    }
  };
  const showApproveConfirmationDialog = (bookingId: string) => {
    Swal.fire({
      title: "Confirm Approval",
      text: "Are you sure you want to approve this booking?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        approveBooking(bookingId);
      }
    });
  };

  const showCancelConfirmationDialog = (
    bookingId: string,
    total: number,
    userId: string
  ) => {
    Swal.fire({
      title: "Confirm Cancellation",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        cancelBooking(bookingId, total, userId);
      }
    });
  };

  const approveBooking = async (bookingId: string) => {
    try {
      dispatch(adminApi.approveBooking(bookingId));

      dispatch(
        updateBookingStatus({ bookingId, bookingStatus: "approved by admin" })
      );

      Swal.fire({
        title: "Approved!",
        text: "The booking has been approved.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

  const cancelBooking = async (
    bookingId: string,
    total: number,
    userId: string
  ) => {
    try {
      await dispatch(adminApi.cancelBooking(bookingId));
      dispatch(
        updateBookingStatus({ bookingId, bookingStatus: "cancelled by admin" })
      );
      const refundAmount = total || 0;
      await adminApi.refundBooking(userId, {
        amount: refundAmount,
        paymentMethod: "booking canceled by admin",
      });
      Swal.fire({
        title: "Cancelled!",
        text: "The booking has been cancelled.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const getStatusBadgeColor = (status: string): string => {
    switch (status) {
      case "confirmed":
        return "green";
      case "success":
        return "green";
      case "pending":
        return "orange";
      case "canceled by admin":
        return "red";
      case "approved by admin":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <Card className="h-full w-full overflow-hidden" placeholder={"card"}>
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none"
        placeholder={"card header"}
      >
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              className="ml-3 mt-3"
              placeholder={"typograpy"}
            >
              Manage Bookings
            </Typography>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
            }}
          />
        </div>
      </CardHeader>
      <CardBody className="overflow-x-auto px-0" placeholder={"card"}>
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={"typography"}
                >
                  Hotel Name
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={"typography"}
                >
                  Room Type
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={"typography"}
                >
                  Nights
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={"typography"}
                >
                  Check-In Date
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={"typography"}
                >
                  Check-Out Date
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={"typography"}
                >
                  Total
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={"typography"}
                >
                  Payment Status
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={"typography"}
                >
                  Booking Status
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={"typography"}
                >
                  Actions
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={"typography"}
                >
                  Details
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedBookings.map(
              ({
                _id,
                RoomId,
                nightCount,
                checkInDate,
                checkOutDate,
                total,
                userId,
                paymentStatus,
                BookingStatus,
              }) => {
                const isLast =
                  _id === displayedBookings[displayedBookings.length - 1]._id;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Typography
                        placeholder={"typography"}
                        variant="small"
                        color="blue-gray"
                      >
                        {RoomId.hotelName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        placeholder={"typography"}
                      >
                        {RoomId.roomType}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        placeholder={"typography"}
                      >
                        {nightCount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        placeholder={"typography"}
                      >
                        {new Date(checkInDate).toLocaleDateString()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        placeholder={"typography"}
                      >
                        {new Date(checkOutDate).toLocaleDateString()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        placeholder={"typography"}
                      >
                        {total}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        style={{ color: getStatusBadgeColor(paymentStatus) }}
                        placeholder={"typography"}
                      >
                        {paymentStatus}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        style={{ color: getStatusBadgeColor(BookingStatus) }}
                        placeholder={"typography"}
                      >
                        {BookingStatus}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {BookingStatus === "confirmed" && (
                        <>
                          <Button
                            variant="outlined"
                            onClick={() => handleApproveBookingClick(_id)}
                            size="sm"
                            className="flex items-center gap-1"
                            style={{ marginBottom: "10px" }}
                            placeholder={"button"}
                          >
                            <FaCheckCircle
                              className="h-4 w-4"
                              style={{ color: "green" }}
                            />
                            Approve
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() =>
                              handleCancelBookingClick(_id, total, userId)
                            }
                            size="sm"
                            className="flex items-center gap-1"
                            placeholder={"button"}
                          >
                            <FaBan
                              className="h-4 w-4"
                              style={{ color: "red" }}
                            />
                            Cancel
                          </Button>
                        </>
                      )}
                    </td>
                    <td className={classes}>
                      <Button
                        variant="outlined"
                        placeholder={"button"}
                        onClick={() => handleViewDetailsClick(_id)}
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter
        className="flex items-center justify-between border-t border-blue-gray-50 p-4"
        placeholder={"cardFooter"}
      >
        <Button
          variant="outlined"
          size="sm"
          disabled={selectedPage === 1}
          onClick={() => handlePageClick(selectedPage - 1)}
          placeholder={"button"}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {[...Array(Math.ceil(bookings.length / pageSize)).keys()].map(
            (pageNumber) => (
              <Button
                key={pageNumber + 1}
                placeholder={"button"}
                variant={pageNumber + 1 === selectedPage ? "filled" : "text"}
                color={pageNumber + 1 === selectedPage ? "blue" : "gray"}
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
          placeholder={"button"}
          onClick={() => handlePageClick(selectedPage + 1)}
        >
          Next
        </Button>
      </CardFooter>
      <BookingDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </Card>
  );
};

export default BookingListingTable;
