import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { loadShop } from "../../redux/actions/shop";
import axios from "axios";

const ShopSettings = () => {
  const { shop } = useSelector((state) => state.shop);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(shop && shop.name);
  const [description, setDescription] = useState(
    shop && shop.description ? shop.description : "",
  );
  const [address, setAddress] = useState(shop && shop.address);
  const [phoneNumber, setPhoneNumber] = useState(shop && shop.phoneNumber);
  const [zipCode, setZipCode] = useState(shop && shop.zipCode);
  const dispatch = useDispatch();
  const handleImage = async (e) => {
    const file = e.target.files[0];
    console.log("file:", file);
    setAvatar(file);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log("formData", formData);
    try {
      const res = await axios.put(
        `${server}/shop/update-shop-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      console.log("response", res);
      if (res.data.success === true) {
        dispatch(loadShop());
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

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${server}/shop/update-shop-info`,
        {
          name,
          description,
          address,
          phoneNumber,
          zipCode,
        },
        { withCredentials: true },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(loadShop());
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
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full 800:w-[80%] flex flex-col justify-center mt-5">
        <div className="w-full items-center justify-center flex">
          <div className="relative">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `${backend_url}${shop.avatar?.url}`
              }
              className="w-[200px] h-[200px] object-cover rounded-full cursor-pointer "
              alt=""
            />
            <div className="w-7.5 h-7.5 bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[15px]">
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
        <form
          action=""
          aria-required
          onSubmit={updateHandler}
          className="flex flex-col items-center"
        >
          <div className="w-full 800:w-[50%] mt-5 items-center flex-col flex">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                Shop Name
              </label>
            </div>
            <input
              type="name"
              className={`${styles.input} w-[95%]! mb-4 800:mb-0`}
              required
              placeholder={`${shop.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full 800:w-[50%] mt-5 items-center flex-col flex">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                Shop description
              </label>
            </div>
            <input
              type="name"
              className={`${styles.input} w-[95%]! mb-4 800:mb-0`}
              placeholder={`${shop.description ? shop.description : "Enter your shop description"}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-full 800:w-[50%] mt-5 items-center flex-col flex">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                Shop Address
              </label>
            </div>
            <input
              type="name"
              className={`${styles.input} w-[95%]! mb-4 800:mb-0`}
              required
              placeholder={`${shop.address}`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="w-full 800:w-[50%] mt-5 items-center flex-col flex">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                Shop Phone number
              </label>
            </div>
            <input
              type="number"
              className={`${styles.input} w-[95%]! mb-4 800:mb-0`}
              required
              placeholder={`${shop.phoneNumber}`}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="w-full 800:w-[50%] mt-5 items-center flex-col flex">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                SHop Zip Code
              </label>
            </div>
            <input
              type="number"
              className={`${styles.input} w-[95%]! mb-4 800:mb-0`}
              required
              placeholder={`${shop.zipCode}`}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className="w-full 800:w-[50%] mt-5 items-center flex-col flex">
            <input
              className={`800:w-[50%] w-[30%]! h-10 border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
