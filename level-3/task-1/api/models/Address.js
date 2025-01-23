import mongoose from "mongoose";
import User from "./User.js";

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  streetAddress: {
    type: String,
    required: true,
    trim: true
  },
  suburb: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  province: {
    type: String,
    required: true,
    trim: true
  },
  postalCode: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

export default mongoose.model("Address", addressSchema);