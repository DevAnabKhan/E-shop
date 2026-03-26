import React from "react";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useState } from "react";

const Wishlist = ({ setOpenWishlist }) => {
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
              onClick={() => setOpenWishlist(false)}
              className="cursor-pointer"
            />
          </div>
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={25} />
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
        <RxCross1
          className="cursor-pointer"
          onClick={() => setOpenWishlist(false)}
        />
        <img
          src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
          alt=""
          className="w-20 h-20 ml-2"
        />

        <div className="pl-1.25 ">
          <h1>{data.name}</h1>

          <h4 className="font-150 text-4.25 pt-0.75 text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            onClick={() => setValue(value + 1)}
            title="Add to cart"
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
