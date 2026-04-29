import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersOfShop,
  getAllOrdersOfUser,
} from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const UserOrderDetails = () => {
  const { orders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (user._id !== null) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user._id]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async (e) => {
    await axios
      .put(`${server}/product/create-new-review`, {
        user,
        rating,
        comment,
        productId: selectedItem._id,
        orderId: id,
      })
      .then((res) => {
        toast.success(res.data.message);
        setComment("");
        dispatch(getAllOrdersOfUser(user._id));
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        const msg =
          error?.response?.data?.message || // from backend
          error?.message || // axios default message
          "Something went wrong"; // fallback

        toast.error(msg);
      });
  };

  const refundHandler = async (e) => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then((res) => {
        toast.success("Order Refund successfully");
        dispatch(getAllOrdersOfUser(user._id));
      })
      .catch((error) => {
        const msg =
          error?.response?.data?.message || // from backend
          error?.message || // axios default message
          "Something went wrong"; // fallback

        toast.error(msg);
      });
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className=" pl-2 text-[25px]"> Order Details</h1>
        </div>
      </div>
      <div className="w-full items-center justify-between pt-6 flex">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data._id.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data.createdAt.slice(0, 10)}</span>
        </h5>
      </div>

      <br />
      <br />
      {data &&
        data.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5">
            <img
              src={`${backend_url}${item.images[0]?.url}`}
              alt=""
              className="w-[80px] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US${item.discountPrice} * {item.BsFillBagFillqty}
              </h5>
            </div>
            {!item.isReviewed && data.status === "Delivered" ? (
              <div
                className={`${styles.button} text-[#fff]`}
                onClick={() => setOpen(true) || setSelectedItem(item)}
              >
                Write a review
              </div>
            ) : null}
          </div>
        ))}

      {open && (
        <div className="w-full fixed top-0 left-0 h-screen z-50 bg-[#0005] flex items-center justify-center">
          <div className="w-[50%] h-min bg-white shadow rounded-md p-3">
            <div className="w-full flex p-3 justify-end">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins text-center">
              Give a Review
            </h2>
            <br />
            <div className="w-full flex">
              <img
                src={`${backend_url}${selectedItem.images[0]?.url}`}
                alt=""
                className="w-[80px] h-[80px]"
              />
              <div className="text-[20px] pl-3">{selectedItem.name}</div>
              <h4 className="pl-3 text-[20px]">
                US${selectedItem.discountPrice} * {selectedItem.qty}
              </h4>
            </div>
            <br />
            <br />
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246, 186 , 0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246, 186 , 0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ),
              )}
            </div>
            <br />
            <div className="w-full ml-3 ">
              <label className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                placeholder="Write your review"
                id=""
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-2 border w-[95%] outline-none p-2"
              ></textarea>
              ,
              <div
                className={`${styles.button} text-white text-[20px] ml-3`}
                onClick={rating > 1 ? reviewHandler : null}
              >
                Submit
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          {" "}
          Total Price: <strong>US${data.totalPrice}</strong>
        </h5>
      </div>

      <br />
      <br />
      <div className="w-full 800:flex items-center">
        <div className="w-full 800:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px] font-[600]">
            {data.shippingAddress.address1 +
              " " +
              data.shippingAddress.address2}
          </h4>
          <h4 className="text-[20px]">{data.shippingAddress.country}</h4>
          <h4 className="text-[20px]">{data.shippingAddress.city}</h4>
          <h4 className="text-[20px]">{data.user.phoneNumber}</h4>
        </div>
        <div className="w-full 800:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4 className="pt-3 text-[20px]">
            Status:{" "}
            {data.paymentInfo.status
              ? data.paymentInfo.status
              : data.paymentInfo.type}
          </h4>
          <br />
          {data.status == "Delivered" && (
            <div
              className={`${styles.button} text-white`}
              onClick={refundHandler}
            >
              Give a Refund
            </div>
          )}
        </div>
      </div>
      <Link to={"/"}>
        <div className={`${styles.button} text-white`}> Send Message</div>
      </Link>

      <br />
      <br />
    </div>
  );
};

export default UserOrderDetails;
