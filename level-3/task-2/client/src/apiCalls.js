import axios from 'axios';

//AUTH

// Login
export const loginCall = async (userCredentials) => {
  try {
    const res = await axios.post("/api/auth/login", userCredentials);
    return res.data;
  } catch (err) {
    return err;
  }
};