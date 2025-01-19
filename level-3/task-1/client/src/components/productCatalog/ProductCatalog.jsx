import React from 'react';
import './product-catalog.css';
import ProductCatalogCard from '../productCatalogCard/ProductCatalogCard.jsx';

const ProductCatalog = ({ products, category }) => {
  // Filter products by category, if a category is given
  if (category) {
    products = products.filter(product => product.categories.includes(category));
  }

  return (
    <div className="product-catalog">
      <h2>{ category }</h2>
      <div className="products">
        { products.map(product => (
          <ProductCatalogCard key={product._id} product={product} />
        )) }
      </div>
    </div>
  );
};

export default ProductCatalog;