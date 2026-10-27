

import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    data: null,
    userData: null,        
    loading: false,
    isInitialized: false,  
    error: null
  },
  reducers: {

    userLogin: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload?.message || 'Login failed',
        status: action.payload?.status || 500
      };
    },

    userMe: (state) => {
      state.loading = true;
      state.error = null;
    },
    userMeSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;   
      state.isInitialized = true;       
      state.error = null;
    },
    userMeFail: (state) => {
      state.loading = false;
      state.userData = null;             
      state.isInitialized = true;        
    },

   
    updateProfile: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;

      // ✅ merge instead of overwrite
      state.userData = {
        ...state.userData,
        ...action.payload
      };
    },
    updateProfileFail: (state) => {
      state.loading = false;
    },

    logout: (state) => {
      state.data = null;
      state.userData = null;
      state.isInitialized = false;
      state.error = null;
    }
  }
});

export const {
  userLogin,
  loginSuccess,
  loginFail,
  userMe,
  userMeSuccess,
  userMeFail,
  updateProfile,
  updateProfileSuccess,
  updateProfileFail,
  logout
} = loginSlice.actions;

export const selectError = (state) => state.login.error;

export default loginSlice.reducer;