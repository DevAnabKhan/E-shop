// redux/actions/user.js
import axios from "axios";
import { server } from "../../server";

import {
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  fetchAllProductsFail,
  fetchAllProductsRequest,
  fetchAllProductsSuccess,
  getAllProductsForUserFailed,
  getAllProductsForUserRequest,
  getAllProductsForUserSuccess,
  loadProductFail,
  loadProductRequest,
  loadProductSuccess,
} from "../slices/productSlice";

export const createProduct = (newForm) => async (dispatch) => {
  try {
    console.log("called", newForm);
    console.log(`${server}/product/create-product`);
    dispatch(loadProductRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config,
    );
    console.log(data);
    dispatch(loadProductSuccess(data.product));
  } catch (error) {
    dispatch(
      loadProductFail(error.response?.data?.message || "Something went wrong"),
    );
  }
};

export const getAllProduct = (id) => async (dispatch) => {
  try {
    console.log("id", id);
    dispatch(fetchAllProductsRequest());

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`,
    );
    console.log("data commming", data);
    dispatch(fetchAllProductsSuccess(data.products));
  } catch (error) {
    dispatch(
      fetchAllProductsFail(
        error.response?.data?.message || "Something went wrong",
      ),
    );
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
    );
    dispatch(deleteProductSuccess({ message: data.message, id }));
  } catch (error) {
    dispatch(
      deleteProductFail(
        error.response?.data?.message || "Something went wrong",
      ),
    );
  }
};

export const getAllProductsForUser = () => async (dispatch) => {
  try {
    dispatch(getAllProductsForUserRequest());

    const { data } = await axios.get(`${server}/product/get-all-products`);
    console.log(data);
    dispatch(getAllProductsForUserSuccess(data.products));
  } catch (error) {
    dispatch(
      getAllProductsForUserFailed(
        error.response?.data?.message || "Something went wrong",
      ),
    );
  }
};
