import express from "express";
import Goods from "../models/Goods.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { Topic, description } = req.body;
  try {
    const goods = await Goods.create({ 
      Topic, 
      description,
      reporter: req.user._id,
      Lost: false,
      Found: true
    });
    
    res.status(201).json({
      message: "Found item reported successfully",
      user: {
        _id: goods._id,
        Topic: goods.Topic,
        description: goods.description,
        Lost: goods.Lost,
        Found: goods.Found
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;