import React, { useState, useEffect, useContext } from 'react';
import './product-catalog-card.css';
import { UserContext } from '../../context/UserContext';

/* Product catalog card component that displays product details
in the Product Catalog component */

const ProductCatalogCard = ({ product }) => {
  const [stockClass, setStockClass] = useState(""); // State to store the class name for the stock value
  const [stockText, setStockText] = useState(""); // State to store the stock value
  const {user, cart, dispatch } = useContext(UserContext);
  const [isGuest, setIsGuest] = useState(true);

  // Function to format the price value
  const formattedPrice = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0
  }).format(product.price || 0);

  // Function to add a product to the cart
  const handleAddToCart = () => {
    const foundItem = cart.items.find((item) => item.productId === product._id);
    // If the product is already in the cart, update the quantity by 1
    if (foundItem) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { product: foundItem, quantity: foundItem.quantity + 1 }
      });
    } else {
      // If the product is not in the cart, add it to the cart with a quantity of 1
      const newCartItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      }
      dispatch({ type: "ADD_TO_CART", payload: newCartItem });
    }
  }

  // useEffect hook to update the stock text and class to display
  useEffect(() => {
    // Function to determine the text to display, based on the stock value
    const updateStockValue = () => {
      if (product.stock > 10) {
        setStockClass("in-stock");
        setStockText("In stock");
      } else if (product.stock > 0) {
        setStockClass("low-stock");
        setStockText("In stock: " + product.stock);
      } else {
        setStockClass("out-of-stock");
        setStockText("Out of stock");
      }
    }
    updateStockValue();
  }, [product.stock]);

  // useEffect to check if the user is a guest
  useEffect(() => {
    console.log(user);
    if (user) {
      setIsGuest(false);
    }
  }
  , [user]);

  console.log(isGuest);

  return (
    <div className="product-catalog-card" aria-label={`Product card for ${product.name}`}>
      <div className="product-catalog-card-content-wrapper">
        <div className="product-catalog-card-image-wrapper">
          <img
            src={ process.env.REACT_APP_PRODUCTS_FOLDER + (product.image || "/broken-image.png")}
            alt={product.name}
            className="product-catalog-card-image"
          />
        </div>
        <div className="product-catalog-card-details">
          <h2 className="product-catalog-card-title">{ product.name }</h2>
          <p className="product-catalog-card-description">{ product.description }</p>
          <p className="product-catalog-card-price">{ formattedPrice }</p>
          <p className={stockClass} aria-live="polite">{ stockText }</p>
        </div>
      </div>
      <button
        className="product-catalog-card-button"
        onClick={handleAddToCart}
        aria-label={`Add ${product.name} to cart`}
        disabled={isGuest}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCatalogCard;