import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  if (isLoading === true) {
    return <Loader />;
  } else {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
