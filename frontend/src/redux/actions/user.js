// redux/actions/user.js
import axios from "axios";
import { server } from "../../server";
import {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  updateUserAddressRequest,
  updateUserAddressSuccess,
  updateUserAddressFail,
  deleteUserAddressRequest,
  deleteUserAddressSuccess,
  deleteUserAddressFail,
} from "../slices/userSlice";
import { Country } from "country-state-city";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${server}/user/getuser`);

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(
      loadUserFail(error.response?.data?.message || "Something went wrong"),
    );
  }
};

export const updateUserInfo =
  (email, password, phoneNumber, name) => async (dispatch) => {
    try {
      dispatch(updateUserRequest());
      console.log("data comming", email, phoneNumber, password, name);
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(updateUserSuccess(data.user));
    } catch (error) {
      dispatch(
        updateUserFail(error.response?.data?.message || "Something went wrong"),
      );
    }
  };

export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    // ✅
    try {
      dispatch(updateUserAddressRequest());
      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        { country, city, address1, address2, zipCode, addressType }, // ✅
        { withCredentials: true },
      );
      dispatch(updateUserAddressSuccess(data.user));
    } catch (error) {
      dispatch(
        updateUserAddressFail(
          error.response?.data?.message || "Something went wrong",
        ),
      );
    }
  };

export const deleteUserAddress = (id) => async (dispatch) => {
  // ✅
  try {
    dispatch(deleteUserAddressRequest());
    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      { withCredentials: true },
    );
    dispatch(deleteUserAddressSuccess(data.user));
  } catch (error) {
    dispatch(
      deleteUserAddressFail(
        error.response?.data?.message || "Something went wrong",
      ),
    );
  }
};
