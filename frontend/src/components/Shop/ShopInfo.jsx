import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";
import { getAllProduct } from "../../redux/actions/product";

const ShopInfo = ({ isOwner }) => {
  const { allProducts } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const { id } = useParams();
  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct(id));
    const fetchData = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const res = await axios.get(`${server}/shop/get-shop-info/${id}`);

          if (res.data.success) {
            setData(res.data.shop);
            setIsLoading(false);
            // ✅ IMPORTANT FIX
          }
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      }
    };

    fetchData();
  }, [id]);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${server}/shop/logout-shop`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Logged out Shop successfully!");
        dispatch(shopLogout());
        navigate("/shop-login");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Logout failed!");
    }
  };

  const products = allProducts || [];
  const totalReviewsLength =
    products?.reduce(
      (acc, product) => acc + (product.reviews?.length || 0),
      0,
    ) || 0;

  const totalRatings =
    products?.reduce(
      (acc, product) =>
        acc +
        (product.reviews?.reduce((sum, review) => sum + review.rating, 0) || 0),
      0,
    ) || 0;

  const averageRating =
    totalReviewsLength > 0 ? totalRatings / totalReviewsLength : 0;

  console.log("Shop info ", data);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex items-center justify-center">
              <img
                src={`${backend_url}${data.avatar?.url}`}
                className="w-37.5 h-37.5 object-cover rounded-full"
                alt=""
              />
            </div>
            <h3 className="text-center py-2 text-[20px]"> {data.name}</h3>
            <p className="text-center p-2.5 text-[16px] flex text-[#000000a6]">
              {data.description}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-semibold">Address</h5>
            <h4 className="text-[#000000a6]">{data.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-semibold">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-semibold">Total Products</h5>
            <h4 className="text-[#000000a6]">
              {allProducts && allProducts.length}
            </h4>
          </div>
          <div className="p-3">
            <h5 className="font-semibold">Shop Ratings</h5>
            <h4 className="text-[#000000b0]">{averageRating}/ 5</h4>
          </div>
          <div className="p-3">
            <h5 className="font-semibold">Joined On</h5>
            <h4 className="text-[#000000b0]">{data.createdAt?.slice(0, 10)}</h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div
                  className={`${styles.button} w-full! h-10.5! rounded-[5px]!`}
                >
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                className={`${styles.button} w-full! h-10.5! rounded-[5px]!`}
                onClick={logoutHandler}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
