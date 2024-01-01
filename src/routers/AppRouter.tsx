// AppRouter.tsx
import React,{useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute'; 
import Home from "../pages/Home";
import Login from "../components/auth/Login";
import UserRouter from './UserRouter';
import AdminRouter from './AdminRouter';

const AppRouter: React.FC = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/user/*"
        element={<UserRouter />
        }
      />
      <Route
        path="/admin/*"
        element={
        <AdminRouter />
        }
      />
    </Routes>
  );
};

export default AppRouter;
