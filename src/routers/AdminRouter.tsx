// AdminRouter.tsx
import React,{useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AddLocation from '../components/admin/components/location/AddLocation'
import HotelListingTable from "../components/admin/components/Hotel/HotelListingTable";
import AdminLogin from "../components/auth/AdminLogin";
import AdminDashboard from "../components/admin/AdminDashboard"; 
import { useDispatch } from "react-redux";
import { setAdminData, setAdminLoginStatus } from '../redux/actions/adminActions';
import Addlocation from '../components/admin/components/location/AddLocation'
import UserListingTable from '../components/admin/components/Users/userListing';

const AdminRouter: React.FC = () => {
  const isAdminLoggedIn = useSelector((state: RootState) => state.admin.isAdminLoggedIn);
  console.log('isAdminLoggedIn', isAdminLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const isAdminLoggedInFromLocalStorage = localStorage.getItem('adminData') !== null;
    dispatch(setAdminLoginStatus(isAdminLoggedInFromLocalStorage));
  }, [dispatch]); 

  if (!isAdminLoggedIn) {
    return (
            <Routes>
              <Route path="login" element={<AdminLogin />} />
              <Route path="*" element={<Navigate to="/admin/login" />} />
            </Routes>
    )
  }

  return (
<Routes>
     <Route path="/" element={<Navigate to="/admin/dashboard" />} />
     <Route path="dashboard/*" element={<AdminDashboard />} />
      <Route path="hotels" element={<HotelListingTable/>}/>
      <Route path="users" element={<UserListingTable />} />
     <Route path="addHotel" element={<Addlocation/>} />
      {/* <Route path="editHotel" element={<Navigate to="/admin/dashboard" />} /> */}
     <Route path="editHotel/:hotelId" element={<Addlocation />} />
     <Route path="*" element={<Navigate to="/admin/dashboard" />} />
   </Routes>
  );
};

export default AdminRouter;
