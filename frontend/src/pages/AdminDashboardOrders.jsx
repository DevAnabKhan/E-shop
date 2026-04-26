import React, { useState } from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AllOrders from "../components/Admin/AllOrders";

const AdminDashboardOrders = () => {
  const [active, setActive] = useState(2);
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex items-start justify-between">
        <div className="w-20 800:w-82.5">
          <AdminSidebar active={active} setActive={setActive} />
        </div>
        <AllOrders />
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
