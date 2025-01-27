//AUTH ACTIONS

export const LoginStart = () => ({
  type: "LOGIN_START"
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user
});

export const LoginFail = (error) => ({
  type: "LOGIN_FAIL",
  payload: error
});

export const LogOut = () => ({
  type: "LOG_OUT"
});

//CART ACTIONS

export const SetCart = (cart) => ({
  type: "SET_CART",
  payload: cart
});

export const AddToCart = (item) => ({
  type: "ADD_TO_CART",
  payload: item
});

export const RemoveFromCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: productId
});

export const ClearCart = () => ({
  type: "CLEAR_CART"
});