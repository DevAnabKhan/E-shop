import React from "react";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoWishlist,
  removefromWishlist,
} from "../../redux/actions/wishlist";
import { backend_url } from "../../server";
import { addtoCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const removeFromWishlistHandler = (data) => {
    dispatch(removefromWishlist(data._id));
  };
  const addToWishlistHandler = (data) => {
    dispatch(addtoWishlist(data));
  };

  const { cart } = useSelector((state) => state.cart);

  const addToCartHandler = (data) => {
    const cartData = { ...data, qty: 1 };
    dispatch(addtoCart(cartData));
    setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 bg-white flex-col flex justify-between min-h-full w-[25%] shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div
            className="w-full h-screen flex items-center justify-center
            
            "
          >
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Your wishlist is empty </h5>
          </div>
        ) : (
          <>
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
                <h5 className="text-[20px] font-medium pl-2">
                  {wishlist && wishlist.length} items
                </h5>
              </div>
              <br />
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((items, index) => (
                    <CartSingle
                      key={index}
                      data={items}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCartHandler={addToCartHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center justify-between">
        <RxCross1
          className="cursor-pointer 800:mb-['unset'] 800:ml-['unset'] mb-2 ml-2 "
          onClick={() => removeFromWishlistHandler(data)}
        />
        <img
          src={`${backend_url}${data.images[0]?.url}`}
          alt=""
          className="w-20 h-20 ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-1.25 pr-9">
          <h1>{data.name}</h1>

          <h4 className="font-150 text-4.25 pt-0.75 800:pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className=" cursor-pointer justify-end"
            onClick={() => addToCartHandler(data)}
            title="Add to cart"
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
