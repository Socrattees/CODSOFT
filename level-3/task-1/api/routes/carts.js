import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// Create a cart
router.post("/", async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    return res.status(200).json(savedCart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Get cart by userId
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update cart by userId
router.put("/update/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json("Cart not found");
    }

    console.log("Cart before update:", cart);
    console.log("Request body:", req.body);

    const updatedCart = await Cart.findByIdAndUpdate(cart._id, {
      $set: req.body
    }, { new: true });

    console.log("Cart after update:", updatedCart);

    return res.status(200).json("Cart has been updated");
  } catch (err) {
    console.error("Error updating cart:", err);
    return res.status(500).json(err);
  }
});


// Delete cart by userId
router.delete("/delete/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    await Cart.findByIdAndDelete(cart._id);
    return res.status(200).json("Cart has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;