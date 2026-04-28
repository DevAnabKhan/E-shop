import React, { useState } from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AllShops from "../components/Admin/AllShops";

const AdminDashboardShop = () => {
  const [active, setActive] = useState(3);
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex items-start justify-between">
        <div className="w-20 800:w-82.5">
          <AdminSidebar active={active} setActive={setActive} />
        </div>
        <AllShops />
      </div>
    </div>
  );
};

export default AdminDashboardShop;
