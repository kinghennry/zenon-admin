import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetching: null,
    error: false,
  },
  reducers: {
    getOrderStart: (state) => {
      state.isFetching = true;
    },
    getOrders: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getOrdersError: (state, action) => {
      state.error = action.payload;
      state.isFetching = false;
    },
  },
});

export const { getOrderStart, getOrders, getOrdersError } = orderSlice.actions;

export default orderSlice.reducer;
