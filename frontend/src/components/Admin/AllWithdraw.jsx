import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { BsPencil } from "react-icons/bs";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const AllWithdraw = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState([]);
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${server}/withdraw/get-all-withdraw-request`)
        .then((res) => {
          setData(res.data.withdraws);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);
  const columns = [
    {
      field: "id",
      headerName: "Withdraw Id",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "shopId",
      headerName: "Shop Id",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "amount",
      headerName: "amount",

      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "status",

      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "createdAt",
      headerName: "created at",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: " ",
      headerName: "Update status ",
      type: "number",
      minWidth: 80,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <BsPencil
            size={20}
            onClick={() => {
              setOpen(true);
              setWithdrawData(params.row);
            }}
            className={`${
              params.row.status?.trim().toLowerCase() !== "processing"
                ? "hidden"
                : ""
            } cursor-pointer items-center justify-center h-full`}
          />
        );
      },
    },

    // {
    //   field: "preview",
    //   headerName: "",
    //   type: "number",
    //   minWidth: 100,
    //   flex: 0.8,
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={`/product/${params.id}?isEvent=true`}>
    //           <Button>
    //             <AiOutlineEye size={20} />
    //           </Button>
    //         </Link>
    //       </>
    //     );
    //   },
    // },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        shopId: item.shop._id,
        name: item.shop.name,
        amount: "US$ " + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  const handleSubmit = async () => {
    await axios
      .put(`${server}/withdraw/update-withdraw-request/${withdrawData.id}`, {
        shopId: withdrawData.shopId,
      })
      .then((res) => {
        toast.success("Withdraw updated successfully");
        setData(res.data.withdraw);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full flex items-center pt-5 justify-center">
      <div className="w-[95%] bg-white">
        <DataGrid rows={row} columns={columns} pageSize={10} autoHeight />
      </div>
      {open && (
        <div className="w-full flex top-0 left-0 fixed items-center justify-center bg-[#0000004e] h-screen z-[999]">
          <div
            className={`800:w-[50%] bg-white shadow  min-h-[40vh] rounded w-[95%] p-3`}
          >
            <div className="w-full justify-end flex">
              <RxCross1
                size={25}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h1 className="text-[22px] font-poppins text-center font-[400]">
              Update withdraw status
            </h1>
            <br />
            <select
              name=""
              id=""
              onChange={(e) => setWithdrawStatus(e.target.value)}
            >
              <option
                value={withdrawData}
                className="w-[200px] h-[35px] border rounded"
              >
                {withdrawData.status}
              </option>
              <option
                value={withdrawData}
                className="w-[200px] h-[35px] border rounded"
              >
                Succeed
              </option>
            </select>
            <button
              type="submit"
              className={`${styles.button} block text-white h-[42px]! mt-4 text-[18px]`}
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllWithdraw;
