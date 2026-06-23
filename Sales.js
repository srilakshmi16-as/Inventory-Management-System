import React, { useEffect, useState } from "react";

function Sales({ dark }) {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    const res = await fetch("http://localhost:5000/api/sales");
    const data = await res.json();
    setSales(data);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const totalRevenue = sales.reduce((a, s) => a + s.total, 0);

  return (
    <div style={dark ? darkPage : lightPage}>

      <h2>Sales History</h2>

      <div style={kpi}>
        <div>Total Sales: {sales.length}</div>
        <div>Total Revenue: ₹{totalRevenue}</div>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((s) => (
            <tr key={s._id}>
              <td>{s.productName}</td>
              <td>{s.quantity}</td>
              <td>₹{s.price}</td>
              <td>₹{s.total}</td>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

const darkPage = {
  padding: "20px",
  background: "#0f172a",
  color: "white",
  minHeight: "100vh",
};

const lightPage = {
  padding: "20px",
  background: "#f4f6f9",
  minHeight: "100vh",
};

const kpi = {
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

export default Sales;