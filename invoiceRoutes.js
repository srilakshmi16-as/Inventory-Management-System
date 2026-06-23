const express = require("express");
const router = express.Router();

const Invoice = require("../models/Invoice");

// 🟢 GET ALL INVOICES
router.get("/", async (req, res) => {
  const invoices = await Invoice.find().sort({ createdAt: -1 });
  res.json(invoices);
});

module.exports = router;