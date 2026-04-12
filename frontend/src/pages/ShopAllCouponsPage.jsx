import React, { useState } from "react";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../components/Shop/Layout/DashboardSidebar";
import AllCouponCode from "../components/CouponCode/AllCouponCode";

const ShopAllCouponsPage = () => {
  const [active, setActive] = useState(9);
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-20 800:w-82.5">
          <DashboardSidebar active={active} setActive={setActive} />
        </div>
        <div className="w-full justify-center flex">
          <AllCouponCode />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCouponsPage;
