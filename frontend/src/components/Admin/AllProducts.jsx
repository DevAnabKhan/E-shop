import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProduct } from "../../redux/actions/product";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { server } from "../../server";

const AllProducts = () => {
  const [data, setData] = useState([]);
  const { shop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${server}/product/get-all-admin-products`)
        .then((res) => {
          setData(res.data.products);
        });
    };
    fetchData();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Product Name",
      type: "text",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    // {
    //   field: "sold",
    //   headerName: "Sold Out",
    //   type: "number",
    //   minWidth: 130,
    //   flex: 0.6,
    // },
    {
      field: "preview",
      headerName: "",
      type: "number",
      minWidth: 100,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        stock: item.stock,
        // sold: item?.sold_out,
      });
    });

  return (
    <div className="w-full  mx-8 pt-1 mt-10 bg-white">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default AllProducts;
