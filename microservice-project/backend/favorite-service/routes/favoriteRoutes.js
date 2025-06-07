import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import Favorite from "../models/Favorite.js";

const router = express.Router();

router.use(protect);
router.get("/", async (req, res) => {
  const favorites = await Favorite.find({ userId: req.user.id });
  res.json(favorites);
});
router.post("/", async (req, res) => {
  const { productId } = req.body;
  const exists = await Favorite.findOne({ userId: req.user.id, productId });

  if (exists) return res.status(400).json({ message: "Already favorited" });

  const favorite = await Favorite.create({ userId: req.user.id, productId });
  res.status(201).json(favorite);
});
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  await Favorite.findOneAndDelete({ userId: req.user.id, productId });
  res.json({ message: "Removed" });
});

export default router;
