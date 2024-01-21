// AdminRouter.tsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import HotelListingTable from "../components/admin/components/Hotel/HotelListingTable";
import AdminLogin from "../components/auth/AdminLogin";
import AdminDashboard from "../components/admin/AdminDashboard";
import { useDispatch } from "react-redux";
import { setAdminLoginStatus } from "../redux/actions/adminActions";
import Addlocation from "../components/admin/components/location/AddLocation";
import UserListingTable from "../components/admin/components/Users/userListing";
import BookingListingTable from "../components/admin/components/Bookings/BookingListingTable";
import MainDashboard from "../components/admin/components/MainDashboard";
import SupportAdmin from "../components/admin/components/Support/SupportAdmin";
import CouponListingTable from "../components/admin/components/Coupens/CouponListingTable";
import AddCoupon from "../components/admin/components/Coupens/AddCoupen";

const AdminRouter: React.FC = () => {
  const isAdminLoggedIn = useSelector(
    (state: RootState) => state.admin.isAdminLoggedIn
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const isAdminLoggedInFromLocalStorage =
      localStorage.getItem("adminData") !== null;
    dispatch(setAdminLoginStatus(isAdminLoggedInFromLocalStorage));
  }, [dispatch]);

  if (!isAdminLoggedIn) {
    return (
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard/mainDashboard" />}
        />
        <Route path="dashboard/*" element={<AdminDashboard />} />
        <Route path="mainDashboard" element={<MainDashboard />} />
        <Route path="hotels" element={<HotelListingTable />} />
        <Route path="users" element={<UserListingTable />} />
        <Route path="addHotel" element={<Addlocation />} />
        <Route path="bookings" element={<BookingListingTable />} />
        <Route path="Support" element={<SupportAdmin />} />
        <Route path="coupons" element={<CouponListingTable />} />
        <Route path="addCoupon" element={<AddCoupon />} />

        <Route path="editHotel/:hotelId" element={<Addlocation />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    );
  }
};

export default AdminRouter;
