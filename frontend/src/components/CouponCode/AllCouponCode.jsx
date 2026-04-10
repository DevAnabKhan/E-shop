import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { deleteProduct, getAllProduct } from "../../redux/actions/product";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllCouponCode = () => {
  const [open, setOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { allProducts } = useSelector((state) => state.product);
  const { shop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (shop?._id) {
        try {
          setIsLoading(true);

          const res = await axios.get(
            `${server}/coupon/get-all-coupon/${shop._id}`,
          );

          if (res.data.success) {
            setCoupons(res.data.couponCodes);
            // ✅ IMPORTANT FIX
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [shop?._id]);

  const handleDelete = async (id) => {
    try {
      console.log("deleting...", id);
      const res = await axios.delete(`${server}/coupon/delete-coupon/${id}`);
      console.log("res", res);

      if (res.data.success) {
        console.log("Coupon deleted successfully");
        const couponCode = await coupons.filter((coupon) => coupon._id !== id);
        setCoupons(couponCode);

        toast.success("Coupon deleted successfully");
        // navigate("/");
      }
    } catch (error) {
      console.log("Error caught:", error);

      const msg = error?.response?.data?.message || "Something went wrong";

      toast.error(msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting...");
      const res = await axios.post(`${server}/coupon/create-coupon`, {
        name,
        minAmount,
        maxAmount,
        value,
        shopId: shop._id,
        selectedProduct: selectedProducts,
      });
      console.log("res", res);

      if (res.data.success) {
        console.log("Coupon created successfully");
        toast.success("Coupon created successfully");
        setCoupons((prev) => [...prev, res.data.coupon]);
        setName("");
        setMaxAmount("");
        setMinAmount("");
        setSelectedProducts("");
        setValue("");
        setOpen(false);
        // navigate("/");
      }
    } catch (error) {
      console.log("Error caught:", error);

      const msg = error?.response?.data?.message || "Something went wrong";

      toast.error(msg);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "price",
      headerName: "Discount Price",

      minWidth: 100,
      flex: 0.6,
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

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + "%",
      });
    });

  return (
    <>
      (
      <div className="w-full  mx-8 pt-1 mt-10 bg-white">
        <div className="w-full flex justify-end">
          <div
            className={`${styles.button} w-max! h-11.25! px-3 rounded-sm! mr-3 mb-3`}
            onClick={() => setOpen(true)}
          >
            <span className="text-white"> Create Coupon Code</span>
          </div>
        </div>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableRowSelectionOnClick
          autoHeight
        />

        {open && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-200 flex items-center justify-center">
            <div className="w-[90%] 800:w-[40%] h-[60vh] bg-white rounded-md shadow p-4">
              <div className="w-full flex justify-end">
                <RxCross1
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                  size={30}
                />
              </div>
              <h5 className="text-[30px] font-poppins text-center">
                Create Coupon Code
              </h5>
              <form action="" onSubmit={handleSubmit} aria-required={true}>
                <br />
                <div>
                  <label htmlFor=" " className="pb-2 ">
                    Name <span className="text-red-500 ">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    required
                    placeholder="Enter your coupon code name"
                    className="mt-2 appearance-none placeholder-gray-400 focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm  block w-full px-3 h-[35px] border border-gray-300"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <br />
                <div>
                  <label htmlFor=" " className="pb-2 ">
                    Discount Percentage <span className="text-red-500 ">*</span>
                  </label>
                  <input
                    type="number"
                    name="value"
                    required
                    value={value}
                    placeholder="Enter your coupon code value"
                    className="mt-2 appearance-none placeholder-gray-400 focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm  block w-full px-3 h-[35px] border border-gray-300"
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                <br />
                <div>
                  <label htmlFor=" " className="pb-2 ">
                    Minimum Amount
                  </label>
                  <input
                    type="number"
                    name="minAmount"
                    value={minAmount}
                    placeholder="Enter your coupon code min amount"
                    className="mt-2 appearance-none placeholder-gray-400 focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm  block w-full px-3 h-[35px] border border-gray-300"
                    onChange={(e) => setMinAmount(e.target.value)}
                  />
                </div>
                <br />
                <div>
                  <label htmlFor=" " className="pb-2 ">
                    Maximum Amount
                  </label>
                  <input
                    type="number"
                    name="maxAmount"
                    value={maxAmount}
                    placeholder="Enter your coupon code max amount"
                    className="mt-2 appearance-none placeholder-gray-400 focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm  block w-full px-3 h-[35px] border border-gray-300"
                    onChange={(e) => setMaxAmount(e.target.value)}
                  />
                </div>
                <br />
                <div>
                  <label htmlFor=" " className="pb-2 ">
                    Selected Product
                  </label>
                  <select
                    name=""
                    id=""
                    value={selectedProducts}
                    onChange={(e) => setSelectedProducts(e.target.value)}
                    className="w-full mt-2 border h-8.75 rounded-[5px]  border-gray-300"
                  >
                    <option value="Choose a selected products">
                      {" "}
                      Choose a product
                    </option>
                    {allProducts &&
                      allProducts.map((i) => (
                        <option value={i.name} key={i.name}>
                          {i.name}
                        </option>
                      ))}
                  </select>
                </div>
                ,
                <br />
                <div>
                  <input
                    type="submit"
                    value="create"
                    className="mt-2 appearance-none placeholder-gray-400 focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm  block w-full px-3 h-[35px] border border-gray-300"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      )
    </>
  );
};

export default AllCouponCode;
