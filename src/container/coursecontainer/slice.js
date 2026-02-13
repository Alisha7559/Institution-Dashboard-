import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [],
    loading: false,
    error: null
  },

  reducers: {
    /* ===== CREATE ===== */
    addCourse: (state) => {
      state.loading = true;
      state.error = null;
    },
    addCourseSuccess: (state, action) => {
      state.loading = false;
      state.courses.push(action.payload);
    },
    addCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload; // ✅ string only
    },

    /* ===== READ ===== */
    getCourses: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    getCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload; // ✅ string only
    },

    /* ===== UPDATE ===== */
    updateCourse: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCourseSuccess: (state, action) => {
      state.loading = false;
      const index = state.courses.findIndex(
        (c) => c._id === action.payload._id
      );
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    updateCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ===== DELETE ===== */
    deleteCourse: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCourseSuccess: (state, action) => {
      state.loading = false;
      state.courses = state.courses.filter(
        (c) => c._id !== action.payload
      );
    },
    deleteCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  addCourse,
  addCourseSuccess,
  addCourseFail,
  getCourses,
  getCoursesSuccess,
  getCoursesFail,
  updateCourse,
  updateCourseSuccess,
  updateCourseFail,
  deleteCourse,
  deleteCourseSuccess,
  deleteCourseFail
} = courseSlice.actions;

export default courseSlice.reducer;
