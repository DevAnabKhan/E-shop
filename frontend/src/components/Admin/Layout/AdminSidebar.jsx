import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { GrWorkshop } from "react-icons/gr";
import { BsHandbag } from "react-icons/bs";

import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund, HiOutlineUserGroup } from "react-icons/hi";

const AdminSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const menuItems = [
    { id: 1, title: "Dashboard", icon: RxDashboard, route: "/admin/dashboard" },
    {
      id: 2,
      title: " All Orders",
      icon: FiShoppingBag,
      route: "/admin-orders",
    },
    {
      id: 3,
      title: " All Shops",
      icon: GrWorkshop,
      route: "/admin-shops",
    },
    {
      id: 4,
      title: " All Users",
      icon: HiOutlineUserGroup,
      route: "/admin-users",
    },
    {
      id: 5,
      title: " All Products",
      icon: BsHandbag,
      route: "/admin-products",
    },
    {
      id: 6,
      title: " All Events",
      icon: MdOutlineLocalOffer,
      route: "/admin-events",
    },

    {
      id: 7,
      title: "Withdraw Requests",
      icon: CiMoneyBill,
      route: "/admin-withdraw-request",
    },
    {
      id: 8,
      title: "Settings",
      icon: CiSettings,
      route: "/profile",
    },
  ];
  return (
    <div className="w-full h-[89vh] bg-white overflow-y-scroll shadow-sm sticky top-0 left-0 z-10 py-6">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="w-full flex items-center p-4"
            onClick={() => {
              setActive(item.id);
              if (item.route) navigate(item.route);
              //if (item.handleLogout) return item.handleLogout();
            }}
          >
            <Icon
              size={30}
              color={`${active === item.id ? "crimson" : "#555"}`}
            />
            <span
              className={`hidden 800:block pl-2 text-[18px] font-normal ${active === item.id ? "text-[crimson] " : "text-[#555]"}`}
            >
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default AdminSidebar;
