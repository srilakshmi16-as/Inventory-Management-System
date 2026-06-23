const express = require("express");
const router = express.Router();

const Sale = require("../models/Sale");
const Product = require("../models/Product");
const Invoice = require("../models/Invoice");

// 🟢 CREATE SALE + AUTO INVOICE
router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    // reduce stock
    product.quantity -= quantity;
    await product.save();

    // create sale
    const sale = await Sale.create({
      productId,
      productName: product.name,
      quantity,
      price: product.price,
      total: product.price * quantity,
    });

    // 🧾 AUTO CREATE INVOICE (NEW FEATURE)
    const invoice = await Invoice.create({
      invoiceNo: "INV-" + Date.now(),
      productName: product.name,
      quantity,
      price: product.price,
      total: product.price * quantity,
    });

    res.json({
      sale,
      invoice,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟢 GET SALES
router.get("/", async (req, res) => {
  const sales = await Sale.find().sort({ createdAt: -1 });
  res.json(sales);
});

module.exports = router;