import React, { useEffect, Component, ReactNode, useState } from "react";
import { Line, Bar } from "react-chartjs-2";

import "chart.js/auto";
import "chart.js";
import { UserData } from "../../../types/authTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Dispatch } from "redux";
import adminApi from "../../../services/adminApi";
import { Booking } from "../../../types/booking";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faHotel,
  faHome,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import BookingIncomeChart from "./BookingChartIncome";
import RoomTypeChart from "./chart/RoomTypeChart";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

type Room = {
  amenities: string[];
  createdAt: string;
  description: string;
  discountPrice: number;
  hotelId: string;
  hotelName: string;
  images: string[];
  maxPeople: number;
  rentAmount: number;
  roomType: string;
  roomsCount: number;
};

type RoomType = {
  name: string;
  count: number;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }

    return this.props.children;
  }
}

const MainDashboard = () => {
  const users: UserData[] = useSelector((state: RootState) => state.auth.users);
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  const bookings: Booking[] =
    useSelector((state: RootState) => state.allBooking.allBookings) ?? [];
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);

  const handleHotelSelect = (hotelId: string) => {
    setSelectedHotelId(hotelId);
  };

  const getRoomTypesData = (filteredRooms: Room[]): RoomType[] => {
    const roomTypesCount: { [key: string]: number } = {};

    filteredRooms.forEach((room) => {
      const { roomType, roomsCount } = room;
      roomTypesCount[roomType] =
        (roomTypesCount[roomType] || 0) + (roomsCount || 0);
    });

    const roomTypesData: RoomType[] = Object.entries(roomTypesCount).map(
      ([name, count]) => ({
        name,
        count,
      })
    );

    return roomTypesData;
  };

  const filteredRooms = selectedHotelId
    ? rooms.filter((room) => room.hotelId === selectedHotelId)
    : [];

  const roomTypesData = getRoomTypesData(filteredRooms);

  const [totalRoomsCount, setTotalRoomsCount] = useState(0);
  const dispatch: Dispatch<any> = useDispatch();

  const currentDate = new Date();
  const todayBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.createdAt);
    return (
      bookingDate.getDate() === currentDate.getDate() &&
      bookingDate.getMonth() === currentDate.getMonth() &&
      bookingDate.getFullYear() === currentDate.getFullYear() &&
      booking.paymentStatus === "success"
    );
  });

  const thisWeekBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.createdAt);
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    return (
      bookingDate >= firstDayOfWeek &&
      bookingDate <= currentDate &&
      booking.paymentStatus === "success"
    );
  });

  const thisMonthBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.createdAt);
    return (
      bookingDate.getMonth() === currentDate.getMonth() &&
      bookingDate.getFullYear() === currentDate.getFullYear() &&
      booking.paymentStatus === "success"
    );
  });

  const thisYearBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.createdAt);
    return (
      bookingDate.getFullYear() === currentDate.getFullYear() &&
      booking.paymentStatus === "success"
    );
  });

  const bookingIncomeData = [
    todayBookings.reduce((total, booking) => total + booking.total, 0),
    thisWeekBookings.reduce((total, booking) => total + booking.total, 0),
    thisMonthBookings.reduce((total, booking) => total + booking.total, 0),
    thisYearBookings.reduce((total, booking) => total + booking.total, 0),
  ];

  const bookingsByMonth: { [month: string]: number } = {};
  bookings.forEach((booking) => {
    const bookingDate = new Date(booking.createdAt);
    const monthYearKey = `${
      bookingDate.getMonth() + 1
    }-${bookingDate.getFullYear()}`;
    bookingsByMonth[monthYearKey] =
      (bookingsByMonth[monthYearKey] || 0) + booking.total;
  });
  const monthlyBookingIncomeData = Object.values(bookingsByMonth);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const labels = Object.keys(bookingsByMonth).map((monthYear) => {
    const [month, year] = monthYear.split("-");
    return `${monthNames[parseInt(month, 10) - 1]}-${year}`;
  });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Booking Income",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: monthlyBookingIncomeData,
      },
    ],
  };

  const calculateTotalRoomsCount = () => {
    let sum = 0;
    rooms.forEach((room) => {
      sum += room.roomsCount || 0;
    });

    return sum;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (users.length <= 0) {
          dispatch(adminApi.getAllUsers());
        }
        if (hotels.length <= 0) {
          dispatch(adminApi.getAllHotels());
        }
        if (rooms.length <= 0) {
          dispatch(adminApi.getAllRooms());
        }

        dispatch(adminApi.getAllBookings());
        const totalRooms = calculateTotalRoomsCount();
        setTotalRoomsCount(totalRooms);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [dispatch, hotels, users, bookings]);

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 flex">
          <div className="count-card hover:shadow-lg transition-transform transform hover:scale-105 bg-blue-200 p-6 rounded-md text-center flex items-center">
            <FontAwesomeIcon
              icon={faUsers}
              className="h-8 w-8 text-blue-500 mr-2"
            />
            <div className="flex flex-col items-center mx-4">
              <div className="text-xl font-bold mb-2">Users</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-800">
                {users.length}
              </div>
            </div>
          </div>

          <div className="count-card hover:shadow-lg transition-transform transform hover:scale-105 bg-green-200 p-6 rounded-md text-center flex items-center">
            <FontAwesomeIcon
              icon={faHotel}
              className="h-8 w-8 text-green-500 mr-2"
            />
            <div className="flex flex-col items-center mx-4">
              <div className="text-xl font-bold mb-2">Hotels</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-green-800">
                {hotels.length}
              </div>
            </div>
          </div>

          <div className="count-card hover:shadow-lg transition-transform transform hover:scale-105 bg-yellow-200 p-6 rounded-md text-center flex items-center">
            <FontAwesomeIcon
              icon={faHome}
              className="h-8 w-8 text-yellow-500 mr-2"
            />
            <div className="flex flex-col items-center mx-4">
              <div className="text-xl font-bold mb-2">Rooms</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-yellow-800">
                {totalRoomsCount}
              </div>
            </div>
          </div>

          <div className="count-card hover:shadow-lg transition-transform transform hover:scale-105 bg-pink-200 p-6 rounded-md text-center flex items-center">
            <FontAwesomeIcon
              icon={faCalendar}
              className="h-8 w-8 text-pink-500 mr-2"
            />
            <div className="flex flex-col items-center mx-4">
              <div className="text-xl font-bold mb-2">Bookings</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-pink-800">
                {bookings.length}
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-white p-4 rounded shadow-md"
          style={{ height: "400px" }}
        >
          <h2 className="text-xl font-bold mb-4">Bookings Income</h2>
          <div className="flex flex-row">
            <div className="w-1/2 p-4">
              <h3 className="text-lg font-semibold mb-2">Monthly Income</h3>
              <Bar data={data} />
            </div>
            <div className="w-1/4 p-4 ">
              <h3 className="text-lg font-semibold mb-2 mb-0">Yearly Income</h3>
              <BookingIncomeChart data={bookingIncomeData} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-md lg:col-span-2 xl:col-span-2">
          <label className="block text-sm font-semibold mb-2">
            Select Hotel:
          </label>
          <select
            onChange={(e) => handleHotelSelect(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select a hotel</option>
            {hotels.map((hotel) => (
              <option key={hotel._id} value={hotel._id}>
                {hotel.details.hotelName}
              </option>
            ))}
          </select>

          {selectedHotelId && (
            <div>
              <h2 className="text-xl font-bold my-4">Room Types</h2>
              <div className="flex flex-row">
                <div className="w-full p-4">
                  <h3 className="text-lg font-semibold mb-2">Room Types</h3>
                  <RoomTypeChart roomTypesData={roomTypesData} />
                </div>
              </div>
            </div>
          )}

          {!selectedHotelId && (
            <p className="text-gray-500 text-center my-4">
              Please select a hotel to view room types.
            </p>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default MainDashboard;
