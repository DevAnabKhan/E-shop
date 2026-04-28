import React, { useState } from "react";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../components/Shop/Layout/DashboardSidebar";
import DashboardHero from "../components/Shop/DashboardHero";

const ShopDashboardPage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-start justify-between">
        <div className="w-20 800:w-82.5">
          <DashboardSidebar active={active} setActive={setActive} />
        </div>
        <DashboardHero />
      </div>
    </div>
  );
};

export default ShopDashboardPage;
