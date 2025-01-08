const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost", // Your MySQL host
  user: "root", // Your MySQL username
  password: "", // Your MySQL password
  database: "arkmind_assessment", // Your database name
});

// Test MySQL connection
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database.");
});

// API Routes

// Get all items
app.get("/api/items", (req, res) => {
  const query = "SELECT * FROM items";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Create an item
app.post("/api/items", (req, res) => {
  const { name, description, price } = req.body;
  const query = "INSERT INTO items (name, description, price) VALUES (?, ?, ?)";
  db.query(query, [name, description, price], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, description, price });
  });
});

// Delete an item
app.delete("/api/items/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM items WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
