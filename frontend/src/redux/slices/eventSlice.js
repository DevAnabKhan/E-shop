// redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    eventLoading: true,
    event: null,
    error: null,
    success: false,
    fetchLoading: false,
    fetchError: null,
    fetchSuccess: false,
    allEvents: [],
    deleteError: false,
    deleteLoading: false,
    message: null,
    userEventsError: null,
    allUserEvents: [],
    isUserEventsLoading: false,
  },
  reducers: {
    loadEventRequest: (state) => {
      state.eventLoading = true;
    },
    loadEventSuccess: (state, action) => {
      state.eventLoading = false;
      state.event = action.payload;
      state.success = true;
    },
    loadEventFail: (state, action) => {
      state.eventLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    fetchAllEventsRequest: (state) => {
      state.fetchLoading = true;
    },
    fetchAllEventsSuccess: (state, action) => {
      state.fetchLoading = false;
      state.allEvents = action.payload;
    },
    fetchAllEventsFail: (state, action) => {
      state.fetchLoading = false;
      state.fetchError = action.payload;
    },
    deleteEventRequest: (state) => {
      state.deleteLoading = true;
    },
    deleteEventSuccess: (state, action) => {
      state.deleteLoading = false;
      state.message = action.payload;
      state.allEvents = state.allEvents.filter(
        (event) => event._id !== action.payload.id,
      );
    },
    deleteEventFail: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = action.payload;
    },
    //-----for user
    getAllEventsForUserRequest: (state) => {
      state.isUserEventsLoading = true;
    },
    getAllEventsForUserSuccess: (state, action) => {
      state.isUserEventsLoading = false;
      state.allUserEvents = action.payload;
    },
    getAllEventsForUserFailed: (state, action) => {
      state.isUserEventsLoading = false;
      state.userEventsError = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loadEventRequest,
  loadEventSuccess,
  loadEventFail,
  fetchAllEventsFail,
  fetchAllEventsRequest,
  fetchAllEventsSuccess,
  deleteEventFail,
  deleteEventRequest,
  deleteEventSuccess,
  getAllEventsForUserRequest,
  getAllEventsForUserSuccess,
  getAllEventsForUserFailed,
  clearError,
} = eventSlice.actions;

export const eventReducer = eventSlice.reducer;
