
// hotelActionTypes.ts
export const UPDATE_HOTEL = 'UPDATE_HOTEL';

export interface Hotel {
  _id: string;
  price: number; 
  uName: string;
  uPhoto: string;
  images: string[];
  title: string;
  description:string;
  lat:string;
  lng:string;
  createdAt:Date;
}
