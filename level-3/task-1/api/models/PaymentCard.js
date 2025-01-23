import mongoose from "mongoose";
import Address from "./Address";

const paymentMethodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
    trim: true
  },
  cardHolderName: {
    type: String,
    required: true,
    trim: true
  },
  expiryDate: {
    type: String,
    required: true,
    trim: true
  },
  cvv: {
    type: String,
    required: true,
    trim: true
  },
  billingAddress: {
    type: Address.schema,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("PaymentMethod", paymentMethodSchema);;
