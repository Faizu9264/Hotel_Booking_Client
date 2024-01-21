export interface Room {
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
}

export interface RoomDetails {
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
}
