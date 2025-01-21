import axios from "axios";

// Get all products
export const getAllProductsCall = async () => {
  try {
    const response = await axios.get("/api/products");
    return response.data;
  } catch (err) {
    return console.error("Error in retrieving data of all products: ", err);
  }
};

// Get products by search query
export const getProductsBySearchCall = async (search) => {
  try {
    const response = await axios.get(`/api/products/search/search-results?q=${search}`);
    return response.data;
  } catch (err) {
    return console.error("Error in retrieving data of products by search query: ", err);
  }
}