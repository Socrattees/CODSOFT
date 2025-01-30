import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// Route to create a new message
router.post('/', async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;