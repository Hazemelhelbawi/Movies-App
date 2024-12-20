import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ userData, children }) {
  // Check if userData is null and there is no token in local storage
  if (userData === null && localStorage.getItem('token') === null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
