import express from 'express';
import User from '../models/User.js';
import Address from '../models/Address.js';

const router = express.Router();

// Register a new user
router.post('/', async (req, res) => {
  const reqData = req.body;
  const address = new Address({
    streetAddress: reqData.streetAddress,
    suburb: reqData.suburb,
    city: reqData.city,
    province: reqData.province,
    postalCode: reqData.postalCode,
    country: reqData.country
  });
  try {
    const user = new User({
      username: reqData.username,
      firstname: reqData.firstname,
      surname: reqData.surname,
      email: reqData.email,
      password: reqData.password,
      dateOfBirth: reqData.dateOfBirth,
      address: address
    });
    address.userId = user._id;
    user.address = address;
    await address.save();
    const savedUser = await user.save(); 
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;