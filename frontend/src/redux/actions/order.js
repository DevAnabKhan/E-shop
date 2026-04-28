// redux/actions/user.js
import axios from "axios";
import { server } from "../../server";

import {
  getAllOrdersForAdminFailed,
  getAllOrdersForAdminRequest,
  getAllOrdersForAdminSuccess,
  getAllOrdersForShopFailed,
  getAllOrdersForShopRequest,
  getAllOrdersForShopSuccess,
  getAllOrdersForUserFailed,
  getAllOrdersForUserRequest,
  getAllOrdersForUserSuccess,
} from "../slices/orderSlice";

export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersForUserRequest());
    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`,
    );
    console.log(data);
    dispatch(getAllOrdersForUserSuccess(data.orders));
  } catch (error) {
    dispatch(
      getAllOrdersForUserFailed(
        error.response?.data?.message || "Something went wrong",
      ),
    );
  }
};

export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersForShopRequest());
    const { data } = await axios.get(
      `${server}/order/get-all-shop-orders/${shopId}`,
    );
    console.log(data);
    dispatch(getAllOrdersForShopSuccess(data.orders));
  } catch (error) {
    dispatch(
      getAllOrdersForShopFailed(
        error.response?.data?.message || "Something went wrong",
      ),
    );
  }
};
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch(getAllOrdersForAdminRequest());
    const { data } = await axios.get(`${server}/order/get-all-admin-orders`);
    console.log(data);
    dispatch(getAllOrdersForAdminSuccess(data.orders));
  } catch (error) {
    dispatch(
      getAllOrdersForAdminFailed(
        error.response?.data?.message || "Something went wrong",
      ),
    );
  }
};
