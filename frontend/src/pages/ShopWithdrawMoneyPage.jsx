import React, { useState } from "react";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../components/Shop/Layout/DashboardSidebar";
import ShopSettings from "../components/Shop/ShopSettings";
import WithdrawMoney from "../components/Shop/WithdrawMoney";

const ShopWithdrawMoneyPage = () => {
  const [active, setActive] = useState(7);
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-start justify-between">
        <div className="w-20 800:w-82.5">
          <DashboardSidebar active={active} setActive={setActive} />
        </div>
        <WithdrawMoney />
      </div>
    </div>
  );
};

export default ShopWithdrawMoneyPage;
