// redux/actions/user.js
import axios from "axios";
import { server } from "../../server";

import {
  getAllShopFail,
  getAllShopRequest,
  getAllShopSuccess,
  loadShopFail,
  loadShopRequest,
  loadShopSuccess,
} from "../slices/shopSlice";

export const loadShop = () => async (dispatch) => {
  try {
    dispatch(loadShopRequest());

    const { data } = await axios.get(`${server}/shop/get-shop`);

    dispatch(loadShopSuccess(data.shop));
  } catch (error) {
    dispatch(
      loadShopFail(error.response?.data?.message || "Something went wrong"),
    );
  }
};
export const getAllShopsForAdmin = () => async (dispatch) => {
  try {
    dispatch(getAllShopRequest());

    const { data } = await axios.get(`${server}/shop/get-all-admin-shops`);

    dispatch(getAllShopSuccess(data.shops));
  } catch (error) {
    dispatch(
      getAllShopFail(error.response?.data?.message || "Something went wrong"),
    );
  }
};
