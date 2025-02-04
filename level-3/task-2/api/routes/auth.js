import express from "express";
import User from "../model/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let role = "user";
    const validRoles = ["admin", "manager", "user"];
    if (req.body.role && validRoles.includes(req.body.role)) {
      role = req.body.role;
    }

    const newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      surname: req.body.surname,
      email: req.body.email,
      password: hashedPassword,
      role
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find admin
router.get("/findAdmin", async (req, res) => {
  try {
    const admin = await User.findOne({ role: "admin" });
    if (admin) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;