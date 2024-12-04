const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const [existingUser] = await pool.query(
      "SELECT * FROM Vartotojas WHERE vardas = ?",
      [username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Vartotojas jau egzistuoja" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO Vartotojas (tipas, vardas, slapazodis) VALUES (?, ?, ?)",
      ["klientas", username, hashedPassword]
    );

    res.status(201).json({
      message: "Vartotojas sukurtas",
      user: {
        id: result.insertId,
        tipas: "klientas",
        vardas: username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverio klaida" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const [users] = await pool.query(
      "SELECT * FROM Vartotojas WHERE vardas = ?",
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Netinkamas prisijungimas" });
    }

    const user = users[0];

    const validPassword = await bcrypt.compare(password, user.slapazodis);

    if (!validPassword) {
      return res.status(401).json({ message: "Netinkamas prisijungimas" });
    }

    res.json({
      message: "Sėkmingas prisijungimas",
      user: {
        id: user.id,
        tipas: user.tipas,
        vardas: user.vardas,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverio klaida" });
  }
});

module.exports = router;
