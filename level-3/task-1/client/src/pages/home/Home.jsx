import React from 'react';
import './home.css';
import gamingProducts from '../../dummy-data';
import Navbar from '../../components/navbar/Navbar';
import ProductCatalog from '../../components/productCatalog/ProductCatalog';

/* Home page that displays a welcome message and products */

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="header-message">
        <h1>Welcome</h1>
        <h1>to</h1>
        <h1>Victory Vault!</h1>
      </div>
      <ProductCatalog dummyProducts={ gamingProducts } />
    </div>
  );
};

export default Home;