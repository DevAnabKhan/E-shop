// redux/actions/user.js
import axios from "axios";
import { server } from "../../server";
import {
  deleteEventFail,
  deleteEventRequest,
  deleteEventSuccess,
  fetchAllEventsFail,
  fetchAllEventsRequest,
  fetchAllEventsSuccess,
  getAllEventsForUserFailed,
  getAllEventsForUserRequest,
  getAllEventsForUserSuccess,
  loadEventFail,
  loadEventRequest,
  loadEventSuccess,
} from "../slices/eventSlice";

export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch(loadEventRequest());
    console.log(newForm);
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config,
    );
    console.log(data);
    dispatch(loadEventSuccess(data.event));
  } catch (error) {
    dispatch(
      loadEventFail(error.response?.data?.message || "Something went wrong"),
    );
  }
};

export const getAllEvents = (id) => async (dispatch) => {
  try {
    dispatch(fetchAllEventsRequest());

    const { data } = await axios.get(`${server}/event/get-all-events/${id}`);
    console.log(data);
    dispatch(fetchAllEventsSuccess(data.events));
  } catch (error) {
    dispatch(
      fetchAllEventsFail(
        error.response?.data?.message || "Something went wrong",
      ),
    );
  }
};
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch(deleteEventRequest());

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
    );
    dispatch(deleteEventSuccess({ message: data.message, id }));
  } catch (error) {
    dispatch(
      deleteEventFail(error.response?.data?.message || "Something went wrong"),
    );
  }
};

export const getAllEventsForUser = () => async (dispatch) => {
  try {
    dispatch(getAllEventsForUserRequest());

    const { data } = await axios.get(`${server}/event/get-all-events`);
    console.log(data);
    dispatch(getAllEventsForUserSuccess(data.events));
  } catch (error) {
    dispatch(
      getAllEventsForUserFailed(
        error.response?.data?.message || "Something went wrong",
      ),
    );
  }
};
