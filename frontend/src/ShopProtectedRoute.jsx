import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopProtectedRoute = ({ children }) => {
  const { isShopAuthenticated } = useSelector((state) => state.shop);

  return isShopAuthenticated ? children : <Navigate to="/" replace />;
};

export default ShopProtectedRoute;
