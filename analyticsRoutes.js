const express = require("express");
const router = express.Router();

const Sale = require("../models/Sale");

// 📊 FULL ANALYTICS SUMMARY
router.get("/summary", async (req, res) => {
  try {
    const sales = await Sale.find();

    const totalSales = sales.length;

    const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);

    const productMap = {};

    sales.forEach((s) => {
      productMap[s.productName] =
        (productMap[s.productName] || 0) + s.quantity;
    });

    const topProduct =
      Object.keys(productMap).sort(
        (a, b) => productMap[b] - productMap[a]
      )[0] || "N/A";

    res.json({
      totalSales,
      totalRevenue,
      topProduct,
    });
  } catch (err) {
    res.status(500).json({ message: "Analytics error" });
  }
});

module.exports = router;