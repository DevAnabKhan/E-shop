import React, { act, useState } from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AllUsers from "../components/Admin/AllUsers";

const AdminDashboardUsersPage = () => {
  const [active, setActive] = useState(4);
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex items-start justify-between">
        <div className="w-20 800:w-82.5">
          <AdminSidebar active={active} setActive={setActive} />
        </div>
        <AllUsers />
      </div>
    </div>
  );
};

export default AdminDashboardUsersPage;
