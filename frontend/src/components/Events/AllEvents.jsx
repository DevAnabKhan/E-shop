import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getAllEvents } from "../../redux/actions/event";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";
import { Link } from "react-router-dom";

const AllEvents = () => {
  const { fetchLoading, allEvents } = useSelector((state) => state.event);
  const { shop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shop?._id) {
      dispatch(getAllEvents(shop._id));
    }
  }, [dispatch, shop?._id]);

  const handleDelete = async (id) => {
    await dispatch(deleteEvent(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "Event Id",
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
    {
      field: "sold",
      headerName: "Sold Out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "preview",
      headerName: "",
      type: "number",
      minWidth: 100,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const event_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/event/${event_name}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      headerName: "",
      type: "number",
      minWidth: 120,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  allEvents &&
    allEvents.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        stock: item.stock,
        sold: 10,
      });
    });

  return (
    <>
      {fetchLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllEvents;
