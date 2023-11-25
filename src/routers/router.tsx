// src/routers/router.tsx
import React, { useState } from "react";
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




const UserRouter: React.FC = () => {
  const [otpModalOpen, setOTModalOpen] = useState(false);

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
    </Routes>
  );
};

const AdminRouter: React.FC = () => {
  const isAdminLoggedIn = useSelector((state: RootState) => state.admin.isAdminLoggedIn);
  console.log(isAdminLoggedIn);

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
