import React, { useState } from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import WithdrawMoney from "../components/Shop/WithdrawMoney";
import AllWithdraw from "../components/Admin/AllWithdraw";

const AdminDashboardWithdraw = () => {
  const [active, setActive] = useState(7);
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex items-start justify-between">
        <div className="w-20 800:w-82.5">
          <AdminSidebar active={active} setActive={setActive} />
        </div>
        <AllWithdraw />
      </div>
    </div>
  );
};

export default AdminDashboardWithdraw;
