import React, { useEffect, useState } from 'react';
import './navbar-cart-item.css';

const NavbarCartItem = ({ item, handleRemoveItem, formattedPrice, dispatch }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  // Function to handle the change in quantity
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    } else {
      setQuantity(1);
    }
  };

  // useEffect to update the quantity in the cart
   useEffect(() => {
     dispatch({ type: "UPDATE_QUANTITY", payload: { product: item, quantity: quantity } });
     // eslint-disable-next-line
   }, [quantity, dispatch, item.productId]);

   /* useEffect to update the quantity in the cart
      when change is made outside the component */
    useEffect(() => {
      setQuantity(item.quantity);
    }, [item.quantity]);

  return (
    <div className="navbar-cart-item" role="listitem">
      <img
        src={ process.env.REACT_APP_PRODUCTS_FOLDER + item.image}
        alt={item.name}
        className="navbar-cart-item-image"
      />
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
            aria-label={`Quantity of ${item.name}`}
          />
        </div>
        <button 
          className="navbar-cart-item-remove" 
          onClick={() => handleRemoveItem(item.productId)}
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default NavbarCartItem;
