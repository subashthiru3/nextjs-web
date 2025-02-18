const express = require("express");
const app = express();
const cors = require("cors");
const sql = require("mssql");
const PORT = 8080;

app.use(cors());

// MSSQL configuration
const dbConfig = {
  server: "LV-LAP-103",
  user: "sa",
  password: "Password@123",
  database: "DesignSystem",
  options: {
    encrypt: false, // Use this if you're connecting locally without SSL
    trustServerCertificate: true, // If you're using a self-signed certificate
    port: 1433,
  },
};

// Connect to MSSQL
sql
  .connect(dbConfig)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Database connection failed: ", err);
  });

app.get("/", async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Employees`;
    res.json(result.recordset);
  } catch (err) {
    console.error("Error querying the database: ", err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
