// const express = require("express");
// const cors = require("cors");
// const sql = require("mssql");

// const app = express();
// const PORT = process.env.PORT || 8080;

// // Detect the correct URL (Deployed or Local)
// const DEPLOYED_URL = process.env.VERCEL_URL  ? `https://${process.env.VERCEL_URL}`
//   : `http://localhost:${PORT}`;

// app.use(cors());

// // MSSQL Configuration
// const dbConfig = {
//   server: process.env.DB_SERVER || "LV-LAP-103",
//   user: process.env.DB_USER || "sa",
//   password: process.env.DB_PASSWORD || "Password@123",
//   database: process.env.DB_NAME || "DesignSystem",
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//     port: 1433,
//   },
// };

// // Connect to MSSQL
// sql
//   .connect(dbConfig)
//   .then(() => {
//     console.log("✅ Connected to the database");
//     console.log(`🌍 Backend is live at: ${DEPLOYED_URL}`);
//   })
//   .catch((err) => {
//     console.error("❌ Database connection failed:", err);
//   });

// app.get("/", async (req, res) => {
//   try {
//     const result = await sql.query`SELECT * FROM Employees`;
//     res.json(result.recordset);
//   } catch (err) {
//     console.error("❌ Error querying the database:", err);
//     res.status(500).send("Server error");
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server started at: ${DEPLOYED_URL}`);
// });

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 8080;

// Detect the correct URL (Deployed or Local)
const DEPLOYED_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${PORT}`;

app.use(cors());

// Mock API route using JSONPlaceholder
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    res.json(response.data);
  } catch (err) {
    console.error("❌ Error fetching mock data:", err);
    res.status(500).send("Server error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Mock server started at: ${DEPLOYED_URL}`);
});
