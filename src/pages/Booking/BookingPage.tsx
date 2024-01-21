import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Grid,
  Box,
  Radio,
  IconButton,
} from "@mui/material";
import "./datePicker.css";
import { differenceInDays } from "date-fns";
import { DateRangePicker, DateRange } from "react-date-range";
import { isBefore } from "date-fns";
import EventIcon from "@mui/icons-material/Event";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { RootState } from "../../redux/store";
import { setWalletBalance } from "../../redux/slices/walletSlice";

import { useSelector } from "react-redux";
import { selectBookingDetails } from "../../redux/slices/bookingSlice";
import { toast, ToastContainer } from "react-toastify";
import Divider from "@mui/material/Divider";
import api from "../../services/userApi";
import { getAllCoupons } from "../../services/userApi";
import Autocomplete from "@mui/material/Autocomplete";

import { CouponData } from "../../types/coupon";
import { BookingDetails } from "../../types/booking";

const BookingPage = () => {
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const bookingDetails = useSelector(selectBookingDetails);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [guestNameError, setGuestNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("stripe");
  const existingBookings = useSelector(
    (state: RootState) => state.allBooking.allBookings
  );

  const userData = useSelector((state: RootState) => state.auth.user);
  const coupons: CouponData[] = useSelector(
    (state: RootState) => state.coupon.coupons
  );
  const walletBalance = useSelector(
    (state: RootState) => state.wallet.walletBalance
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (coupons.length <= 0) {
          await dispatch<any>(getAllCoupons());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [dispatch, coupons]);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponData | null>(null);

  const handleCouponSelect = (coupon: CouponData | null) => {
    setSelectedCoupon(coupon);

    if (coupon) {
      const currentDate = new Date();
      if (currentDate > new Date(coupon.expiryDate)) {
        toast.error(`Coupon "${coupon.code}" has expired.`);
      } else {
        if (totalRent >= coupon.minCart) {
          const couponDiscountAmount =
            coupon.discountType === "percentage"
              ? (totalRent * coupon.discountPercentage) / 100
              : Math.min(coupon.discountAmount, totalRent);

          setCouponDiscount(couponDiscountAmount);

          setBookingDetails((prevState) => ({
            ...prevState,
            total: totalRent - (prevState.discountPrice + couponDiscountAmount),
            discountPrice: prevState.discountPrice + couponDiscountAmount,
            couponId: coupon._id,
            couponDetails: {
              code: coupon.code,
              description: coupon.description,
              discountAmount: coupon.discountAmount,
            },
          }));

          toast.success(`Coupon "${coupon.code}" applied successfully!`);
        } else {
          toast.error(
            `Coupon "${coupon.code}" can't be applied. Booking total is less than the coupon's maximum cart amount.`
          );
        }
      }
    } else {
      setCouponDiscount(0);

      setBookingDetails((prevState) => ({
        ...prevState,
        total: totalRent - prevState.discountPrice,
        discountPrice: prevState.discountPrice - couponDiscount,
        couponId: null,
        couponDetails: null,
      }));

      toast.info("Coupon removed.");
    }
  };

  const [BookingDetails, setBookingDetails] = useState<BookingDetails>({
    guestName: "",
    email: "",
    phone: "",
    specialRequests: "",
    checkInDate: new Date(bookingDetails.checkInDate),
    checkOutDate: new Date(bookingDetails.checkOutDate),
    adultCount: bookingDetails.adultCount,
    childrenCount: bookingDetails.childrenCount,
    nightCount: 1,
    roomCount: bookingDetails.roomCount,
    maxPeople: bookingDetails.roomDetails.maxPeople,
    total: bookingDetails.roomDetails.rentAmount,
    discountPrice: bookingDetails.roomDetails.discountPrice,
    roomDetails: {
      id: bookingDetails.roomDetails.id,
      roomType: bookingDetails.roomDetails.roomType,
      hotelName: bookingDetails.roomDetails.hotelName,
      hotelId: bookingDetails.roomDetails.hotelId,
      amenities: bookingDetails.roomDetails.amenities,
      rentAmount: bookingDetails.roomDetails.rentAmount,
      discountPrice: bookingDetails.roomDetails.discountPrice,
      roomsCount: bookingDetails.roomDetails.roomsCount,
      maxPeople: bookingDetails.roomDetails.maxPeople,
      description: bookingDetails.roomDetails.description,
      images: bookingDetails.roomDetails.images,
    },
  });

  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalRent, setTotalRent] = useState(0);

  const navigate = useNavigate();

  const handleIncreaseAdultCount = () => {
    setBookingDetails((prevState) => {
      const totalCount = prevState.adultCount + prevState.childrenCount;
      const maxPeopleAllowed =
        prevState.roomDetails.roomsCount * prevState.roomDetails.maxPeople;

      if (totalCount < maxPeopleAllowed) {
        return {
          ...prevState,
          adultCount: prevState.adultCount + 1,
        };
      }
      return prevState;
    });
  };

  const handleIncreaseChildrenCount = () => {
    setBookingDetails((prevState) => {
      const totalCount = prevState.adultCount + prevState.childrenCount;
      const maxPeopleAllowed =
        prevState.roomDetails.roomsCount * prevState.roomDetails.maxPeople;

      if (totalCount < maxPeopleAllowed) {
        return {
          ...prevState,
          childrenCount: prevState.childrenCount + 1,
        };
      }
      return prevState;
    });
  };

  const handleDecreaseAdultCount = () => {
    setBookingDetails((prevState) => ({
      ...prevState,
      adultCount: Math.max(0, prevState.adultCount - 1),
    }));
  };

  const handleDecreaseChildrenCount = () => {
    setBookingDetails((prevState) => ({
      ...prevState,
      childrenCount: Math.max(0, prevState.childrenCount - 1),
    }));
  };

  useEffect(() => {
    const totalCount = BookingDetails.adultCount + BookingDetails.childrenCount;
    const nights = differenceInDays(
      BookingDetails.checkOutDate,
      BookingDetails.checkInDate
    );
    const calculatedNightCount = nights > 0 ? nights + 1 : 1;

    setBookingDetails((prevState) => ({
      ...prevState,
      nightCount: calculatedNightCount,
    }));

    if (BookingDetails.roomCount > BookingDetails.roomDetails.roomsCount) {
      return;
    }

    const updatedRoomCount = Math.ceil(
      totalCount / BookingDetails.roomDetails.maxPeople
    );
    const updatedMaxPeopleValue =
      updatedRoomCount * BookingDetails.roomDetails.maxPeople;

    if (totalCount > updatedMaxPeopleValue) {
      setBookingDetails((prevState) => ({
        ...prevState,
        roomCount: updatedRoomCount + 1,
        maxPeople: updatedMaxPeopleValue,
      }));
    } else {
      setBookingDetails((prevState) => ({
        ...prevState,
        roomCount: updatedRoomCount,
        maxPeople: updatedMaxPeopleValue,
      }));
    }

    const totalRent =
      updatedRoomCount *
      BookingDetails.roomDetails.rentAmount *
      calculatedNightCount;
    const totalDiscount =
      updatedRoomCount *
      BookingDetails.roomDetails.discountPrice *
      calculatedNightCount;

    setTotalRent(totalRent);
    setTotalDiscount(totalDiscount);

    setBookingDetails((prevState) => ({
      ...prevState,
      total: totalRent - totalDiscount,
      discountPrice: totalDiscount,
    }));
  }, [
    BookingDetails.adultCount,
    BookingDetails.childrenCount,
    BookingDetails.checkInDate,
    BookingDetails.checkOutDate,
    BookingDetails.roomDetails,
  ]);

  const handleIncreaseRoomCount = () => {
    setBookingDetails((prevState) => {
      const maxRoomsAvailable = prevState.roomDetails.roomsCount;
      const newRoomCount = Math.min(prevState.roomCount + 1, maxRoomsAvailable);
      const updatedMaxPeopleValue =
        newRoomCount * prevState.roomDetails.maxPeople;

      const nights = differenceInDays(
        prevState.checkOutDate,
        prevState.checkInDate
      );
      const calculatedNightCount = nights > 0 ? nights + 1 : 1;

      const totalRent =
        newRoomCount * prevState.roomDetails.rentAmount * calculatedNightCount;
      const totalDiscount =
        newRoomCount *
        prevState.roomDetails.discountPrice *
        calculatedNightCount;

      return {
        ...prevState,
        roomCount: newRoomCount,
        maxPeople: updatedMaxPeopleValue,
        total: totalRent - totalDiscount,
        discountPrice: totalDiscount,
      };
    });
  };

  const handleDecreaseRoomCount = () => {
    setBookingDetails((prevState) => {
      const newRoomCount = Math.max(prevState.roomCount - 1, 1);
      const updatedMaxPeopleValue =
        newRoomCount * prevState.roomDetails.maxPeople;

      const totalRent =
        newRoomCount *
        prevState.roomDetails.rentAmount *
        BookingDetails.nightCount;
      const totalDiscount =
        newRoomCount *
        prevState.roomDetails.discountPrice *
        BookingDetails.nightCount;

      return {
        ...prevState,
        roomCount: newRoomCount,
        maxPeople: updatedMaxPeopleValue,
        total: totalRent - totalDiscount,
        discountPrice: totalDiscount,
      };
    });
  };

  const [dateRange, setDateRange] = useState([
    {
      startDate: BookingDetails.checkInDate,
      endDate: BookingDetails.checkOutDate,
      key: "selection",
    },
  ]);

  const handleDateSelect = (ranges: any) => {
    const startDate = isBefore(ranges.selection.startDate, new Date())
      ? new Date()
      : ranges.selection.startDate;

    setDateRange([
      { startDate, endDate: ranges.selection.endDate, key: "selection" },
    ]);
    setBookingDetails({
      ...BookingDetails,
      checkInDate: startDate,
      checkOutDate: ranges.selection.endDate,
    });
  };
  const toggleDatePicker = () => {
    setDatePickerVisible(!datePickerVisible);
  };

  const handleBookNow = async () => {
    try {
      const userId = userData._id || userData.userId;

      if (!guestName || !email || !phone) {
        if (!guestName) setGuestNameError("Guest Name is required");
        if (!email) setEmailError("Email is required");
        if (!phone) setPhoneError("Phone is required");
        toast.error("Please fill in all required fields.");
        return;
      }

      const totalAmountToPay = BookingDetails.total;

      if (selectedPaymentMethod === "wallet") {
        if (walletBalance >= totalAmountToPay) {
          dispatch(
            setWalletBalance({
              walletBalance: walletBalance - totalAmountToPay,
            })
          );
        } else {
          toast.error("Insufficient wallet balance.");
          return;
        }
      }

      if (selectedPaymentMethod === "stripe") {
        const stripePaymentData = {
          ...BookingDetails,
          paymentMethod: "stripe",
          guestName: guestName,
          email: email,
          phone: phone,
        };

        await api.handleBooking(userId, stripePaymentData);
      } else if (selectedPaymentMethod === "wallet") {
        const walletPaymentData = {
          ...BookingDetails,
          paymentMethod: "wallet",
          guestName: guestName,
          email: email,
          phone: phone,
        };
        const response = await api.handleBooking(
          userId,
          walletPaymentData,
          false
        );
        if (response) {
          navigate("/payment/success");
          toast.success("Booking successful!");
        } else {
          navigate("/payment/failed");
        }
      } else if (selectedPaymentMethod === "combined") {
        if (walletBalance == 0) {
          toast.error("Insufficient wallet balance.");
          return;
        }
        const walletAmount = Math.min(walletBalance, totalAmountToPay);

        dispatch(
          setWalletBalance({ walletBalance: walletBalance - walletAmount })
        );

        const combinedPaymentData = {
          ...BookingDetails,
          paymentMethod: "combined",
          walletAmount: walletAmount,
          guestName: guestName,
          email: email,
          phone: phone,
        };

        await api.handleBooking(userId, combinedPaymentData);
        // toast.success('Booking successful!');
      }

      localStorage.setItem("bookingDetails", JSON.stringify(BookingDetails));
      localStorage.setItem("userId", userId);
    } catch (error: any) {
      console.error("Error handling booking:", error.message);
      // Handle error logic (display error message, etc.)
      toast.error("Error handling booking. Please try again.");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "110vh",
        backgroundColor: "#f0f0f0",
        marginTop: "15px",
        marginBottom: "15px",
      }}
    >
      <ToastContainer />
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          width: "90%",
          maxWidth: "1000px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Booking Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2} mt={2} mb={4}>
              <TextField
                label="Guest Name"
                variant="outlined"
                fullWidth
                value={guestName}
                onChange={(e) => {
                  setGuestName(e.target.value);
                  setGuestNameError("");
                }}
                error={!!guestNameError}
                helperText={guestNameError}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                label="Phone"
                type="tel"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError("");
                }}
                error={!!phoneError}
                helperText={phoneError}
              />

              <TextField
                label="Special Requests"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </Stack>
            <Stack direction="row" spacing={2} mt={2}>
              <Autocomplete
                id="coupon-select"
                options={coupons}
                getOptionLabel={(option) =>
                  `${option.code} - ${option.description} - ${option.discountAmount}`
                }
                value={selectedCoupon}
                onChange={(_, newValue) => handleCouponSelect(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Applay Coupon"
                    variant="outlined"
                    fullWidth
                    style={{ minWidth: "470px" }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: <>{params.InputProps.endAdornment}</>,
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div>
                      <strong>{option.code}</strong>
                    </div>
                    <div>{option.description}</div>
                    <div>Discount: {option.discountAmount}</div>
                    {new Date(option.expiryDate) < new Date() && (
                      <div style={{ color: "red" }}>Expired</div>
                    )}
                  </li>
                )}
              />
            </Stack>

            <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
              <TextField
                id="checkInTextField"
                label="Check-In Date"
                variant="outlined"
                value={BookingDetails.checkInDate.toLocaleDateString()}
              />
              <TextField
                id="checkOutTextField"
                label="Check-Out Date"
                variant="outlined"
                value={BookingDetails.checkOutDate.toLocaleDateString()}
              />

              <IconButton
                onClick={toggleDatePicker}
                color="primary"
                aria-label="open date picker"
              >
                <EventIcon />
              </IconButton>
            </Stack>
            <Stack>
              {datePickerVisible && (
                <DateRangePicker
                  ranges={dateRange}
                  onChange={handleDateSelect}
                  minDate={new Date()}
                />
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <img
                  src={BookingDetails.roomDetails.images[0]}
                  alt="Room"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "200px",
                    marginTop: "15px",
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "left" }}>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: 2, color: "#2196F3" }}
                >
                  Room Type: {BookingDetails.roomDetails.roomType}
                </Typography>
                <Stack direction="column" spacing={1} sx={{ marginBottom: 2 }}>
                  <Typography variant="body1">
                    <strong>Max People:</strong> {BookingDetails.maxPeople}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Rent Per Night:</strong> &#x20b9;
                    {BookingDetails.roomDetails.rentAmount} /Only
                  </Typography>
                  <Typography variant="body1">
                    <strong>Discount Per Night:</strong> &#x20b9;
                    {BookingDetails.roomDetails.discountPrice}
                  </Typography>
                </Stack>

                <Divider sx={{ marginY: 2, borderColor: "#9E9E9E" }} />

                <Stack direction="column" spacing={1}>
                  <Typography variant="body1">
                    <strong>Nights:</strong> {BookingDetails.nightCount}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Room Left:</strong>{" "}
                    {BookingDetails.roomDetails.roomsCount}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Room Count:</strong> {BookingDetails.roomCount}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Total Discount:</strong> &#x20b9;
                    {BookingDetails.discountPrice}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Wallet Balance:</strong> {walletBalance}
                  </Typography>

                  <Typography variant="body1">
                    <strong>Total Rent:</strong> &#x20b9;{BookingDetails.total}
                  </Typography>

                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="Room Count"
                      type="number"
                      variant="outlined"
                      sx={{ marginTop: "10px" }}
                      value={BookingDetails.roomCount}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: "rgb(8, 51, 68)" }}
                      onClick={handleIncreaseRoomCount}
                    >
                      +
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: "rgb(8, 51, 68)" }}
                      onClick={handleDecreaseRoomCount}
                    >
                      -
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Stack spacing={2} mt={2}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Adults"
                  type="number"
                  variant="outlined"
                  value={BookingDetails.adultCount}
                />
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "rgb(8, 51, 68)" }}
                  onClick={handleIncreaseAdultCount}
                >
                  +
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "rgb(8, 51, 68)" }}
                  onClick={handleDecreaseAdultCount}
                >
                  -
                </Button>
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Children"
                  type="number"
                  variant="outlined"
                  value={BookingDetails.childrenCount}
                />
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "rgb(8, 51, 68)" }}
                  onClick={handleIncreaseChildrenCount}
                >
                  +
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "rgb(8, 51, 68)" }}
                  onClick={handleDecreaseChildrenCount}
                >
                  -
                </Button>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Radio
                value="stripe"
                checked={selectedPaymentMethod === "stripe"}
                onChange={() => setSelectedPaymentMethod("stripe")}
              />
              <Typography>Stripe</Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Radio
                value="wallet"
                checked={selectedPaymentMethod === "wallet"}
                onChange={() => setSelectedPaymentMethod("wallet")}
              />
              <Typography>Wallet</Typography>
            </Stack>
            {walletBalance < BookingDetails.total ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <Radio
                  value="combined"
                  checked={selectedPaymentMethod === "combined"}
                  onChange={() => setSelectedPaymentMethod("combined")}
                />
                <Typography>Combined</Typography>
              </Stack>
            ) : null}
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleBookNow}
          sx={{
            marginTop: "20px",
            backgroundColor: "rgb(8, 51, 68)",
            width: "200px",
            height: "40px",
            "@media (max-width: 600px)": {
              width: "50%",
            },
            "&:hover": {
              backgroundColor: "rgb(8, 51, 68)",
            },
          }}
        >
          Book Now
        </Button>
      </Paper>
    </Container>
  );
};

export default BookingPage;
