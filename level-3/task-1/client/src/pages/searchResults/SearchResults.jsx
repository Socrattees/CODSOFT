import React, { useEffect } from 'react';
import { useState } from 'react';
import './search-results.css';
import Navbar from '../../components/navbar/Navbar';
import { getProductsBySearchCall } from '../../apiCalls';
import ProductCatalogCard from '../../components/productCatalogCard/ProductCatalogCard';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('q');
  const [products, setProducts] = useState([]);

  // useEffect to fetch products using the search query
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProductsBySearchCall(search);
        setProducts(res);
      } catch (err) {
        console.error("Error in fetching products by search query: ", err);
      }
    };
    fetchProducts();
  }, [search]);

  return (
    <div className="search-results">
      <Navbar />
      <h1>Search Results</h1>
      <div 
        className={ products.length > 0 ? "search-results-list" : "search-results-no-list" }
        aria-live="polite"
        aria-atomic="true"
      >
        { products.length > 0 ? (
          products.map((product) => (
            <ProductCatalogCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found for your search.</p>
        ) }
      </div>
    </div>
  );
};

export default SearchResults;