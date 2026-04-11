import React, { act, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
  AiOutlineMessage,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../redux/actions/product";
import { toast } from "react-toastify";
import {
  addtoWishlist,
  removefromWishlist,
} from "../../redux/actions/wishlist";
import { addtoCart } from "../../redux/actions/cart";

const ProductsDetails = ({ data }) => {
  const { allUserProducts } = useSelector((state) => state.product);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log("data in product detail", data);

  useEffect(() => {
    if (data && data.shop?._id) {
      dispatch(getAllProduct(data.shop._id));
    }

    if (wishlist && data && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
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
  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removefromWishlist(data._id));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addtoWishlist(data));
  };
  const decrementCount = () => {
    setCount(count > 1 ? count - 1 : 1);
  };
  const incrementCount = () => {
    setCount(count + 1);
  };
  const navigate = useNavigate();

  const handleMessageSubmit = () => {
    navigate(`/inbox?coversation=507ebc95f1a2b3c4d5e`);
  };
  return (
    <div className="bg-white">
      {data && (
        <div className={`${styles.section} w-[90%] 800:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800:flex">
              <div className="w-full 800:w-[50%]">
                <img
                  src={`${backend_url}/uploads/${data.images[select]?.url}`}
                  //src={data?.image_Url[select].url}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex pt-9 ">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? "border" : "null"
                        } cursor-pointer`}
                      >
                        <img
                          src={`${backend_url}/uploads/${i?.url}`}
                          alt=""
                          className="h-50 overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                  <div
                    className={`${
                      select === 1 ? "border" : "border-none"
                    } cursor-pointer`}
                  ></div>
                </div>

                {/* <div className="w-full flex">
                  <div
                    className={`${select === 0 ? "border" : "border-0"} cursor-pointer`}
                  >
                    <img
                      src={`${backend_url}/uploads/${data.images[0]?.url}`}
                      //src={data?.image_Url[0].url}
                      alt=""
                      className="h-50"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div>

                  </div>
                  <div
                    className={`${select === 1 ? "border" : "border-0"} cursor-pointer`}
                  >
                    <img
                      src={`${backend_url}/uploads/${data.images[0]?.url}`}
                      alt=""
                      className="h-50"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div> */}
              </div>
              <div className="w-full 800:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
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
                <div
                  className={`${styles.button} mt-6! rounded! h-11! flex items-center `}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to Cart
                    <AiOutlineShoppingCart size={20} className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8 ">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${backend_url}${data.shop.avatar?.url}`}
                      alt=""
                      className="w-12.5 h-12.5 rounded-full mr-2"
                    />
                  </Link>

                  <div className="pr-8 ">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                    </Link>

                    <h5 className="pb-3 text-[15px]">({4}) Ratings</h5>
                  </div>
                  <div
                    className={` !bg-[#6443d1] ${styles.button}  mt-4 rounded! !h-11 `}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} products={allUserProducts} />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

const ProductDetailsInfo = ({ data, products }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800:px-10 py-2 rounded ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>

          {active === 1 && <div className={`${styles.active_indicator}`}></div>}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>

          {active === 2 && <div className={`${styles.active_indicator}`}></div>}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>

          {active === 3 && <div className={`${styles.active_indicator}`}></div>}
        </div>
      </div>
      {active === 1 && (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      )}
      {active === 2 && (
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p>No Reviews yet!</p>
        </div>
      )}
      {active === 3 && (
        <div className="w-full block 800:flex p-5">
          <div className="w-full 800:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${backend_url}${data.shop.avatar?.url}`}
                  alt=""
                  className="w-12.5 h-12.5 rounded-full"
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-3 text-[15px]">({4}) Ratings</h5>
                </div>
              </div>
            </Link>
            <p className="pl-2">{data.shop.description}</p>
          </div>
          <div className="w-full 800:w-[50%] mt-5 800:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-semibold">
                Joined on:{" "}
                <span className="font-medium">
                  {data.shop.createdAt.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-semibold pt-3">
                Total Products:{" "}
                <span className="font-medium">{products.length}</span>
              </h5>
              <h5 className="font-semibold pt-3">
                Total Reviews: <span className="font-medium">1200</span>
              </h5>

              <Link to="/">
                <div
                  className={`${styles.button}  !rounded-sm h-[39.5px] mt-3`}
                >
                  <h4 className="text-white ">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDetails;
