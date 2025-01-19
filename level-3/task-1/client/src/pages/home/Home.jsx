import React from 'react';
import './home.css';
import { useState, useEffect } from 'react';
//import gamingProducts from '../../dummy-data';
import Navbar from '../../components/navbar/Navbar';
import ProductCatalog from '../../components/productCatalog/ProductCatalog';
import { getAllProductsCall } from '../../apiCalls';

/* Home page that displays a welcome message and products */

const Home = () => {
  // Fetch all products from the database
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await getAllProductsCall();
        setProducts(res);
      } catch (err) {
        console.error("Error in getAllProducts(): ", err);
      }
    };
    getAllProducts();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="header-message">
        <h1>Welcome</h1>
        <h1>to</h1>
        <h1>Victory Vault!</h1>
      </div>
      <ProductCatalog products={products} />
    </div>
  );
};

export default Home;