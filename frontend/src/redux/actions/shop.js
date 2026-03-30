// redux/actions/user.js
import axios from "axios";
import { server } from "../../server";

import {
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
