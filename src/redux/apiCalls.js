import {
  loginFailure,
  loginStart,
  logoutStart,
  loginSuccess,
  logout,
} from "./userRedux";
import {
  startLoading,
  getUsersSuccess,
  hasError,
  deleteUsersSuccess,
  addUserSuccess,
  updateUserSuccess,
  updateUserFailure,
  updateUserStart,
} from "./usersRedux";
import { getOrders, getOrderStart, getOrdersError } from "./orderRedux";
import { publicRequest, userRequest } from "./requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";

//login functions
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const Logout = async (dispatch) => {
  dispatch(logoutStart());
  try {
    dispatch(logout());
  } catch (err) {
    dispatch(loginFailure());
  }
};

//get products

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

//delete product
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

//updateProduct
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    // offcourse u will update ur item using axios user requesrt
    const res = await userRequest.put(`/products/${id}`);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

//get users

export const getUsers = async (dispatch) => {
  dispatch(startLoading());

  try {
    const res = await userRequest.get("/users");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(hasError(err.message));
  }
};

//delete user
export const deleteUser = async (id, dispatch) => {
  dispatch(startLoading());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUsersSuccess(id));
  } catch (err) {
    dispatch(hasError(err.message));
  }
};

//add user

export const addNewUser = async (userData, dispatch) => {
  dispatch(startLoading());
  try {
    const res = await publicRequest.post("/auth/register", userData);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(hasError(err.message));
  }
};

//edit user

export const editUser = async (id, dispatch, updateUser) => {
  dispatch(updateUserStart());

  try {
    const res = await userRequest.put(`/users/${id}`);
    dispatch(updateUserSuccess({ id, updateUser }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

//get orders

export const getOrder = async (dispatch) => {
  dispatch(getOrderStart());

  try {
    const res = await userRequest.get("/orders");
    dispatch(getOrders(res.data));
  } catch (err) {
    dispatch(getOrdersError(err.message));
  }
};
