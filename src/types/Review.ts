export interface Review {
  userId: string;
  username: string;
  profileImage: string;
  rating: number;
  comment: string;
  reviewText: string;
  _id: string;
  hotelId: string;
  date: Date;
}

export interface StarRatingProps {
  totalStars: number;
  initialRating?: number;
  onChange: (value: number) => void;
}
