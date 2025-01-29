import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const router = express.Router();

// Check if cart products still exist
router.post("/exist", async (req, res) => {
  try {
    const cart = req.body;
    if (!cart) {
      return res.status(404).json("Cart not found");
    }
    const cartProducts = cart.items;
    const products = await Product.find();
    const unavailableProducts = cartProducts.filter((cartProduct) => {
      return !products.find((product) => {
        return product._id.toString() === cartProduct.productId.toString();
      });
    });
    res.status(200).json(unavailableProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error checking cart products availability");
  }
});

// Check if cart products are in stock
router.post("/stock-check", async (req, res) => {
  try {
    const cart = req.body;
    if (!cart) {
      return res.status(404).json("Cart not found");
    }
    const cartProducts = cart.items;
    const products = await Product.find();

    // First finds products that are both in db and have lower stock than requested quantity
    const unavailableProducts = cartProducts.filter((cartProduct) => {
      const product = products.find((product) =>
        product._id.toString() === cartProduct.productId.toString());
      return product && product.stock < cartProduct.quantity;
    });

    // Loops through problematic products and returns new array to be used in client
    const result = unavailableProducts.map((cartProduct) => {
      const product = products.find((product) =>
        product._id.toString() === cartProduct.productId.toString());
      return {
        productId: cartProduct.productId,
        availableStock: product.stock,
      };
    });      

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error checking cart products stock");
  }
});

export default router;