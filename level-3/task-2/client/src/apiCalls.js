import axios from 'axios';
import { LoginStart, LoginSuccess } from './context/UserActions';

//AUTH

// Login
export const loginCall = async (userDetails, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post("/api/auth/login", userDetails);
    dispatch(LoginSuccess(res.data));
    return res.data;
  } catch (err) {
    return err;
  }
};

// Register
export const registerCall = async (userDetails) => {
  try {
    const res = await axios.post("/api/auth/register", userDetails);
    return res.data;
  } catch (err) {
    return err;
  }
};

// Find admin
export const findAdminCall = async () => {
  try {
    const res = await axios.get("/api/auth/findAdmin");
    return res.data;
  } catch (err) {
    return err;
  }
};

//USERS

// Get all users
export const getUsersCall = async () => {
  try {
    const res = await axios.get("/api/users");
    return res.data;
  } catch (err) {
    return err;
  }
}