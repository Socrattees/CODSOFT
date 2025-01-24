import express from 'express';
import User from '../models/User.js';
import Address from '../models/Address.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Login a registered user
router.post('/login', async (req, res) => {
  const reqData = req.body;
  try {
    const user = await User.findOne({ username: reqData.username });
    if (!user) {
      res.status(400).json("Wrong username or password!");
    }
    const validPassword = await bcrypt.compare(reqData.password, user.password);
    if (!validPassword) {
      res.status(400).json("Wrong username or password!");
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Register a new user
router.post('/', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const reqData = req.body;
  const hashedPassword = await bcrypt.hash(reqData.password, salt);
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
      firstName: reqData.firstName,
      surname: reqData.surname,
      email: reqData.email,
      password: hashedPassword,
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