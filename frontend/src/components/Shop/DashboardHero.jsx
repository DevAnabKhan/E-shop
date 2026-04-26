import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProduct } from "../../redux/actions/product";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const DashboardHero = () => {
  const dispatch = useDispatch();
  const { shop } = useSelector((state) => state.shop);
  const { shopOrders } = useSelector((state) => state.order);
  const { allProducts } = useSelector((state) => state.product);
  const [deliveredOrder, setDeliveredOrder] = useState(null);

  // useEffect(() => {
  //   dispatch(getAllOrdersOfShop(shop._id));
  //   dispatch(getAllProduct(shop._id));
  //   const orderData =
  //     shopOrders && shopOrders.filter((item) => item.status === "Delivered");
  //   setDeliveredOrder(orderData);
  // }, [dispatch, shop._id]);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(shop._id));
    dispatch(getAllProduct(shop._id));
  }, [dispatch, shop._id]);

  const availableBalance = shop.availableBalance.toFixed(2);

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
            <Link to={`dashboard/order/${params.id}`}>
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

  shopOrders &&
    shopOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status, // ← correct
      });
    });

  return (
    <div className="w-full p-8">
      <h3 className="font-poppins text-[22px] pb-2  ">Overview</h3>
      <div className="w-full block 800:flex items-center justify-between">
        <div className="w-full mb-4 800:w-[30%] min-h-[20vh] bg-white shadow px-2 py-5">
          <div className="flex items-center ">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="#0000005" />
            <h3
              className={`${styles.productTitle} text-[18px]! leading-5 font-[400]! text-[#0000085]`}
            >
              Account Balance{" "}
              <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ${availableBalance}
          </h5>
          <Link to={"/dashboard-withdraw-money"}>
            <h5 className="pt-4 pl-2 text-[#077f9c]">Withdraw Money </h5>
          </Link>
        </div>
        <div className="w-full mb-4 800:w-[30%] min-h-[20vh] bg-white shadow px-2 py-5">
          <div className="flex items-center ">
            <MdBorderClear size={30} className="mr-2" fill="#0000005" />
            <h3
              className={`${styles.productTitle} text-[18px]! leading-5 font-[400]! text-[#0000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {shopOrders && shopOrders.length}
          </h5>
          <Link to={"/dashboard-orders"}>
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders </h5>
          </Link>
        </div>
        <div className="w-full mb-4 800:w-[30%] min-h-[20vh] bg-white shadow px-2 py-5">
          <div className="flex items-center ">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="#0000005" />
            <h3
              className={`${styles.productTitle} text-[18px]! leading-5 font-[400]! text-[#0000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {allProducts && allProducts.length}
          </h5>
          <Link to={"/dashboard-products"}>
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
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
          pageSize={5}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default DashboardHero;
