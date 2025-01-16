import React from 'react';
import './product-catalog-card.css';

const ProductCatalogCard = ({ product }) => {
  const stockValue = () => {
    if (product.stock >= 10) {
      return "In stock";
    } else if (product.stock > 0) {
      return "In stock: " + product.stock;
    } else {
      return "Out of stock";
    }
  }

  return (
    <div className="product-card">
      <img src={product.image || "/broken-image.png"} alt={product.name} className="product-image" />
      <div className="product-details">
        <h2 className="product-name">{ product.name }</h2>
        <p className="product-description">{ product.description }</p>
        <p className="product-price">${ product.price }</p>
        <p className="product-stock">{ stockValue() }</p>
      </div>
    </div>
  );
};

export default ProductCatalogCard;