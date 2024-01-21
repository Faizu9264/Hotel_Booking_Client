import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Paper, Container } from "@mui/material";
import { useLocation } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSuccess = queryParams.get("success") === "true";
  useEffect(() => {
    const userId = queryParams.get("userId");
    if (isSuccess && userId) {
      const bookingDetails = JSON.parse(
        localStorage.getItem("bookingDetails") || ""
      );
    }
  }, [isSuccess]);

  return (
    <Container>
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/Gif/Animation2.gif"
          alt="Success"
          style={{ width: "200px", marginBottom: "20px" }}
        />
        <Typography variant="h4" color="primary" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" style={{ margin: "20px 0" }}>
          Thank you for your payment. Your booking is confirmed.
        </Typography>
        <Link to="/view-hotels" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" size="large">
            Explore More Hotels
          </Button>
        </Link>
      </Paper>
    </Container>
  );
};

export default PaymentSuccess;
