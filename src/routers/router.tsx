// src/routers/router.tsx
import React from "react";
import { Route, Routes } from 'react-router-dom';
import App from "../App";
import Home from "../pages/Home";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import VerifyOTP from "../components/auth/VerifyOTP";
const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
    </Routes>
  );
};

export default AppRouter;
