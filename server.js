require("dns").setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// ================= ROUTES =================
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const alertRoutes = require("./routes/alertRoutes");

// ================= APP =================
const app = express();

// ================= DB =================
connectDB();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= API ROUTES =================
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/alerts", alertRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 Inventory Management System API Running...");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});