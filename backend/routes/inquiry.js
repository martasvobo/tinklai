const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { message, userId } = req.body;
    const query =
      "INSERT INTO Uzklausa (klausimas, vartotojas_id) VALUES (?, ?)";
    const [result] = await db.execute(query, [message, userId]);

    res.status(201).json({
      success: true,
      message: "Klausimas sukurtas sėkmingai",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Nepavyko sukurti klausimo",
      error: error.message,
    });
  }
});

router.put("/answer/:id", async (req, res) => {
  try {
    const { answer, id } = req.body;

    const query = "UPDATE Uzklausa SET atsakymas = ? WHERE id = ?";
    const [result] = await db.execute(query, [answer, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Klausimas nerastas",
      });
    }

    res.json({
      success: true,
      message: "Atsakyta sėkmingai",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Nepavyko atsakyti",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId, userType } = req.query;
    let query = "SELECT * FROM Uzklausa";
    let params = [];

    if (userType !== "pardavejas") {
      query += " WHERE vartotojas_id = ?";
      params = [userId];
    }

    const [results] = await db.execute(query, params);

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Nepavyko gauti užklausų",
      error: error.message,
    });
  }
});

module.exports = router;
