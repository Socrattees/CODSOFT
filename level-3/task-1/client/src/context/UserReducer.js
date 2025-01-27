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
        cart: { userId: "Guest", items: [] },
        isFetching: false,
        error: false
      };     
    case "SET_CART":
      return {
        ...state,
        cart: action.payload
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [...state.cart.items, action.payload]
        }
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map((item) =>
            item.productId === action.payload.product.productId ?
            { ...item, quantity: action.payload.quantity } : item)
        }
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter((item) =>
            item.productId !== action.payload)
        }
      }; 
    case "CLEAR_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          items: []
        }
      };
    default:
      return state;
  }
};

export default UserReducer;