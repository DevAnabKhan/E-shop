import React, { useEffect, useState } from "react"; // ✅ add useState
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addtoCart } from "../../../redux/actions/cart";
import {
  addtoWishlist,
  removefromWishlist,
} from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();
  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    setCount(count > 1 ? count - 1 : 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addtoCart(cartData));
        toast.success("Item added to cart successfully");
      }
    }
  };

  const { wishlist } = useSelector((state) => state.wishlist);
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
    <div>
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          {" "}
          {/* ✅ justify-center */}
          <div className="w-[90%] md:w-[60%] h-[90vh] md:h-[75vh] overflow-y-scroll bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-4 z-50 cursor-pointer"
              onClick={() => setOpen(false)}
            />

            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <div className="w-full md:w-[50%]">
                <img
                  src={`${backend_url}/uploads/${data.images[0]?.url}`}
                  alt={data.name}
                  className="w-full object-contain"
                />

                <div className="flex">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                    <img
                      src={`${backend_url}${data.shop.avatar.url}`}
                      alt=""
                      className="w-12.5 h-12.5 mr-2 rounded-full"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">({4}) Ratings</h5>
                    </div>
                  </Link>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">
                  ({data.total_sell || 0}) Sold out
                </h5>
              </div>
              <div className="w-full md:w-[50%] pr-1.25">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p className="text-[#00000060] text-sm mt-2">
                  {data.description}
                </p>
                <div className="flex gap-3 mt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    ${data.discountPrice}
                  </h4>
                  {data.originalPrice && (
                    <h3 className={`${styles.price}`}>${data.originalPrice}</h3>
                  )}
                </div>

                <div className="flex items-center mt-8 justify-between pr-3">
                  {/* Counter */}
                  <div className="flex items-center mt-4 ">
                    <button
                      className="bg-linear-to-r from-teal-400 to-teal-500 text-white w-8 h-8 rounded-l flex items-center justify-center"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 w-10 h-8 font-medium py-[11px] items-center justify-center flex">
                      {count}
                    </span>
                    <button
                      className="bg-linear-to-r from-teal-400 to-teal-500 text-white w-8 h-8 rounded-r flex items-center justify-center"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer "
                      color={click ? "red" : "#333"}
                      onClick={() => removeFromWishlistHandler(data)}
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      color={click ? "red" : "#333"}
                      onClick={() => addToWishlistHandler(data)}
                      title="Add to wishlist"
                    />
                  )}
                </div>
                <button
                  className="mt-4 bg-black text-white px-6 py-2 rounded"
                  onClick={() => addToCartHandler(data._id)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
