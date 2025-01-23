import mongoose from "mongoose";
import Address from "./Address.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    type: Address.schema,
    required: true
  },
  paymentCard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentCard"
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
