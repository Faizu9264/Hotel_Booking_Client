// src/routers/router.tsx
import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import App from "../App";
import Home from "../pages/Home";
// import SignupModal from "../components/common/SignupModal"; 
import Signup from "../components/auth/Signup";
// import LoginModal from "../components/common/LoginModal"; 
import Login from "../components/auth/Login";
import VerifyOTP from "../components/auth/VerifyOTP";
import OTPModal from "../components/common/OTPModal";
import { Navigate } from "react-router-dom";

const AppRouter: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [otpModalOpen, setOTModalOpen] = useState(false);

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };
  
  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openOTPModal = () => {
    setOTModalOpen(true);
  };

  const closeOTPModal = () => {
    setOTModalOpen(false);
  };


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
              <Signup/>
          }
        />
        <Route
          path="/login"
          element={
              <Login onRequestClose={closeLoginModal} />
          }
        />
        <Route
          path="/verify-otp"
          element={
              <OTPModal isOpen={otpModalOpen} onRequestClose={closeOTPModal}>
                <VerifyOTP onRequestClose={closeOTPModal}/>
              </OTPModal>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRouter;
