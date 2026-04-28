import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import UserOrderDetails from "../components/Orders/UserOrderDetails";

const OrderDetailPage = () => {
  return (
    <div>
      <Header />
      <UserOrderDetails />
      <Footer />
    </div>
  );
};

export default OrderDetailPage;
