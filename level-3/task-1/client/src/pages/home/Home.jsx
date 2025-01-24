import React from 'react';
import './home.css';
import { useState, useEffect } from 'react';
//import gamingProducts from '../../dummy-data';
import Navbar from '../../components/navbar/Navbar';
import ProductCatalog from '../../components/productCatalog/ProductCatalog';
import { getAllProductsCall } from '../../apiCalls';

/* Home page that displays a welcome message and products */

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // useEffect to get all products when the component mounts
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

  // useEffect to get all categories when products state updates
  useEffect(() => {
    if (products) {
      // Get all categories from the products and flatten the array to prevent nested arrays
      const categories = products.map(product => product.categories).flat();
      setCategories([...new Set(categories)].sort());
    }
  }, [products]);

  //console.log(categories);

  return (
    <div className="home">
      <Navbar />
      <div className="header-message">
        <h1>Welcome</h1>
        <h1>to</h1>
        <h1>Victory Vault!</h1>
      </div>
      { categories.map(category => (
        <ProductCatalog products={products} key={category} category={category} />
      )) }
    </div>
  );
};

export default Home;