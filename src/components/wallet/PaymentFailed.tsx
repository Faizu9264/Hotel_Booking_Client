import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Paper, Container } from "@mui/material";

const PaymentFailed: React.FC = () => {
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
          src="/Gif/Animation.gif"
          alt="Failure"
          style={{ width: "100px", marginBottom: "20px" }}
        />
        <Typography variant="h4" color="error" gutterBottom>
          Payment Failed!
        </Typography>
        <Typography variant="body1" style={{ margin: "20px 0" }}>
          Unfortunately, your wallet payment was unsuccessful. Please try again.
        </Typography>
        <Link to="/wallet" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary" size="large">
            Back to Wallet
          </Button>
        </Link>
      </Paper>
    </Container>
  );
};

export default PaymentFailed;
