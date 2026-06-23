import React, { useEffect, useState } from "react";

function Invoices({ dark }) {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    const res = await fetch("http://localhost:5000/api/invoices");
    const data = await res.json();
    setInvoices(data);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const totalRevenue = invoices.reduce((a, i) => a + i.total, 0);

  return (
    <div style={dark ? darkPage : lightPage}>

      <h2>Invoices</h2>

      <div style={kpi}>
        <div>Total Invoices: {invoices.length}</div>
        <div>Total Revenue: ₹{totalRevenue}</div>
      </div>

      <div style={grid}>

        {invoices.map((i) => (
          <div key={i._id} style={card(dark)}>

            <h3>{i.invoiceNo}</h3>

            <p>Product: {i.productName}</p>
            <p>Qty: {i.quantity}</p>

            <p>Price: ₹{i.price}</p>

            <h4 style={{ color: "#22c55e" }}>
              Total: ₹{i.total}
            </h4>

            <p style={{ fontSize: "12px", opacity: 0.6 }}>
              {new Date(i.createdAt).toLocaleString()}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

/* styles */
const lightPage = {
  padding: "20px",
  background: "#f4f6f9",
  minHeight: "100vh",
};

const darkPage = {
  padding: "20px",
  background: "#0f172a",
  color: "white",
  minHeight: "100vh",
};

const kpi = {
  display: "flex",
  gap: "15px",
  marginBottom: "20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "15px",
};

const card = (dark) => ({
  background: dark ? "#1e293b" : "white",
  padding: "15px",
  borderRadius: "12px",
});

export default Invoices;