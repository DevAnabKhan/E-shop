import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAllShopsForAdmin } from "../../redux/actions/shop";

const AdminDashboardMain = () => {
  const { adminOrders, loading } = useSelector((state) => state.order);
  const { adminShops } = useSelector((state) => state.shop);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    setOrders(adminOrders);
    dispatch(getAllShopsForAdmin());
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10), // ← correct
      });
    });
  return loading ? (
    <Loader />
  ) : (
    <div className="w-full p-4">
      <h3 className="font-poppins text-[22px] pb-2  ">Overview</h3>
      <div className="w-full block 800:flex items-center justify-between">
        <div className="w-full mb-4 800:w-[30%] min-h-[20vh] bg-white shadow px-2 py-5">
          <div className="flex items-center ">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="#0000005" />
            <h3
              className={`${styles.productTitle} text-[18px]! leading-5 font-[400]! text-[#0000085]`}
            >
              Total Earning{" "}
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">${12200}</h5>
        </div>
        <div className="w-full mb-4 800:w-[30%] min-h-[20vh] bg-white shadow px-2 py-5">
          <div className="flex items-center ">
            <MdBorderClear size={30} className="mr-2" fill="#0000005" />
            <h3
              className={`${styles.productTitle} text-[18px]! leading-5 font-[400]! text-[#0000085]`}
            >
              All Shops
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {adminShops && adminShops.length}
          </h5>
          <Link to={"/admin-shops"}>
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Shops </h5>
          </Link>
        </div>
        <div className="w-full mb-4 800:w-[30%] min-h-[20vh] bg-white shadow px-2 py-5">
          <div className="flex items-center ">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="#0000005" />
            <h3
              className={`${styles.productTitle} text-[18px]! leading-5 font-[400]! text-[#0000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {adminOrders && adminOrders.length}
          </h5>
          <Link to={"/admin-orders"}>
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-poppins pb-2">Latest Orders</h3>
      {/* ✅ THIS WAS MISSING — the actual DataGrid */}
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={4}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default AdminDashboardMain;
