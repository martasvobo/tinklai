const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: 'mysql',
  user: 'user',
  password: 'userpassword',
  database: 'myapp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
