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
    await axios.post("/api/auth", newUserDetails);
    await loginCall({ username: newUserDetails.username, password: newUserDetails.password }, dispatch);
  } catch (err) {
    return console.error("Error registering new user: ", err);
  }
};

//USERS

// Get user by id
export const getUserByIdCall = async (userId) => {
  try {
    const res = await axios.get(`/api/users/${userId}`);
    return res.data;
  } catch (err) {
    return console.error("Error in retrieving user by id: ", err);
  }
};

// Update user details
export const updateUserDetailsCall = async (userId, updatedUserDetails) => {
  try {
    await axios.put(`/api/users/update/${userId}`, updatedUserDetails);
  } catch (err) {
    return console.error("Error updating user details: ", err);
  }
};

//PRODUCTS

// Get all products
export const getAllProductsCall = async () => {
  try {
    const res = await axios.get("/https://codsoft-level-3-task-1.onrender.com/api/products");
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

//CART

// Get cart by userId
export const getCartByUserIdCall = async (userId) => {
  try {
    const res = await axios.get(`/api/carts/${userId}`);
    return res.data;
  } catch (err) {
    return console.error("Error in retrieving cart by userId: ", err);
  }
};

// Update cart by userId
export const updateCartByUserIdCall = async (userId, cart) => {
  try {
    await axios.put(`/api/carts/update/${userId}`, cart );
  } catch (err) {
    return console.error("Error in updating cart by userId: ", err);
  }
};

//MESSAGES

// Create a new message
export const createMessageCall = async (newMessage) => {
  try {
    await axios.post("/api/messages", newMessage);
  } catch (err) {
    return console.error("Error creating new message: ", err);
  }
};

//CHECKOUT

// Check if cart products still exist
export const checkCartProductsExistCall = async (cart) => {
  try {
    const res = await axios.post("/api/checkout/exist", cart);
    return res.data;
  } catch (err) {
    return console.error("Error checking cart products availability: ", err);
  }
}

// Check if cart products are still in stock
export const checkCartProductsInStockCall = async (cart) => {
  try {
    const res = await axios.post("/api/checkout/stock-check", cart);
    return res.data;
  } catch (err) {
    return console.error("Error checking cart products stock availability: ", err);
  }
}

// Clear cart by userId
export const clearCartByUserIdCall = async (userId) => {
  try {
    await axios.put(`/api/carts/clear/${userId}`);
  } catch (err) {
    return console.error("Error clearing cart by userId: ", err);
  }
};

//TRANSACTIONS

// Create a transaction
export const createTransactionCall = async (newTransaction) => {
  try {
    await axios.post("/api/transactions", newTransaction);
  } catch (err) {
    return console.error("Error creating transaction: ", err);
  }
};