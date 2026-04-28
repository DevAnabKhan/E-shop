import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdTrackChanges } from "react-icons/md";
import {
  deleteUserAddress,
  loadUser,
  updateUserAddress,
  updateUserInfo,
} from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city";
import { clearError, clearMessage } from "../../redux/slices/userSlice";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const ProfileContent = ({ active, setActive }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState((user && user?.phoneNumber) || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessage());
    }
  }, [error, successMessage]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("All Data", email, password, phone, name);
    dispatch(updateUserInfo(email, password, phone, name));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    console.log("file:", file);
    setAvatar(file);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log("formData", formData);
    try {
      const res = await axios.put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("response", res);
      if (res.data.success === true) {
        dispatch(loadUser());
        toast.success("Updated successfully");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message || // from backend
        error?.message || // axios default message
        "Something went wrong"; // fallback

      toast.error(msg);
    }
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
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image" className="cursor-pointer">
                  {" "}
                  <AiOutlineCamera />
                </label>
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
                    Password
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]! bg-white border-none mb-2 800:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
          <ChangePassword />
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
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [user]);

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
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status, // ← correct
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
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [user]);

  console.log(orders);

  const eligibleOrder =
    orders && orders.filter((item) => item.status === "Processing refund");
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

  eligibleOrder &&
    eligibleOrder.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status, // ← correct
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
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [user]);

  console.log(orders);
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
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status, // ← correct
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

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${server}/user/update-user-password`, {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setNewPassword("");
        setConfirmPassword("");
        setOldPassword("");
      }
    } catch (error) {
      console.log("Error caught:", error);

      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast.error(msg);
    }
  };
  return (
    <div className="px-5 w-full">
      <h1 className="text-[25px] text-center font-semibold text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          action=""
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="w-full 800:w-[50%] mt-5">
            <label htmlFor="" className="block pb-2">
              Password
            </label>
            <input
              type="password"
              className={`${styles.input} w-[95%]! mb-4 800:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-full 800:w-[50%] mt-5">
            <label htmlFor="" className="block pb-2">
              New Password
            </label>
            <input
              type="password"
              className={`${styles.input} w-[95%]! mb-4 800:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-full 800:w-[50%] mt-5">
            <label htmlFor="" className="block pb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className={`${styles.input} w-[95%]! mb-4 800:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <input
            className={`800:w-[50%] w-[30%]! h-10 border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
            required
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields");
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        ), // ✅ add zipCode
      );
      setOpen(false);
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setCity("");
      setCountry("");
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item._id));
  };
  return (
    <div className="px-5 w-full">
      {open && (
        <div className="fixed w-full h-screen top-0 left-0 flex items-center justify-center bg-[#0000004b]">
          <div className="w-[35%] h-[80vh] bg-white overflow-y-scroll shadow relative">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer "
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label htmlFor="" className="block pb-2">
                      Country
                    </label>
                    <select
                      name=""
                      id=""
                      value={country}
                      className="w-[95%] border h-10 rounded-[5px]"
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="" className="block pb-2 border">
                        Choose your Country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2 "
                            value={item.isoCode}
                            key={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="" className="block pb-2">
                      City
                    </label>
                    <select
                      name=""
                      id=""
                      value={city}
                      className="w-[95%] border h-10 rounded-[5px]"
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="" className="block pb-2 border">
                        Choose your City
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2 "
                            value={item.isoCode}
                            key={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="" className="block pb-2">
                      Address 1
                    </label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="" className="block pb-2">
                      Address 2
                    </label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="" className="block pb-2">
                      Zip Code
                    </label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="" className="block pb-2">
                      Address Type
                    </label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      className="w-[95%] border h-10 rounded-[5px]"
                      onChange={(e) => setAddressType(e.target.value)}
                    >
                      <option value="" className="block pb-2 border">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2 "
                            value={item.name}
                            key={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex items-center justify-between">
        <h1 className="text-[25px] font-semibold text-[#000000ba] pb-2">
          My Address
        </h1>
        <div
          className={`${styles.button} rounded-md!`}
          onClick={() => setOpen(true)}
        >
          <span className="text-white"> Add new</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div className="w-full h-17.5 flex items-center shadow justify-between bg-white rounded-sm px-3 pr-10 mb-3">
            <div className="flex items-center">
              <h5 className="pl-5 font-semibold">{item.addressType}</h5>
            </div>
            <div className="pl-5 flex items-center">
              <h6>
                {item.address1} , {item.address2}
              </h6>
            </div>
            <div className="pl-5 flex items-center">
              <h6>{user && user.phoneNumber}</h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}
      {user && user.addresses.length === 0 && (
        <h5 className="text-center p-8 text-[18px]">
          {" "}
          You don't have any saved address
        </h5>
      )}
    </div>
  );
};

export default ProfileContent;
