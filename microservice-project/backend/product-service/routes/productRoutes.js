import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
router.post("/", protect, async (req, res) => {
  const product = await Product.create({ ...req.body, owner: req.user.id });
  res.status(201).json(product);
});
router.delete("/:id", protect, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
