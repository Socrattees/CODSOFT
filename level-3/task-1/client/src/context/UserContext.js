import React, { createContext, useMemo, useReducer, useEffect } from 'react';
import UserReducer from './UserReducer';

// Function to get item from local storage or set it to default value
const getLocalStorageItem = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  return item !== null && item !== undefined ? JSON.parse(item) : defaultValue;
 };

const INITIAL_STATE = {
  /* Below line will check if there is a user in the local storage and,
   if not, it will set it to null */

   user: getLocalStorageItem("user", null),
   cart: getLocalStorageItem("cart", [{ userId: "Guest", items: [] }]),
   isFetching: false,
   error: false
};

// Create a context for the user
export const UserContext = createContext(INITIAL_STATE);

// Create a provider component
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  const contextValue = useMemo(() => ({
    user: state.user,
    cart: state.cart,
    isFetching: state.isFetching,
    error: state.error,
    dispatch,
  }), [state.user, state.cart, state.isFetching, state.error]);

  // useEffect to set the user in the local storage
  useEffect(() => {
    if (state.user !== undefined) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);

  // useEffect to set the cart in the local storage
  useEffect(() => {
    if (state.cart !== undefined) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  return (
    <UserContext.Provider value={ contextValue }>
      {children}
    </UserContext.Provider>
  );
};