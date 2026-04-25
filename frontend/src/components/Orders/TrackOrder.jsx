import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (user._id !== null) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user._id]);
  const data = orders && orders.find((item) => item._id === id);
  return (
    <div>
      <div className="w-full h-[80vh] flex items-center justify-center">
        {data?.status === "Processing" ? (
          <h1 className="text-center text-[20px]">Your order is processing</h1>
        ) : data?.status === "Transferred to delivery partner" ? (
          <h1 className="text-center text-[20px]">
            Your order is ready for delivery
          </h1>
        ) : data?.status === "Shipping" ? (
          <h1 className="text-center text-[20px]">Your order is on the way</h1>
        ) : data?.status === "Received" ? (
          <h1 className="text-center text-[20px]">Your order is near you</h1>
        ) : data?.status === "On the way" ? (
          <h1 className="text-center text-[20px]">Your order is on the way</h1>
        ) : data?.status === "Delivered" ? (
          <h1 className="text-center text-[20px]">Your order is delivered</h1>
        ) : data?.status === "Processing refund" ? (
          <h1 className="text-center text-[20px]">
            Your order refund is processing
          </h1>
        ) : data?.status === "Refund Success" ? (
          <h1 className="text-center text-[20px]">Your order refunded</h1>
        ) : (
          <h1 className="text-center text-[20px]">
            Order status not available
          </h1>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
