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

const AllShops = () => {
  const { adminShops } = useSelector((state) => state.shop);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllShopsForAdmin());
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${server}/shop/delete-shop/${id}`, {
        withCredentials: true,
      });

      toast.success(res.data.message);
      setOpen(false);
      dispatch(getAllShopsForAdmin());
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const columns = [
    { field: "id", headerName: "Shop ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "address",
      headerName: "shop address",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "joinedAt",
      headerName: "joinedAt",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "  ",
      flex: 1,
      minWidth: 150,
      headerName: "Preview shop",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/shop/preview/${params.id}`}
              className="w-full h-full flex justify-center items-center"
            >
              <AiOutlineEye size={20} />
            </Link>
          </>
        );
      },
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete shop",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                setUserId(params.id);
                setOpen(true);
              }}
            >
              <AiOutlineDelete size={20} color="red" />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  adminShops &&
    adminShops.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        address: item.address,
        joinedAt: item.createdAt.slice(0, 10),
      });
    });
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-poppins pb-2">All Shops</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={4}
            disableSelectionOnClick
            autoHeight
          />
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800:w-[40%] min-h-[20vh] bg-white rounded shadow p-5 ">
              <div className="w-full justify-end flex cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-poppins ">
                Are you sure you wanna delete this user?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] h-[42px]! mr-2`}
                  onClick={() => setOpen(false)}
                >
                  {" "}
                  Cancel
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] h-[42px]! ml-2`}
                  onClick={() => handleDelete(userId)}
                >
                  {" "}
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllShops;
