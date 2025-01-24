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