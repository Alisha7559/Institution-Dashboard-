import { createSlice } from "@reduxjs/toolkit";

const enquirySlice = createSlice({
  name: "enquiry",
  initialState: {
    enquiries: [],
    loading: false,
    error: null,
  },
  reducers: {
    getEnquiries: (state) => { state.loading = true; state.error = null; },
    getEnquiriesSuccess: (state, action) => { state.loading = false; state.enquiries = action.payload; },
    getEnquiriesFail: (state, action) => { state.loading = false; state.error = action.payload; },

    updateEnquiry: (state) => { state.loading = true; state.error = null; },
    updateEnquirySuccess: (state, action) => {
      state.loading = false;
      const index = state.enquiries.findIndex(e => e._id === action.payload._id);
      if (index !== -1) state.enquiries[index] = action.payload;
    },
    updateEnquiryFail: (state, action) => { state.loading = false; state.error = action.payload; },
  },
});

export const {
  getEnquiries,
  getEnquiriesSuccess,
  getEnquiriesFail,
  updateEnquiry,
  updateEnquirySuccess,
  updateEnquiryFail,
} = enquirySlice.actions;

export default enquirySlice.reducer;