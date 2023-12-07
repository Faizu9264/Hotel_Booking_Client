// src/routers/router.tsx
import React, { useState,useEffect } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from "../pages/Home";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import OTPModal from "../components/common/OTPModal";
import AdminLogin from "../components/auth/AdminLogin";
import AdminDashboard from "../components/admin/AdminDashboard"; 
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Addlocation from '../components/admin/components/location/AddLocation'
import HotelListingTable from "../components/admin/components/Hotel/HotelListingTable";
import { useDispatch } from "react-redux";
import { setAdminData, setAdminLoginStatus } from '../redux/actions/adminActions';

import { setLoginStatus } from '../redux/actions/authActions';

const UserRouter: React.FC = () => {
  const [otpModalOpen, setOTModalOpen] = useState(false);
  const dispatch = useDispatch();
  const isUserLoggedInFromLocalStorage = localStorage.getItem('userData') !== null;

  useEffect(() => {
    dispatch(setLoginStatus(isUserLoggedInFromLocalStorage));
  }, [dispatch, isUserLoggedInFromLocalStorage]);

  const isUserLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  
  const openOTPModal = () => {
    setOTModalOpen(true);
  };

  const closeOTPModal = () => {
    setOTModalOpen(false);
  };

  return (
    <Routes>  
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="verify-otp" element={<OTPModal isOpen={otpModalOpen} onRequestClose={closeOTPModal} />} />
      <Route path="view-hotels" element={<Home/>}/>
      <Route path="find-hotels" element={<Home/>}/>

    </Routes>
  );
};

const AdminRouter: React.FC = () => {
  // const isAdminLoggedIn = useSelector((state: RootState) => state.admin.isAdminLoggedIn);
  // console.log(isAdminLoggedIn);
  const dispatch = useDispatch();
  const isAdminLoggedInFromLocalStorage = localStorage.getItem('adminData') !== null;

  dispatch(setAdminLoginStatus(isAdminLoggedInFromLocalStorage));

  const isAdminLoggedIn = useSelector((state: RootState) => state.admin.isAdminLoggedIn);
  if (!isAdminLoggedIn) {
    return (
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />
      <Route path="dashboard/*" element={<AdminDashboard />} />
      <Route path="hotels" element={<HotelListingTable/>}/>
      <Route path="addHotel" element={<Addlocation/>} />
      {/* <Route path="editHotel" element={<Navigate to="/admin/dashboard" />} /> */}
      <Route path="editHotel/:hotelId" element={<Addlocation />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
};



const AppRouter: React.FC = () => {
  return (
    <Routes>
         <Route path="/" element={<Home />} />
      <Route path="/user/*" element={<UserRouter />} />
      <Route path="/admin/*" element={<AdminRouter />} />
    </Routes>
  );
};

export default AppRouter;
