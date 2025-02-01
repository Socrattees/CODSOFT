import React, { useContext, useEffect, useState } from 'react';
import './checkout.css';
import Navbar from '../../components/navbar/Navbar';
import CheckoutItem from '../../components/checkoutItem/CheckoutItem';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { checkCartProductsExistCall, checkCartProductsInStockCall, updateCartByUserIdCall } from '../../apiCalls';

const Checkout = () => {
  const { cart, dispatch } = useContext(UserContext);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  // Function to format the price value
  const formattedPrice = (total) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(total);
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    console.log("Item removed from cart");
  };

  // Function to handle the checkout
  const handleCheckoutPayment = async () => {
    console.log("Starting payment process...");
    // First check if all items in the cart still exist
    try {
      const unavailableItems = await checkCartProductsExistCall(cart);
      if (unavailableItems.length > 0) {
        console.log("Some items are unavailable: ", unavailableItems);
        unavailableItems.forEach((item) => {
          dispatch({ type: 'REMOVE_FROM_CART', payload: item.productId });
        });
        return alert("Some item(s) in your cart does no longer exist. Removing item(s)");
      }
      console.log("All items are available. Proceeding to check stock...");
    } catch (err) {
      console.error("Error processing existance of items: ", err);
    }
    // Then check if all items in the cart are still in stock
    try {
      const unavailableStock = await checkCartProductsInStockCall(cart);
      if (unavailableStock.length > 0) {
        console.log("Some item(s) have insufficient stock: ", unavailableStock);
        unavailableStock.forEach((stockItem) => {
          const cartItem = cart.items.find((item) => item.productId === stockItem.productId);
          if (cartItem) {
            dispatch({
              type: 'UPDATE_QUANTITY',
              payload: {
                product: cartItem,
                quantity: stockItem.availableStock
              }
            });
          }
        });
        return alert("Some item(s) in your cart have insufficient stock. Setting affected item(s) to maximum available quantity");
      }
      console.log("All items are in stock. Proceeding to payment...");
      navigate('/checkout/payment', { state: { fromCheckout: true } });
    } catch (err) {
      console.error("Error processing stock of items: ", err);
    }

  };

  // useEffect to update the total value
  useEffect(() => {
    let newTotal = 0;
    cart.items.forEach((item) => {
      newTotal += item.price * item.quantity;
    });
    setTotal(newTotal);
  }, [cart.items]);

  // useEffect to see if the cart is empty
  useEffect(() => {
    if (cart.items.length === 0) {
      console.log("Cart is empty");
      navigate("/");
    }
  }, [cart.items, navigate]);

  // useEffect to update the cart in the database
  useEffect(() => {
    try {
      const updateCart = async () => {
        await updateCartByUserIdCall(cart.userId, cart);
      };
      updateCart();
    } catch (err) {
      console.error("Error updating cart in the database: ", err);
    }
  }, [cart]);

  return (
    <div className="checkout">
      <Navbar />
      <h1>Checkout</h1>
      <div className="cart-items-wrapper"> 
        <div className="cart-items">
          {cart.items.map(item => (
            <CheckoutItem
              key={item.productId}
              item={item}
              handleRemoveItem={handleRemoveItem}
              dispatch={dispatch}
              formattedPrice={formattedPrice}
            />
          ))}
        </div>
        <div className="total">
          <h2>Total: {formattedPrice(total)}</h2>
        </div>
        <button 
          className="checkout-payment-button" 
          onClick={handleCheckoutPayment}
          aria-label="Proceed to Payment"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;