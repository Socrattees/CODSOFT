import React from 'react';
import './product-catalog.css';
import ProductCatalogCard from '../productCatalogCard/ProductCatalogCard.jsx';

const ProductCatalog = ({ dummyProducts }) => {
  return (
    <div className="product-catalog">
      <h1>Product Catalog</h1>
      <div className="products">
        { dummyProducts.map(product => (
          <ProductCatalogCard key={product.id} product={product} />
        )) }
      </div>
    </div>
  );
};

export default ProductCatalog;