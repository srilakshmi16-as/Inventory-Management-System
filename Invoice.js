const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNo: String,
    productName: String,
    quantity: Number,
    price: Number,
    total: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);