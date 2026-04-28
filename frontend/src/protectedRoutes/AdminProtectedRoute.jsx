import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  if (loading === true) {
    return <Loader />;
  } else if (user.role !== "Admin") {
    return <Navigate to={"/"} replace />;
  } else {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  }
};

export default AdminProtectedRoute;
