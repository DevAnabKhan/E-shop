import { Button, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { getAllUsersForAdmin } from "../../redux/actions/user";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllShopsForAdmin } from "../../redux/actions/shop";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";

const AllOrders = () => {
  const { adminOrders } = useSelector((state) => state.order);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
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

    // {
    //   field: " ",
    //   flex: 1,
    //   minWidth: 150,
    //   headerName: "",
    //   type: "number",
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={`dashboard/order/${params.id}`}>
    //           <Button>
    //             <AiOutlineArrowRight size={20} />
    //           </Button>
    //         </Link>
    //       </>
    //     );
    //   },
    // },
  ];

  const row = [];

  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-poppins pb-2">All Orders</h3>
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
    </div>
  );
};

export default AllOrders;
