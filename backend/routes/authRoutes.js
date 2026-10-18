import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });

    res.status(201).json({
      message: "Registration successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Check email and password credentials
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Verify user exists and password matches
    if (user && (await user.matchPassword(password))) {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return res.status(500).json({ message: "JWT_SECRET is not configured" });
      }

      const token = jwt.sign(
        { sub: user._id.toString() },
        secret,
        { expiresIn: "7d" },
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/admin", async (req, res) => {
  const { password } = req.body;

  try {
    if (password !== process.env.admin_ps) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid password" });
    }

    const users = await User.find({}).select("username -_id");
    const usernames = users.map((u) => u.username);

    return res.status(200).json({
      message: "Admin access granted",
      count: usernames.length,
      usernames: usernames,
    });
  } catch (error) {
    console.error("Admin route error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export default router;
