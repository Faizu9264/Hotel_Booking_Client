export interface BookingIncomeChartProps {
  data: number[];
}

export interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Booking {
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
  createdAt: string;
  userId: string;
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

export interface BookingDetails {
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
  roomDetails: {
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
