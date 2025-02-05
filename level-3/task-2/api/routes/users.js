import express from "express";
import User from "../models/User.js";

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

export default router;