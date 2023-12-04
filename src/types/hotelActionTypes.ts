// hotelActionTypes.ts
export const UPDATE_HOTEL = 'UPDATE_HOTEL';

export interface Hotel {
  _id: string;
  HotelName: string;
  minRent: number;
  location: string;
  email: string;
  amenities: string[];
  images: string[];
  description: string;
  phone: Number;
  lat: number;
  lng: number;
  dropImage:string;
  createdAt: Date;
}

export interface ImageFile extends File {
  url: string;
  key: string;
}
