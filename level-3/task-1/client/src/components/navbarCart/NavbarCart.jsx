import React, { useState, useEffect } from "react";
import "./navbar-cart.css";
import NavbarCartItem from "../navbarCartItem/NavbarCartItem";
import { updateCartByUserIdCall } from "../../apiCalls";

const NavbarCart = ({ cart, dispatch, setIsCartVisible }) => {
  const [total, setTotal] = useState(0);

  // Function to set the cart visibility to false
  const handleCloseCart = () => {
    setIsCartVisible(false);
  };

  // Function to format the price value
  const formattedPrice = (total) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(total);
  };

  // Function to remove an item from the cart
  const removeItem = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  // useEffect to update the total value
  useEffect(() => {
    let newTotal = 0;
    cart.items.forEach((item) => {
      newTotal += item.price * item.quantity;
    });
    setTotal(newTotal);
  }, [cart.items]);

  // useEffect to update the cart in the database
  useEffect(() => {
    const updateCart = async () => {
      try {
        await updateCartByUserIdCall(cart.userId, cart);
      } catch (err) {
        console.error("Error in updating cart: ", err);
      }
    };
    updateCart();
  }, [cart]);

  return (
    <div className="navbar-cart">
      <div className="navbar-cart-header">
        <span className="navbar-cart-title">Shopping Cart</span>
        <span className="navbar-cart-close" onClick={handleCloseCart}>×</span>
      </div>
      <ul className="navbar-cart-items">
        {cart.items.map((item) => (
          <li key={item.productId}>
            <NavbarCartItem item={item} formattedPrice={formattedPrice} removeItem={removeItem} />
          </li>
        ))}
      </ul>
      <div className="navbar-cart-total">
        <span>Total:</span>
        <span>{ formattedPrice(total) }</span>
      </div>
      <button className="navbar-cart-checkout">Checkout</button>
    </div>
  );
};

export default NavbarCart;