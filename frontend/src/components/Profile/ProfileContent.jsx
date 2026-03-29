import React, { useState } from "react";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdTrackChanges } from "react-icons/md";

const ProfileContent = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState(user?.address || "");
  const [address2, setAddress2] = useState(user?.address || "");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full ">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar?.url}`}
                className="w-37.5 h-37.5 rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-7.5 h-7.5 bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form action="" onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800:flex block pb-3">
                <div className="w-full 800:w-[50%]">
                  <label className="block pb-2" htmlFor="">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]! bg-white border-none mb-4 800:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full 800:w-[50%]">
                  <label className="block pb-2" htmlFor="">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]! bg-white border-none mb-2 800:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full 800:flex block pb-3">
                <div className="w-full 800:w-[50%]">
                  <label className="block pb-2" htmlFor="">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className={`${styles.input} w-[95%]! bg-white border-none mb-2 800:mb-0`}
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="w-full 800:w-[50%]">
                  <label className="block pb-2" htmlFor="">
                    Zip Code
                  </label>
                  <input
                    type="number"
                    className={`${styles.input} w-[95%]! bg-white border-none mb-1 800:mb-0`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800:flex block pb-3">
                <div className="w-full 800:w-[50%]">
                  <label className="block pb-2" htmlFor="">
                    Address 1
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]! bg-white border-none mb-3 800:mb-0`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="w-full 800:w-[50%]">
                  <label className="block pb-2" htmlFor="">
                    Address 2
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]! bg-white border-none mb-4 800:mb-0`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-62.5 h-10 border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {active === 5 && (
        <div>
          <TrackOrders />
        </div>
      )}
      {active === 6 && (
        <div>
          <PaymentMethods />
        </div>
      )}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: 1,
      orderItems: [
        {
          productId: "123",
          quantity: 2,
          price: 50.0,
          name: "Product 1",
        },
      ],
      totalPrice: 100.0,
      orderStatus: "Delivered",
    },
  ];

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
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus, // ← correct
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: 1,
      orderItems: [
        {
          productId: "123",
          quantity: 2,
          price: 50.0,
          name: "Product 1",
        },
      ],
      totalPrice: 100.0,
      orderStatus: "Delivered",
    },
  ];
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
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrders = () => {
  const orders = [
    {
      _id: 1,
      orderItems: [
        {
          productId: "123",
          quantity: 2,
          price: 50.0,
          name: "Product 1",
        },
      ],
      totalPrice: 100.0,
      orderStatus: "Delivered",
    },
  ];
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
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethods = () => {
  return (
    <div className="px-5 w-full">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-[25px] font-semibold text-[#000000ba] pb-2">
          Payment Methods
        </h1>
        <div className={`${styles.button} rounded-md!`}>
          <span className="text-white"> Add new</span>
        </div>
      </div>
      <br />
      <div className="w-full h-17.5 flex items-center shadow justify-between bg-white rounded-sm px-3 pr-10">
        <div className="flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6qKSwdvrf94H4L7KjkL5kpUTTpZFuMkEPgA&s "
            alt=""
            className="w-[50px] h-[50px] object-cover rounded-full"
          />
          <h5 className="pl-5 font-semibold">Andrew Thomas</h5>
        </div>
        <div className="pl-5 flex items-center">
          <h6>**** **** **** 1234</h6>,<h5 className="pl-6">Exp: 12/24</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className="px-5 w-full">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-[25px] font-semibold text-[#000000ba] pb-2">
          My Address
        </h1>
        <div className={`${styles.button} rounded-md!`}>
          <span className="text-white"> Add new</span>
        </div>
      </div>
      <br />
      <div className="w-full h-17.5 flex items-center shadow justify-between bg-white rounded-sm px-3 pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-semibold">Default</h5>
        </div>
        <div className="pl-5 flex items-center">
          <h6>123 Main Street, City, Country</h6>
          <h6>093 876 5432</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
