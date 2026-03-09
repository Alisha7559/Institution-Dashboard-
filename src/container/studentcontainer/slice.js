import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    count: 0,
    loading: false,
    error: null
  },
  reducers: {

    getStudents: (state) => {
      state.loading = true;
       state.error = null;
    },

    getStudentsSuccess: (state, action) => {
      state.loading = false;
      state.students = action.payload;
      state.count = action.payload.length;
    },

    getStudentsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  getStudents,
  getStudentsSuccess,
  getStudentsFail
} = studentSlice.actions;

export default studentSlice.reducer;