import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";

import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const menuItems = [
    { id: 1, title: "Dashboard", icon: RxDashboard, route: "/dashboard" },
    {
      id: 2,
      title: " All Orders",
      icon: FiShoppingBag,
      route: "/dashboard-orders",
    },
    {
      id: 3,
      title: "All Products",
      icon: FiPackage,
      route: "/dashboard-products",
    },
    {
      id: 4,
      title: "Create Products",
      icon: AiOutlineFolderAdd,
      route: "/dashboard-create-product",
    },
    {
      id: 5,
      title: "All Events",
      icon: MdOutlineLocalOffer,
      route: "/dashboard-events",
    },
    {
      id: 6,
      title: "Create Event",
      icon: VscNewFile,
      route: "/dashboard-create-event",
    },
    {
      id: 7,
      title: "Withdraw Money",
      icon: CiMoneyBill,
      route: "/dashboard-withdraw-money",
    },
    {
      id: 8,
      title: "Shop Inbox",
      icon: BiMessageSquareDetail,
      route: "/dashboard-messages",
    },
    {
      id: 9,
      title: "Discount Codes",
      icon: AiOutlineGift,
      route: "/dashboard-coupons",
    },
    {
      id: 10,
      title: "Refunds",
      icon: HiOutlineReceiptRefund,
      route: "/dashboard-refunds",
    },
    {
      id: 11,
      title: "Settings",
      icon: CiSettings,
      route: "/settings",
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

export default DashboardSidebar;
