import express from 'express';
import Log from '../models/Log.js';

const router = express.Router();

// Get all logs
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;