import React, { useState } from "react";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../components/Shop/Layout/DashboardSidebar";
import AllEvents from "../components/Events/AllEvents";

const ShopAllEventsPage = () => {
  const [active, setActive] = useState(5);
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-20 800:w-82.5">
          <DashboardSidebar active={active} setActive={setActive} />
        </div>
        <div className="w-full justify-center flex">
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEventsPage;
