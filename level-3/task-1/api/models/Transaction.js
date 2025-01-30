import mongoose from 'mongoose';
import Cart from './Cart.js';
import Address from './Address.js';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: Address.schema,
    required: true,
  },
  cart: {
    type: Cart.schema,
    required: true,
  },
  paymentMethod: {
    cardHolderName: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    cardExpiryDate: {
      type: String,
      required: true,
    },
    cardCvv: {
      type: String,
      required: true,
    },
  },
  total: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);