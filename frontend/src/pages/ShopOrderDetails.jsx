import React, { useState } from "react";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import Footer from "../components/Layout/Footer";
import OrderDetails from "../components/Orders/OrderDetails";

const ShopOrderDetails = () => {
  return (
    <div>
      <DashboardHeader />
      <OrderDetails />
      <Footer />
    </div>
  );
};

export default ShopOrderDetails;
