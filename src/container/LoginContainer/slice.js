import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        data: {},
        userData: {},
        loading: false,
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
                message: action.payload.message || 'Login failed',
                status: action.payload.status || 500
            };
        },

        userMe: (state) => {
            state.loading = true;
            state.error = null;
        },
        userMeSuccess: (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
        },
        userMeFail: (state, action) => {
            state.loading = false;
        },
        updateProfile: (state) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        },
        updateProfileFail: (state) => {
            state.loading = false;
        },
        logout: (state) => {
            state.data = null;
            state.userData = null;
            state.profileIncomplete = false;
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
