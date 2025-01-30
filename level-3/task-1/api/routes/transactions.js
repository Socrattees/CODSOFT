import express from 'express';
import User from '../models/User.js';
import Cart from '../models/Cart.js';
import Transaction from '../models/Transaction.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Create a transaction
router.post('/', async (req, res) => {
  const salt = await bcrypt.genSalt(10);

  try {
    const user = await User.findOne({ username: req.body.username });
    const cart = await Cart.findOne({ userId: user._id });
    const newTransaction = new Transaction({
      userId: user._id,
      username: user.username,
      email: user.email,
      address: user.address,
      cart: cart,
      paymentMethod: req.body.paymentMethod,
      total: req.body.total
    });
    newTransaction.paymentMethod.cardNumber = await bcrypt.hash(newTransaction.paymentMethod.cardNumber, salt);
    newTransaction.paymentMethod.cardCvv = await bcrypt.hash(newTransaction.paymentMethod.cardCvv, salt);
    const transaction = await newTransaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all transactions of a user by userId
router.get('/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router;