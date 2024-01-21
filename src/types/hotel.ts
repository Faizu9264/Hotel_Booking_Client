export interface HotelData {
  name: string;
  id: string;
  minRent?: number;
  location?: string;
  email?: string;
  phone?: string;
}

export interface Hotel {
  _id: string;
  details: {
    hotelName: string;
    minRent: number;
    location: string;
    emailAddress: string;
    description: string;
    contactNo: number;
  };
  images: string[];
  location: { lat: number; lng: number };
  dropImage: string;
  createdAt: Date;
}
