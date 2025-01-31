import express from 'express';
import User from '../models/User.js';
import Address from '../models/Address.js';

const router = express.Router();

// Get user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update user details
router.put('/update/:id', async (req, res) => {
  try {
    // Destructure address from req.body
    const { address, ...userData } = req.body;

    // Update the user without the address field
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: userData,
    }, { new: true });

    // Update the address separately in the Address collection
    if (address) {
      const updatedAddress = await Address.findByIdAndUpdate(updatedUser.address._id, {
        $set: address,
      }, { new: true });
      updatedUser.address = updatedAddress;
    }

    await updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;