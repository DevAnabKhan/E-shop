import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { backend_url, server } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoWishlist,
  removefromWishlist,
} from "../../../redux/actions/wishlist";
import { addtoCart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const addToCartHandler = (id) => {
    const isItemExist = cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addtoCart(cartData));
        toast.success("Item added to cart successfully");
      }
    }
  };
  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removefromWishlist(data._id));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addtoWishlist(data));
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);
  return (
    <>
      <div className="w-full h-92.5 bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-center"></div>
        <Link
          to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}
        >
          <img
            src={`${backend_url}/uploads/${data.images[0]?.url}`}
            alt=""
            className="w-full h-42.5 object-contain"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link
          to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}
        >
          <h4 className="pb-3 font-medium">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <div className="flex">
            <Ratings rating={data.ratings} />
          </div>
          <div>
            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h5 className={`${styles.productDiscountPrice}`}>
                  ${data.discountPrice}
                </h5>

                {data.originalPrice && (
                  <h4 className={`${styles.price} line-through text-red-500`}>
                    ${data.originalPrice}
                  </h4>
                )}
              </div>
            </div>
            <div className=" flex justify-end items-end">
              <span className="justify-end text-[17px] font-[400] text-[#68d284]">
                ({data.sold_out || 0} sold out)
              </span>
            </div>
          </div>
        </Link>
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5 "
              color={click ? "red" : "#333"}
              onClick={() => removeFromWishlistHandler(data)}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5 "
              color={click ? "red" : "#333"}
              onClick={() => addToWishlistHandler(data)}
              title="Add to wishlist"
            />
          )}

          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14 "
            color={"#333"}
            onClick={() => {
              setOpen(!open);
            }}
            title="Quick View"
          />

          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            color={"#444"}
            onClick={() => addToCartHandler(data._id)}
            title="Add to cart"
          />

          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
