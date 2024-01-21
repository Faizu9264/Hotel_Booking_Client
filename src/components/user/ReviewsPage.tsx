import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  Container,
  Grid,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import StarRating from "./StarRating";
import { Booking } from "../../redux/slices/AllBookingsSlice";
import { RootState } from "../../redux/store";
import api from "../../services/userApi";
import { Review } from "../../types/Review";
import { ToastContainer, toast } from "react-toastify";
import { setAllReviews } from "../../redux/slices/allReviewsSlice";
import { useDispatch } from "react-redux";

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [initialRating, setInitialRating] = useState<number>(0);
  const dispatch = useDispatch();
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const allBookings: Booking[] =
    useSelector((state: RootState) => state.allBooking.allBookings) ?? [];
  const userData = useSelector((state: RootState) => state.auth.user);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const bookingId = new URLSearchParams(window.location.search).get(
    "bookingId"
  );
  let isMounted = true;

  const fetchReviews = async () => {
    try {
      if (!userData || !userData.userId || !selectedBooking) {
        console.warn(
          "Selected booking or user data not available.",
          "userData:",
          userData
        );
        return;
      }

      const response = await api.getReviews();

      if (
        response &&
        Array.isArray(response) &&
        response.length > 0 &&
        isMounted
      ) {
        const allReviews: Review[] = response;

        const userReviewForHotel: Review | undefined = allReviews.find(
          (review: Review) =>
            review.userId === userData.userId &&
            review.hotelId === selectedBooking.RoomId.hotelId
        );

        if (userReviewForHotel && isMounted) {
          setUserRating(userReviewForHotel.rating);
          setReviewText(userReviewForHotel.reviewText);
          setComment(userReviewForHotel.comment);
        } else if (isMounted) {
          setUserRating(0);
          setReviewText("");
          setComment("");
        }
        const filteredReviews: Review[] = selectedBooking
          ? allReviews.filter(
              (review: Review) =>
                review.hotelId === selectedBooking.RoomId.hotelId
            )
          : [];

        setReviews(filteredReviews);

        if (isMounted) {
          setReviews(filteredReviews);
        }
      } else {
        console.warn("Empty or undefined response from api.getReviews().");
      }
    } catch (error: any) {
      console.error("Error fetching reviews:", error.message);
    } finally {
      if (isMounted) {
        setLoadingReviews(false);
      }
    }
  };
  useEffect(() => {
    const fetchSelectedBooking = () => {
      const selectedBooking = allBookings.find(
        (booking) => booking._id === bookingId
      );
      if (isMounted) {
        setSelectedBooking(selectedBooking);
      }
    };

    fetchSelectedBooking();
    if (selectedBooking) {
      fetchReviews();
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, selectedBooking, userData, initialRating]);

  const handleAddReview = async () => {
    try {
      if (!selectedBooking || !userRating || !reviewText || !comment) {
        console.error("Invalid data for review.");
        return;
      }

      const userReviewForHotel: Review | undefined = reviews.find(
        (review: Review) =>
          review.userId === userData.userId &&
          review.hotelId === selectedBooking.RoomId.hotelId
      );

      if (userReviewForHotel) {
        const response = await api.addReview({
          userId: userData.userId,
          hotelId: selectedBooking.RoomId.hotelId,
          rating: userRating,
          reviewText,
          comment,
        });
        toast.success("Review updated successfully");
      } else {
        const response = await api.addReview({
          userId: userData.userId,
          hotelId: selectedBooking.RoomId.hotelId,
          rating: userRating,
          reviewText,
          comment,
        });
        toast.success("Review added successfully");
      }
      fetchReviews();
      const updatedReviews = await api.getReviews();
      dispatch(setAllReviews(updatedReviews));
    } catch (error: any) {
      console.error("Error handling review:", error.message);
    }
  };

  const handleRatingChange = (value: number) => {
    setUserRating(value);

    switch (value) {
      case 1:
        setComment("Bad");
        break;
      case 2:
        setComment("Not Good");
        break;
      case 3:
        setComment("Okay");
        break;
      case 4:
        setComment("Good");
        break;
      case 5:
        setComment("Excellent");
        break;
      default:
        setComment("");
        break;
    }
  };
  const calculateRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;

    if (diffInSeconds < secondsInMinute) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < secondsInHour) {
      const minutes = Math.floor(diffInSeconds / secondsInMinute);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffInSeconds < secondsInDay) {
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      const days = Math.floor(diffInSeconds / secondsInDay);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
  };
  return (
    <Container sx={{ marginTop: 4 }}>
      <ToastContainer />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Your Rating:
          </Typography>

          {initialRating !== null && (
            <StarRating
              totalStars={5}
              initialRating={userRating}
              onChange={handleRatingChange}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={2}>
          <TextField
            label="Comment"
            variant="outlined"
            value={comment}
            disabled
            fullWidth
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={10}>
          <TextField
            fullWidth
            multiline
            label="Write your review"
            variant="outlined"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddReview}
        sx={{ marginBottom: 2 }}
      >
        {userRating ? "Update Review" : "Add Review"}
      </Button>

      <Typography variant="h4" gutterBottom>
        All Reviews
      </Typography>

      {loadingReviews ? (
        <Typography>Loading reviews...</Typography>
      ) : (
        reviews
          .slice()
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((review) => (
            <Grid
              container
              key={review._id}
              spacing={2}
              sx={{ marginBottom: 2 }}
            >
              <Grid item container spacing={2}>
                <Grid item>
                  <Avatar alt={review.username} src={review.profileImage} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", display: "inline" }}
                  >
                    {review.username}
                  </Typography>

                  <StarRating
                    totalStars={5}
                    initialRating={review.rating}
                    onChange={() => {}}
                  />

                  <Typography>{review.comment}</Typography>

                  <Typography sx={{ color: "gray", fontStyle: "italic" }}>
                    {calculateRelativeTime(new Date(review.date))}
                  </Typography>

                  <Typography>{review.reviewText}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))
      )}
    </Container>
  );
};

export default ReviewsPage;
