import React from 'react';
import './product-catalog.css';
import ProductCatalogCard from '../productCatalogCard/ProductCatalogCard.jsx';

const ProductCatalog = ({ products }) => {
  return (
    <div className="product-catalog">
      <h1>Product Catalog</h1>
      <div className="products">
        { products.map(product => (
          <ProductCatalogCard key={product._id} product={product} />
        )) }
      </div>
    </div>
  );
};

export default ProductCatalog;