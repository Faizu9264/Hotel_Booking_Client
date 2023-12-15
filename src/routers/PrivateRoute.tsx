// PrivateRoute.tsx

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAdminLoggedIn = true; 
  const isUserLoggedIn = true; 

  return isAdminLoggedIn || isUserLoggedIn ? (
    <>{element}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
