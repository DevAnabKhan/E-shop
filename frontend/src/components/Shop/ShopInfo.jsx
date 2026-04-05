import React from "react";
import { useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ShopInfo = ({ isOwner }) => {
  const { shop } = useSelector((state) => state.shop);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${server}/shop/logout-shop`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Logged out Shop successfully!");
        dispatch(shopLogout());
        navigate("/shop-login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Logout failed!");
    }
  };
  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            src={`${backend_url}${shop?.avatar?.url}`}
            className="w-37.5 h-37.5 object-cover rounded-full"
            alt=""
          />
        </div>
        <h3 className="text-center py-2 text-[20px]"> {shop.name}</h3>
        <p className="text-center p-2.5 text-[16px] flex text-[#000000a6]">
          {shop.description}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Address</h5>
        <h4 className="text-[#000000a6]">{shop.address}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Total Products</h5>
        <h4 className="text-[#000000a6]">10</h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Shop Ratings</h5>
        <h4 className="text-[#000000b0]">4/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Joined On</h5>
        <h4 className="text-[#000000b0]">{shop.createdAt?.slice(0, 10)}</h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <Link to="/settings">
            <div className={`${styles.button} w-full! h-10.5! rounded-[5px]!`}>
              <span className="text-white">Edit Shop</span>
            </div>
          </Link>
          <div
            className={`${styles.button} w-full! h-10.5! rounded-[5px]!`}
            onClick={logoutHandler}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
