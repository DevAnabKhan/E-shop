import React, { useState } from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AllEvents from "../components/Admin/AllEvents";

const AdminDashboardEvents = () => {
  const [active, setActive] = useState(6);
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex items-start justify-between">
        <div className="w-20 800:w-82.5">
          <AdminSidebar active={active} setActive={setActive} />
        </div>
        <AllEvents />
      </div>
    </div>
  );
};

export default AdminDashboardEvents;
