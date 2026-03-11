import { createSlice } from "@reduxjs/toolkit";

const supportSlice = createSlice({

  name: "support",

  initialState: {
    types: [],
    requests: [],
    loading: false,
    error: null
  },

  reducers: {

    /* ================= GET SUPPORT TYPES ================= */

    getSupportTypes: (state) => {
      state.loading = true;
    },

    getSupportTypesSuccess: (state, action) => {
      state.loading = false;
      state.types = action.payload?.data || [];
    },

    getSupportTypesFail: (state) => {
      state.loading = false;
      state.error = "Failed to load support types";
    },


    /* ================= CREATE REQUEST ================= */

    createSupportRequest: (state) => {
      state.loading = true;
    },

    createSupportRequestSuccess: (state) => {
      state.loading = false;
    },


    /* ================= GET MY REQUESTS ================= */

    getMyRequests: (state) => {
      state.loading = true;
    },

    getMyRequestsSuccess: (state, action) => {
      state.loading = false;
      state.requests = action.payload?.data || [];
    },

    getMyRequestsFail: (state) => {
      state.loading = false;
      state.error = "Failed to load requests";
    }

  }

});

export const {
  getSupportTypes,
  getSupportTypesSuccess,
  getSupportTypesFail,

  createSupportRequest,
  createSupportRequestSuccess,

  getMyRequests,
  getMyRequestsSuccess,
  getMyRequestsFail

} = supportSlice.actions;

export default supportSlice.reducer;