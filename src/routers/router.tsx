// src/routers/router.tsx
import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import App from "../App";
import Home from "../pages/Home";
import SignupModal from "../components/common/SignupModal"; 
import Signup from "../components/auth/Signup";
import LoginModal from "../components/common/LoginModal"; 
import Login from "../components/auth/Login";

const AppRouter: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };
  const openLoginModal = () => {
    console.log('Opening login modal');
    setLoginModalOpen(true);
  };
  
  const closeLoginModal = () => {
    console.log('Closing login modal');
    setLoginModalOpen(false);
  };
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            <SignupModal isOpen={isSignupModalOpen} onRequestClose={closeSignupModal}>
              <Signup onRequestClose={closeSignupModal} />
            </SignupModal>
          }
        />
    <Route
  path="/login"
  element={
    <LoginModal isOpen={loginModalOpen} onRequestClose={closeLoginModal}>
      <Login onRequestClose={closeLoginModal} />
    </LoginModal>
  }
/>

      </Routes>
    </div>
  );
};

export default AppRouter;
