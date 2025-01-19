import React, { useState, useEffect } from 'react';
import './product-catalog-card.css';

/* Product catalog card component that displays product details
in the Product Catalog component */

const ProductCatalogCard = ({ product }) => {
  const [stockClass, setStockClass] = useState(""); // State to store the class name for the stock value
  const [stockText, setStockText] = useState(""); // State to store the stock value

  // Function to determine the text to display, based on the stock value

  useEffect(() => {
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

  return (
    <div className="product-catalog-card">
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
          <p className="product-catalog-card-price">R{ product.price }</p>
          <p className={stockClass}>{ stockText }</p>
        </div>
      </div>
      <button className="product-catalog-card-button">Add to Cart</button>
    </div>
  );
};

export default ProductCatalogCard;