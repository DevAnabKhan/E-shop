import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";

const ShopProtectedRoute = ({ children }) => {
  const { isShopAuthenticated, shopLoading } = useSelector(
    (state) => state.shop,
  );

  if (shopLoading === true) {
    console.log(shopLoading);
    return <Loader />;
  } else {
    return isShopAuthenticated ? (
      children
    ) : (
      <Navigate to="/shop-login" replace />
    );
  }
};

export default ShopProtectedRoute;
