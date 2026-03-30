import React from "react";
import ShopCreate from "../components/Shop/ShopCreate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const { isShopAuthenticated, shop } = useSelector((state) => state.shop);
  useEffect(() => {
    if (isShopAuthenticated && shop?._id) {
      console.log("Shop authenticated, navigating...");
      navigate(`/shop/${shop._id}`);
    }
  }, [isShopAuthenticated, shop, navigate]);
  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
