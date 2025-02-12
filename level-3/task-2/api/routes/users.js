import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Get all users besides admin
router.get("/", async (req, res) => {
  try {
    // Find all users that are not admins and remove passwords
    const users = await User.find({ role: { $ne: "admin" } }).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user by id
router.get("/:id", async (req, res) => {
  try {
    // Find user by id and remove password
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get number of users besides admin
router.get("/count", async (req, res) => {
  try {
    // Count all users that are not admins
    const count = await User.countDocuments({ role: { $ne: "admin" } });
    res.status(200).json(count);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Check if username is unique
router.post("/check-username", async (req, res) => {
  try {
    // Check if username is unique
    const user = await User.findOne({ username: req.body.username });
    res.status(200).json(user ? false : true);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Check if email is unique
router.post("/check-email", async (req, res) => {
  try {
    // Check if email is unique
    const user = await User.findOne({ email: req.body.email });
    res.status(200).json(user ? false : true);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update user
router.put("/update/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update profile
router.put("/update-profile/:id", async (req, res) => {
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, { new: true });
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete user
router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;