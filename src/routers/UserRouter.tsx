// UserRouter.tsx
import React, { useState,useEffect } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from "../pages/Home";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import OTPModal from "../components/common/OTPModal";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from "react-redux";
import UserProfileModal from '../components/user/UserProfileModal';
import { setLoginStatus } from '../redux/actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserRouter: React.FC = () => {
    const [otpModalOpen, setOTModalOpen] = useState(false);
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const dispatch = useDispatch();
    const isUserLoggedInFromLocalStorage = localStorage.getItem('userData') !== null;
  
    useEffect(() => {
      dispatch(setLoginStatus(isUserLoggedInFromLocalStorage));
    }, [dispatch, isUserLoggedInFromLocalStorage]);
  
    const isUserLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const userData = useSelector((state: RootState) => state.auth.user);
    const openOTPModal = () => {
      setOTModalOpen(true);
    };
  
    const closeOTPModal = () => {
      setOTModalOpen(false);
    };
    const handleOpenProfileModal = () => {
      setProfileModalOpen(true);
    };
  
    const handleCloseProfileModal = () => {
      setProfileModalOpen(false);
    };
    if (userData?.blocked) {
      toast.error("Your account is blocked. Please contact support.");
      return <Navigate to="/login" />;
  }
    return (
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="verify-otp" element={<OTPModal isOpen={otpModalOpen} onRequestClose={closeOTPModal} />} />
        <Route path="profile" element={<UserProfileModal user={userData} isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} />} />
        <Route path="view-hotels" element={<Home />} />
        <Route path="find-hotels" element={<Home />} />
        <Route path="view-rooms" element={<Home />} />
        <Route path="room-details" element={<Home />} />
      </Routes>
    );
  };
  
  export default UserRouter;
