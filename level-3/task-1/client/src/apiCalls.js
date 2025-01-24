import axios from "axios";
import {
  LoginStart,
  LoginSuccess,
  LoginFail
} from "./context/UserActions";

//AUTH

// Login
export const loginCall = async (userDetails, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post("/api/auth/login", userDetails);
    dispatch(LoginSuccess(res.data));
  } catch (err) {
    dispatch(LoginFail(err));
  }
};

// Register new user
export const registerCall = async (newUserDetails, dispatch) => {
  try {
    console.log(newUserDetails);
    await axios.post("/api/auth", newUserDetails);
    await loginCall({ username: newUserDetails.username, password: newUserDetails.password }, dispatch);
  } catch (err) {
    return console.error("Error registering new user: ", err);
  }
};

// Get all products
export const getAllProductsCall = async () => {
  try {
    const res = await axios.get("/api/products");
    return res.data;
  } catch (err) {
    return console.error("Error in retrieving data of all products: ", err);
  }
};

// Get products by search query
export const getProductsBySearchCall = async (search) => {
  try {
    const res = await axios.get(`/api/products/search/search-results?q=${search}`);
    return res.data;
  } catch (err) {
    return console.error("Error in retrieving data of products by search query: ", err);
  }
}