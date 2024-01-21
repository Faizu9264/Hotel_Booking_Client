export interface PointFeature {
  type: "Feature";
  properties: {
    cluster: boolean;
    hotelId: string;
    hotelName: string;
    minimumRent: number;
    description: string;
    hotelImage: string[];
    longitude: number;
    latitude: number;
    dropImage: string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  id?: string;
}
