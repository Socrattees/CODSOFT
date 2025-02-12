const UserReducer = (state, action) => {
  switch(action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false
      };
    case "LOGIN_FAIL":
      return {
        user: null,
        isFetching: false,
        error: action.payload
      };
    case "LOG_OUT":
      return {
        user: null,
        isFetching: false,
        error: false
      };
    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false
      };
    case "UPDATE_FAIL":
      return {
        user: state.user,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default UserReducer;