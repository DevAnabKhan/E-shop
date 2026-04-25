import React from "react";
import {
  AiOutlineCreditCard,
  AiOutlineLogout,
  AiOutlineMessage,
} from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Logged out successfully!");
        window.location.reload(true);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Logout failed!");
    }
  };

  const menuItems = [
    { id: 1, title: "Profile", icon: RxPerson },
    { id: 2, title: "Orders", icon: HiOutlineShoppingBag },
    { id: 3, title: "Refunds", icon: HiOutlineReceiptRefund },
    { id: 4, title: "Inbox", icon: AiOutlineMessage, route: "/inbox" },
    { id: 5, title: "Track Orders", icon: MdOutlineTrackChanges },
    { id: 6, title: "Change Password", icon: RiLockPasswordLine },
    { id: 7, title: "Address", icon: TbAddressBook },
    ...(user?.role === "Admin"
      ? [
          {
            id: 8,
            title: "Admin Dashboard",
            icon: MdOutlineAdminPanelSettings,
            route: "/admin/dashboard",
          },
        ]
      : []),
    { id: 9, title: "Log Out", icon: AiOutlineLogout, handleLogout },
  ];
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => {
              setActive(item.id);
              if (item.route) navigate(item.route);
              if (item.handleLogout) return item.handleLogout();
            }}
          >
            <Icon size={20} color={active === item.id ? "red" : ""} />
            <span
              className={`800:block hidden pl-3 ${active === item.id ? "text-[red]" : ""}`}
            >
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileSidebar;
