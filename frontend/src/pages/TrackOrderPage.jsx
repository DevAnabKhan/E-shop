import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import TrackOrder from "../components/Orders/TrackOrder";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";

const TrackOrderPage = () => {
  return (
    <div>
      <DashboardHeader />
      <TrackOrder />
      <Footer />
    </div>
  );
};

export default TrackOrderPage;
