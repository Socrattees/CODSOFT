import React, { useEffect, useState } from 'react';
import './checkout-item.css';

const CheckoutItem = ({ item, handleRemoveItem, formattedPrice, dispatch }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  // Function to handle quantity change and update the quantity in the context
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { product: item, quantity: newQuantity }
      });
    } else {
      setQuantity(1);
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { product: item, quantity: 1 }
      });
    }
  };

  // useEffect to update the quantity in the cart when change is made outside the component
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <div className="checkout-item">
      <img
        src={ process.env.REACT_APP_PRODUCTS_FOLDER + item.image}
        alt={item.name}
        className="checkout-item-image"
      />
      <div className="checkout-item-details">
        <h4 className="checkout-item-name">{item.name}</h4>
        <p className="checkout-item-price">{ formattedPrice(item.price) }</p>
      </div>
      <div className="checkout-item-quantity">
        <span className="checkout-item-quantity-title">Quantity: </span>
        <input 
          className="checkout-item-quantity-value" 
          type="number" 
          value={quantity} 
          onChange={handleQuantityChange} 
        />
      </div>
      <span className="checkout-item-total">
        { formattedPrice(item.price * quantity) }
      </span>
      <button
        className="checkout-item-remove"
        onClick={() => handleRemoveItem(item.productId)}>Remove</button>
    </div>
  );
};

export default CheckoutItem;