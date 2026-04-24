import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { backend_url } from "../../../server";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="w-full min-w-0 h-20 bg-white sticky shadow top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to={"/dashboard/coupons"} className="800:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={"/dashboard-events"} className="800:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={"/dashboard-products"} className="800:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={"/dashboard-orders"} className="800:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to={"/dashboard-messages"} className="800:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link>
            <img
              src={`${backend_url}${user?.avatar?.url}`}
              className="w-8.75 h-8.75 rounded-full"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
