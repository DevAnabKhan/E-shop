import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

const Cart = ({ setOpenCart }) => {
  const cartData = [
    {
      name: "Iphone 14 Pro Max 256 gb ssd and 8 gb ram silver colour",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.",
      price: 999,
    },
    {
      name: "Iphone 14 Pro Max 256 gb ssd and 8 gb ram silver colour",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.",
      price: 678,
    },
    {
      name: "Iphone 14 Pro Max 256 gb ssd and 8 gb ram silver colour",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.",
      price: 234,
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 bg-white flex-col flex justify-between min-h-full w-[25%] shadow-sm">
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
            <h5 className="text-[20px] font-[500] pl-2">3 items</h5>
          </div>
          <br />
          <div className="w-full border-t">
            {cartData &&
              cartData.map((items, index) => (
                <CartSingle key={index} data={items} />
              ))}
          </div>
        </div>
        <div className="px-5 mb-3">
          <Link to={"/checkout"}>
            <div className="h-11.25 flex items-center justify-center w-full bg-[#e44343] rounded-[5px]">
              <h1 className="text-white text-[18px] font-150">
                Checkout Now USD$1000
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className="bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
          alt=""
          className="w-20 h-20 ml-2"
        />
        <div className="pl-1.25 ">
          <h1>{data.name}</h1>
          <h4 className="font-100 text-3.45 text-[#00000082]">
            ${data.price} * {value}
          </h4>
          <h4 className="font-150 text-4.25 pt-0.75 text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <RxCross1 className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Cart;
