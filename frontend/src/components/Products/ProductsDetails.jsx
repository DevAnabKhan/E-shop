import React, { act, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
  AiOutlineMessage,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductsDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
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
                  src={data?.image_Url[select].url}
                  alt=""
                  className="w-[80%]"
                />

                <div className="w-full flex">
                  <div
                    className={`${select === 0 ? "border" : "border-0"} cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt=""
                      className="h-50"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${select === 1 ? "border" : "border-0"} cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt=""
                      className="h-50"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-8 justify-between pr-3">
                  {/* Counter */}
                  <div className="flex items-center mt-4 ">
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white w-8 h-8 rounded-l flex items-center justify-center"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 w-10 h-8 font-medium py-[11px] items-center justify-center flex">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white w-8 h-8 rounded-r flex items-center justify-center"
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
                      onClick={() => {
                        setClick(!click);
                      }}
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      color={click ? "red" : "#333"}
                      onClick={() => {
                        setClick(!click);
                      }}
                      title="Add to wishlist"
                    />
                  )}
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center `}
                >
                  <span className="text-white flex items-center">
                    Add to Cart
                    <AiOutlineShoppingCart size={20} className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8 ">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div className="pr-8 ">
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>

                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                  <div
                    className={` !bg-[#6443d1] ${styles.button}  mt-4 !rounded !h-11 `}
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
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
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
            Product details content goes here. This section can include
            information about the product's features, specifications, materials
            used, dimensions, and any other relevant details that would help
            customers make informed purchasing decisions. It can also include
            care instructions, warranty information, and any certifications or
            awards the product has received.
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Customer reviews content goes here. This section can include
            feedback from customers who have purchased the product, including
            their ratings, comments, and any photos they may have shared. It can
            also include an overall rating for the product based on customer
            reviews.
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Seller information content goes here. This section can include
            details about the seller, such as their name, location, contact
            information, and any other relevant information that customers may
            want to know before making a purchase. It can also include
            information about the seller's return policy, shipping options, and
            any other policies they may have in place.
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
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                alt=""
                className="w-12.5 h-12.5 rounded-full"
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-3 text-[15px]">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>
            <p className="pl-2">
              Loremepsum dolor sit amet consectetur adipisicing elit. Voluptas,
              eaque.
            </p>
          </div>
          <div className="w-full 800:w-[50%] mt-5 800:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-semibold">
                Joined on: <span className="font-medium">21-March-2026</span>
              </h5>
              <h5 className="font-semibold pt-3">
                Total Products: <span className="font-medium">1,3444</span>
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
