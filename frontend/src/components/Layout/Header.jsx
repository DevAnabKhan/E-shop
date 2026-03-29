import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { productData, categoriesData } from "../../static/data.jsx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import { backend_url } from "../../server.js";
import Cart from "../Cart/Cart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setSearchData(null);
    } else {
      const filteredProducts = productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase()),
      );

      setSearchData(filteredProducts);
    }
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      {loading ? null : (
        <>
          <div className={styles.section}>
            <div className="hidden 800:h-[50px] 800:my-[20px] 800:flex items-center justify-between">
              <div>
                <Link to="/">
                  <img
                    src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                    alt=""
                  />
                </Link>
              </div>

              <div className="w-[50%] relative">
                <input
                  type="text"
                  placeholder="Search Product..."
                  onChange={handleSearch}
                  value={searchTerm}
                  className="h-10 w-full px-2 border-[#3957db] border-2 rounded-md"
                />

                <AiOutlineSearch
                  size={30}
                  className="absolute right-2 top-1.5 cursor-pointer"
                />

                {searchData && searchData.length !== 0 && (
                  <div className="absolute max-h-[30vh] overflow-y-auto bg-slate-50 shadow-md z-10 p-4 w-full">
                    {searchData.map((i, index) => {
                      const product_name = i.name.replace(/\s+/g, "-");

                      return (
                        <Link key={index} to={`/product/${product_name}`}>
                          <div className="w-full items-center flex py-2">
                            <img
                              src={i.image_Url[0].url}
                              alt=""
                              className="w-10 h-10 mr-[10px]"
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className={`${styles.button}`}>
                <Link to={"/seller"}>
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10 " : null} transition hidden 800:flex items-center justify-center w-full bg-[#3321c8] h-[70px]`}
          >
            <div
              className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
            >
              <div onClick={() => setDropDown(!dropDown)}>
                <div className="relative h-15 mt-2.5 w-67.5 hidden 1000:block">
                  <BiMenuAltLeft size={30} className="absolute top-3 left-2 " />
                  <button className="h-full w-full items-center justify-between flex pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                    All Categories
                  </button>
                  <IoIosArrowDown
                    size={20}
                    className="absolute right-2 top-4 cursor-pointer"
                    onClick={() => setDropDown(!dropDown)}
                  />
                  {dropDown && (
                    <DropDown
                      categoriesData={categoriesData}
                      setDropDown={setDropDown}
                    />
                  )}
                </div>
              </div>
              <div className={`${styles.noramlFlex}`}>
                <Navbar active={activeHeading} />
              </div>

              <div className="flex">
                <div className={styles.noramlFlex}>
                  <div
                    className="relative cursor-pointer mr-3.75"
                    onClick={() => setOpenWishlist(true)}
                  >
                    <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />

                    <span className="absolute -top-1 -right-1 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[10px] flex items-center justify-center">
                      0
                    </span>
                  </div>
                </div>

                <div className={styles.noramlFlex}>
                  <div
                    className="relative cursor-pointer mr-3.75"
                    onClick={() => setOpenCart(true)}
                  >
                    <AiOutlineShoppingCart
                      size={30}
                      color="rgb(255 255 255 / 83%)"
                    />

                    <span className="absolute -top-1 -right-1 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[10px] flex items-center justify-center">
                      0
                    </span>
                  </div>
                </div>

                <div className={styles.noramlFlex}>
                  <div className="relative cursor-pointer mr-3.75">
                    {isAuthenticated ? (
                      <Link to="/profile">
                        <img
                          src={`${backend_url}${user?.avatar?.url}`}
                          className="w-8.75 h-8.75 rounded-full"
                          alt=""
                        />
                      </Link>
                    ) : (
                      <Link to="/login">
                        <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                      </Link>
                    )}
                  </div>
                </div>

                {/*wishliast and cart dropdown */}

                {openCart && <Cart setOpenCart={setOpenCart} />}

                {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
              </div>
            </div>
          </div>

          <div
            className={`${
              active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
            }
      w-full h-15 bg-white z-50 top-0 left-0 shadow-sm 800:hidden`}
          >
            <div className="w-full flex items-center justify-between">
              <div>
                <BiMenuAltLeft
                  size={40}
                  className="ml-4"
                  onClick={() => setOpen(true)}
                />
              </div>
              <div>
                <Link to="/">
                  <img
                    src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                    alt=""
                    className="mt-3 cursor-pointer"
                  />
                </Link>
              </div>
              <div>
                <div className="relative mr-5">
                  <AiOutlineShoppingCart size={30} />
                  <span className="absolute -top-1 -right-1 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[10px] flex items-center justify-center">
                    0
                  </span>
                </div>
              </div>
            </div>
            {open && (
              <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
                <div className="fixed w-[70%] bg-white h-screen top-0 left-0 z-10">
                  <div className="w-full justify-between pr-3 flex">
                    <div>
                      <div className="relative mr-3.75">
                        <AiOutlineHeart size={30} className="mt-5 ml-3" />
                        <span className="absolute -top-1 -right-1 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[10px] flex items-center justify-center">
                          0
                        </span>
                      </div>
                    </div>
                    <RxCross1
                      size={30}
                      className="ml-4 mt-5"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <div className="my-8 w-[92%] m-auto h-10">
                    <input
                      placeholder="Search Product"
                      type="search"
                      className="h-10 w-full px-2 border-[#3957db] border-2 rounded-md"
                      onChange={handleSearch}
                      value={searchTerm}
                    />
                    {searchData && (
                      <div className="absolute bg-white z-10 shadow w-full left-0 p-3">
                        {searchData.map((i) => {
                          const d = i.name;

                          const Product_name = d.replace(/\s+/g, "-");
                          return (
                            <Link to={`/product/${Product_name}`}>
                              <div className="flex items-center">
                                <img
                                  src={i.image_Url[0]?.url}
                                  alt=""
                                  className="w-12.5 mr-2"
                                />
                                <h5>{i.name}</h5>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <Navbar active={activeHeading} />
                  <div className={`${styles.button} ml-4 rounded-sm!`}>
                    <Link to="/shop-create">
                      <h1 className="text-white flex items-center">
                        Become Seller <IoIosArrowForward className="ml-1" />
                      </h1>
                    </Link>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div className="flex w-full justify-center">
                    {isAuthenticated ? (
                      <div>
                        <Link to="/profile">
                          <img
                            src={`${backend_url}${user?.avatar?.url}`}
                            alt=""
                            className="w-15 h-15 rounded-full border-[3px] border-[#0eae88]"
                          />
                        </Link>
                      </div>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="text-[18px] pr-2.5 text-[#000000b7]"
                        >
                          Login /
                        </Link>
                        <Link
                          to="/sign-up"
                          className="text-[18px] text-[#000000b7]"
                        >
                          Sign up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Header;
