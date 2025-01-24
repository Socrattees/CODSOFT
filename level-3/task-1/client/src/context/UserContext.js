import React, { createContext, useMemo, useReducer, useEffect } from 'react';
import UserReducer from './UserReducer';

const INITIAL_STATE = {
  /* Below line will check if there is a user in the local storage and,
   if not, it will set it to null */
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false
}

// Create a context for the user
export const UserContext = createContext(INITIAL_STATE);

// Create a provider component
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  const contextValue = useMemo(() => ({
    user: state.user,
    isFetching: state.isFetching,
    error: state.error,
    dispatch,
  }), [state.user, state.isFetching, state.error]);

  // useEffect to set the user in the local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user]);

  return (
    <UserContext.Provider value={ contextValue }>
      {children}
    </UserContext.Provider>
  );
};