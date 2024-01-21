import React, { useEffect, useState } from "react";

import { Box, Grid, Button } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RoomListScreen from "../room/RoomListinig";
import MapScreen from "../map/ClusterMap";
import HotelListScreen from "../hotel/HotelListScreen";
import RoomDetailsScreen from "../room/ RoomDetailsScreen";
import api from "../../services/userApi";
import { setHotels } from "../../redux/slices/hotelSlice";
import { RootState } from "../../redux/store";
import UserProfileModal from "../../components/user/UserProfileModal";
import BookingPage from "../Booking/BookingPage";
import PaymentSuccess from "../../components/payment/PaymentSuccess";
import PaymentFailure from "../../components/payment/PaymentFailure";
import MyBookings from "../../components/user/MyBookings";
import { motion } from "framer-motion";
import WalletPaymentSuccess from "../../components/wallet/PaymentSuccess";
import WalletPaymentFailed from "../../components/wallet/PaymentFailed";
import UserWalletPage from "../../components/wallet/UserWalletPage";
import ReviewsPage from "../../components/user/ReviewsPage";
import ReviewsTicker from "../../components/common/ReviewsTicker";
import { Review } from "../../types/Review";

interface HomeScreenProps {
  handleOpenProfileModal: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ handleOpenProfileModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const userData = useSelector((state: RootState) => state.auth.user);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [title, setTitle] = useState<string>("");

  const fetchReviews = async () => {
    try {
      const response = await api.getReviews();
      setReviews(response);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    let isMounted = true;
    let intervalId: NodeJS.Timeout | null = null;

    const animatedTitle = (text: string) => {
      setTitle("");
      let index = 0;

      intervalId = setInterval(() => {
        if (isMounted) {
          setTitle((prevTitle) => prevTitle + text[index]);
          index++;

          if (index === text.length - 1) {
            clearInterval(intervalId!);
            setTimeout(() => {
              animatedTitle(" Your Hotel Booking Destination");
            }, 2000);
          }
        } else {
          clearInterval(intervalId!);
        }
      }, 200);
    };

    animatedTitle(" Your Hotel Booking Destination ");

    return () => {
      isMounted = false;
      clearInterval(intervalId!);
    };
  }, []);

  const handleCloseProfileModal = () => {
    setProfileModalOpen(false);
  };

  const fetchHotels = async () => {
    try {
      const response = await api.getAllHotels();
      dispatch(setHotels(response as any));
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };

  useEffect(() => {
    if (hotels.length <= 0) {
      fetchHotels();
    }
  }, [hotels]);

  const handleFindHotels = async () => {
    try {
      if (hotels.length <= 0) {
        const response = await api.getAllHotels();
        dispatch(setHotels(response as any));
      }
      navigate("/find-hotels");
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };

  const handleViewHotels = async () => {
    if (hotels.length <= 0) {
      const response = await api.getAllHotels();
      dispatch(setHotels(response as any));
    }
    navigate("/view-hotels");
  };
  const handleViewRooms = (hotelId: string) => {
    navigate(`/view-rooms?hotelId=${hotelId}`);
  };
  const handleViewRoomDetails = (hotelId: string) => {
    navigate(`/room-details?roomId=${hotelId}`);
  };
  return (
    <>
      {location.pathname === "/find-hotels" ? (
        <MapScreen />
      ) : location.pathname === "/view-hotels" ? (
        <>
          <HotelListScreen onHotelClick={handleViewRooms} />
        </>
      ) : location.pathname.startsWith("/view-rooms") ? (
        <RoomListScreen onRoomClick={handleViewRoomDetails} />
      ) : location.pathname.startsWith("/room-details") ? (
        <RoomDetailsScreen />
      ) : location.pathname.startsWith("/checkout") ? (
        <BookingPage />
      ) : location.pathname.startsWith("/payment/success") ? (
        <PaymentSuccess />
      ) : location.pathname.startsWith("/payment/failed") ? (
        <PaymentFailure />
      ) : location.pathname.startsWith("/bookings") ? (
        <MyBookings />
      ) : location.pathname.startsWith("/Wallet-payment/success") ? (
        <WalletPaymentSuccess />
      ) : location.pathname.startsWith("/Wallet-payment/failed") ? (
        <WalletPaymentFailed />
      ) : location.pathname.startsWith("/wallet") ? (
        <UserWalletPage />
      ) : location.pathname.startsWith("/reviews") ? (
        <ReviewsPage />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Box sx={{ position: "relative", overflow: "hidden" }}>
              <img
                src="/logo/Banner2.jpg"
                style={{ width: "100%", zIndex: "-1" }}
                alt="BackgroundImage"
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  color: "white",
                  width: "80%",
                  background: "rgba(0, 0, 0, 0.5)",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <motion.h1
                  style={{
                    fontSize: "2.5em",
                    marginBottom: "16px",
                    color: "#fff",
                  }}
                  whileHover={{ scale: 1.1, color: "#FFD700" }}
                >
                  {title}
                </motion.h1>
                <motion.p
                  style={{
                    fontSize: "1.7em",
                    marginBottom: "24px",
                    color: "#fff",
                  }}
                  whileHover={{ scale: 1.1, color: "#FFD700" }}
                >
                  Discover the perfect stay for your next adventure. Book now
                  and enjoy an unforgettable experience.
                </motion.p>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleFindHotels}
                    sx={{
                      color: "white",
                      borderColor: "#FFD700",
                      "&:hover": {
                        backgroundColor: "#FFD700",
                        color: "black",
                      },
                    }}
                  >
                    Find Hotels
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Grid container spacing={1} justifyContent="center ">
              {hotels.slice(0, 6).map((hotel) => (
                <Grid item key={hotel._id} xs={12} md={4} sx={{}}>
                  <Box
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      marginTop: "25px",
                    }}
                  >
                    <motion.img
                      src={hotel.images[0]}
                      alt={hotel.details.hotelName}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
                      }}
                      whileHover={{ scale: 1.1 }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        color: "white",
                        width: "80%",
                        background: "rgba(0, 0, 0, 0.5)",
                        padding: "20px",
                        borderRadius: "8px",
                      }}
                    >
                      <motion.h1
                        style={{
                          fontSize: "1.5em",
                          marginBottom: "8px",
                          color: "#FFD700",
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {hotel.details.hotelName}
                      </motion.h1>
                      <motion.p
                        style={{ fontSize: "1em", marginBottom: "16px" }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {hotel.details.location}
                      </motion.p>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleViewRooms(hotel._id)}
                          sx={{
                            color: "white",
                            borderColor: "#FFD700",
                            "&:hover": {
                              backgroundColor: "#FFD700",
                              color: "black",
                            },
                          }}
                        >
                          View Details
                        </Button>
                      </motion.div>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </motion.div>
          <ReviewsTicker reviews={reviews} />
        </>
      )}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
        user={userData}
      />
    </>
  );
};

export default HomeScreen;
