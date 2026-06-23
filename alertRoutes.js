const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// ⚠ GET ALERTS (LOW STOCK + CRITICAL)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    const lowStock = products.filter((p) => p.quantity < 10);

    const criticalStock = products.filter((p) => p.quantity <= 5);

    res.json({
      lowStock,
      criticalStock,
      totalProducts: products.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Alert error" });
  }
});

module.exports = router;