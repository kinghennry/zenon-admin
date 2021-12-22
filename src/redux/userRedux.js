import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutStart: (state) => {
      state.isFetching = true;
    },
    logout: (state) => {
      state.isFetching = false;
      //   localStorage.removeItem("persist:root");
      storage.removeItem("persist:root");
      state.currentUser = null;
    },
  },
});

export const { loginStart, logoutStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;

export default userSlice.reducer;
