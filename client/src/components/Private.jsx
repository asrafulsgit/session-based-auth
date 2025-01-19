import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Private = ({ authorized }) => {
  return authorized ? <Outlet /> : <Navigate to="/login" />;
};

export default Private;
