import React, { useState } from "react";
import ShopSettings from "../components/Shop/ShopSettings";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../components/Shop/Layout/DashboardSidebar";

const ShopSettingPage = () => {
  const [active, setActive] = useState(11);
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-start justify-between">
        <div className="w-20 800:w-82.5">
          <DashboardSidebar active={active} setActive={setActive} />
        </div>
        <ShopSettings />
      </div>
    </div>
  );
};

export default ShopSettingPage;
