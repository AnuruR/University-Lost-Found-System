import express from "express";
import Goods from "../models/Goods.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { Topic, description } = req.body;
  try {
    const goods = await Goods.create({ Topic, description, reporter: req.user._id });
    res.status(201).json({
      message: "Report successful",
      user: {
        _id: goods._id,
        Topic: goods.Topic,
        description: goods.description,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;