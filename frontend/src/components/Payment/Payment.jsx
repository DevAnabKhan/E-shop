import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CiLineHeight } from "react-icons/ci";
import { server } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Payment = () => {
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [select, setSelect] = useState(1);
  const { user } = useSelector((state) => state.user);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(data || {});
  }, []);

  const createOrder = (data, success) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: orderData.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };
  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    const res = await axios.post(`${server}/order/create-order`, order, config);
    if (res.data.success) {
      setOpen(false);
      navigate("/order/success");
      toast.success("Order successfull");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    }
  };
  const paymentData = {
    amount: Math.round((orderData?.totalPrice || 0) * 100),
  };
  const order = {
    cart: orderData.cart,
    shippingAddress: orderData.shippingAddress,
    user: user && user,
    totalPrice: orderData.totalPrice,
  };
  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config,
      );
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };
          const res = await axios.post(
            `${server}/order/create-order`,
            order,
            config,
          );
          if (res.data.success) {
            setOpen(false);
            navigate("/order/success");
            toast.success("Order successfull");
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("latestOrder", JSON.stringify([]));
            window.location.reload();
          }
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      order.paymentInfo = {
        type: "Cash on Delivery",
      };
      const res = await axios.post(
        `${server}/order/create-order`,
        order,
        config,
      );
      if (res.data.success) {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successfull");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000:w-[70%] flex flex-col 800:flex-row gap-6">
        {/* LEFT SIDE */}
        <div className="w-full 800:w-[65%]">
          <PaymentInfo
            open={open}
            setOpen={setOpen}
            select={select}
            setSelect={setSelect}
            user={user}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full 800:w-[35%]">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Payment;

const PaymentInfo = ({
  open,
  setOpen,
  select,
  setSelect,
  user,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  return (
    <div className="w-full 800:w-[95%] bg-white rounded-md p-5 pb-8">
      {/* CARD PAYMENT */}
      <div className="border-b pb-5 mb-5">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setSelect(1)}
        >
          <div className="w-[22px] h-[22px] rounded-full border flex items-center justify-center">
            {select === 1 && (
              <div className="w-[12px] h-[12px] bg-black rounded-full" />
            )}
          </div>
          <h4 className="ml-2 text-[16px] font-semibold">
            Pay with Debit/Credit Card
          </h4>
        </div>

        {select === 1 && (
          <div className="mt-5 space-y-4">
            <div className="w-full">
              <label className="block pb-2">Name On Card</label>
              <input
                required
                placeholder={user && user.name}
                className={`${styles.input} w-full text-[#444]`}
                value={user && user.name}
              />
            </div>
            <div className="w-full">
              <label className="block pb-2">Exp Date</label>
              <CardExpiryElement
                className={`${styles.input}`}
                options={{
                  style: {
                    base: {
                      fontSize: "19px",
                      lineHeight: 1.5,
                      color: "#444",
                    },
                    empty: {
                      color: "#3a120a",
                      backgroundColor: "transparent",
                      "::placeholder": {
                        color: "#444",
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="w-full">
              <label className="block pb-2">Card Number</label>
              <CardNumberElement
                className={`${styles.input} h-[35px]! w-[95%]`}
                options={{
                  style: {
                    base: {
                      fontSize: "19px",
                      lineHeight: 1.5,
                      color: "#444",
                    },
                    empty: {
                      color: "#3a120a",
                      backgroundColor: "transparent",
                      "::placeholder": {
                        color: "#444",
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="w-full">
              <label className="block pb-2">CVV</label>
              <CardCvcElement
                className={`${styles.input} h-[35px]! `}
                options={{
                  style: {
                    base: {
                      fontSize: "19px",
                      lineHeight: 1.5,
                      color: "#444",
                    },
                    empty: {
                      color: "#3a120a",
                      backgroundColor: "transparent",
                      "::placeholder": {
                        color: "#444",
                      },
                    },
                  },
                }}
              />
            </div>

            <button
              className={`${styles.button} !bg-[#f63b60] text-white`}
              onClick={paymentHandler}
            >
              Pay Now
            </button>
          </div>
        )}
      </div>

      {/* PAYPAL */}
      {/* <div className="border-b pb-5 mb-5">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setSelect(2)}
        >
          <div className="w-[22px] h-[22px] rounded-full border flex items-center justify-center">
            {select === 2 && (
              <div className="w-[12px] h-[12px] bg-black rounded-full" />
            )}
          </div>
          <h4 className="ml-2 text-[16px] font-semibold">Pay with PayPal</h4>
        </div>

        {select === 2 && (
          <div className="mt-5">
            <button
              onClick={() => setOpen(true)}
              className={`${styles.button} !bg-[#f63b60] text-white`}
            >
              Pay Now
            </button>

            {open && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black/40 flex items-center justify-center">
                <div className="w-[90%] 800:w-[40%] bg-white p-5 rounded-md relative">
                  <RxCross1
                    className="absolute top-3 right-3 cursor-pointer"
                    onClick={() => setOpen(false)}
                  />

                  <div className="h-[200px] flex items-center justify-center border">
                    PayPal Button Area
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div> */}

      {/* CASH ON DELIVERY */}
      <div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setSelect(2)}
        >
          <div className="w-[22px] h-[22px] rounded-full border flex items-center justify-center">
            {select === 2 && (
              <div className="w-[12px] h-[12px] bg-black rounded-full" />
            )}
          </div>
          <h4 className="ml-2 text-[16px] font-semibold">Cash on Delivery</h4>
        </div>

        {select === 2 && (
          <div className="mt-5">
            <button
              className={`${styles.button} !bg-[#f63b60] text-white`}
              onClick={cashOnDeliveryHandler}
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
const CartData = ({ orderData }) => {
  return (
    <div className="w-full bg-white rounded-md p-5">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>${orderData.subTotalPrice}</span>
      </div>

      <br />

      <div className="flex justify-between">
        <span>Shipping:</span>
        <span>${orderData.shipping}</span>
      </div>

      <br />

      <div className="flex justify-between border-b pb-3">
        <span>Discount:</span>
        <span>
          -{orderData.discountPrice ? "$" + orderData.discountPrice : "-"}
        </span>
      </div>

      <h2 className="text-right mt-3 font-bold text-[18px]">
        ${orderData.subTotalPrice}
      </h2>
    </div>
  );
};
