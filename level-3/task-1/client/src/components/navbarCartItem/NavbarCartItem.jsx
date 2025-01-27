import React, { useState } from 'react';
import './navbar-cart-item.css';

const NavbarCartItem = ({ item, removeItem, formattedPrice }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    } else {
      setQuantity(1);
    }
  };

  return (
    <div className="navbar-cart-item">
      <img src={ process.env.REACT_APP_PRODUCTS_FOLDER + item.image} alt={item.name} className="navbar-cart-item-image" />
      <div className="navbar-cart-item-details">
        <h4 className="navbar-cart-item-name">{item.name}</h4>
        <p className="navbar-cart-item-price">{ formattedPrice(item.price) }</p>
        <div className="navbar-cart-item-quantity">
          <span className="navbar-cart-item-quantity-title">Quantity: </span>
          <input 
            className="navbar-cart-item-quantity-value" 
            type="number" 
            value={quantity} 
            onChange={handleQuantityChange} 
          />
        </div>
        <button className="navbar-cart-item-remove" onClick={() => removeItem(item.productId)}>Remove</button>
      </div>
    </div>
  );
};

export default NavbarCartItem;
