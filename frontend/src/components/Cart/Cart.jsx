import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { addtoCart, removefromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const removeFromCartHandler = (data) => {
    dispatch(removefromCart(data._id));
  };
  const quantityChangeHandler = (data) => {
    dispatch(addtoCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0,
  );
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 bg-white flex-col flex justify-between min-h-full 800:w-[25%] w-[80%] shadow-sm">
        {cart && cart.length === 0 ? (
          <div
            className="w-full h-screen flex items-center justify-center
            
            "
          >
            <div className="flex w-full justify-end ptt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Your cart is empty </h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  onClick={() => setOpenCart(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="text-[20px] font-medium pl-2 items-center">
                  {cart.length} item
                </h5>
              </div>
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((items, index) => (
                    <CartSingle
                      key={index}
                      data={items}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>
            <div className="px-5 mb-3">
              <Link to={"/checkout"}>
                <div className="h-11.25 flex items-center justify-center w-full bg-[#e44343] rounded-[5px]">
                  <h1 className="text-white text-[18px] font-150">
                    Checkout Now USD${totalPrice}
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };
  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className="bg-[#e44343] border border-[#e4434373] rounded-full w-6.25 h-6.25 flex items-center justify-center cursor-pointer"
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-2.5">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-6.25 h-6.25 flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${backend_url}${data.images[0]?.url}`}
          alt=""
          className="w-20 h-20 ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-1.25 ">
          <h1>{data.name}</h1>
          <h4 className="font-100 text-3.45 text-[#00000082]">
            ${data.discountPrice} * {value}
          </h4>
          <h4 className="font-150 text-4.25 pt-0.75 text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
