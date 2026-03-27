import React from "react";
import {
  AiOutlineCreditCard,
  AiOutlineLogout,
  AiOutlineMessage,
} from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 1, title: "Profile", icon: RxPerson },
    { id: 2, title: "Orders", icon: HiOutlineShoppingBag },
    { id: 3, title: "Refunds", icon: HiOutlineReceiptRefund },
    { id: 4, title: "Inbox", icon: AiOutlineMessage, route: "/inbox" },
    { id: 5, title: "Track Orders", icon: MdOutlineTrackChanges },
    { id: 6, title: "Payment Methods", icon: AiOutlineCreditCard },
    { id: 7, title: "Address", icon: TbAddressBook },
    { id: 8, title: "Log Out", icon: AiOutlineLogout },
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
            }}
          >
            <Icon size={20} color={active === item.id ? "red" : ""} />
            <span className={`pl-3 ${active === item.id ? "text-[red]" : ""}`}>
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileSidebar;
