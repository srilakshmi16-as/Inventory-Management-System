const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    productId: String,
    productName: String,
    quantity: Number,
    price: Number,
    total: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);