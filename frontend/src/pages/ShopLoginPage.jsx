import React from "react";
import ShopLogin from "../components/Shop/ShopLogin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { isShopAuthenticated, shop } = useSelector((state) => state.shop);
  console.log(
    "ShopLoginPage rendered, isShopAuthenticated:",
    isShopAuthenticated,
  );
  useEffect(() => {
    if (isShopAuthenticated && shop?._id) {
      console.log("Shop authenticated, navigating...");
      navigate("/dashboard");
    }
  }, [isShopAuthenticated, shop]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
