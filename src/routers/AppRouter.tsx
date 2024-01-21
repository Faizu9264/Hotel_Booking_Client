// AppRouter.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/auth/Login";
import UserRouter from "./UserRouter";
import AdminRouter from "./AdminRouter";
import NotFound from "../components/common/NotFoundPage";
const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<UserRouter />} />
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
