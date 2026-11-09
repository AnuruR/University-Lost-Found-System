import express from "express";
import Goods from "../models/Goods.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [lostItems, foundItems] = await Promise.all([
      Goods.countDocuments({ Lost: true }),
      Goods.countDocuments({ Found: true }),
    ]);

    res.json({ lostItems, foundItems });
  } catch (error) {
    res.status(500).json({ message: "Unable to load item counts" });
  }
});

export default router;
