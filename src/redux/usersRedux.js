import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    userList: [],
    isFetching: false,
    error: false,
    isCompleted: null,
    isUpdated: null,
  },

  reducers: {
    //GET ALL
    startLoading: (state) => {
      state.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.userList = action.payload;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isFetching = false;
      //   state.error = true;
    },
    //DELETE

    deleteUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.userList.splice(
        state.userList.findIndex((item) => item._id === action.payload),
        1
      );
    },

    //UPDATE USER
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.userList[
        state.userList.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.userList;
      state.isCompleted = true;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //add user
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.userList.push(action.payload);
      state.isUpdated = true;
    },
  },
});

export const {
  startLoading,
  getUsersSuccess,
  hasError,
  deleteUsersSuccess,
  addUserSuccess,
  updateUserSuccess,
  updateUserFailure,
  updateUserStart,
} = usersSlice.actions;

export default usersSlice.reducer;
