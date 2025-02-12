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

//USER ACTIONS
export const UpdateStart = () => ({
  type: "UPDATE_START"
});

export const UpdateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user
});

export const UpdateFail = (error) => ({
  type: "UPDATE_FAIL",
  payload: error
});