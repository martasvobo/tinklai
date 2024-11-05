const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  if (connection) {
    connection.release();
  }
});

pool.query(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
  )
`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Users table checked/created successfully");
    }
  }
);

pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
  )
`);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await pool
      .promise()
      .query("INSERT INTO users (username, password) VALUES (?, ?)", [
        username,
        hashedPassword,
      ]);

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error registering user:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Username already exists" });
    }

    res.status(500).json({ message: "Error registering user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
