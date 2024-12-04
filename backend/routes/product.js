const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const [products] = await db.execute(
      "SELECT id, pavadinimas, kaina, nuotrauka FROM Preke"
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [product] = await db.execute("SELECT * FROM Preke WHERE id = ?", [
      req.params.id,
    ]);
    if (product.length > 0) {
      res.json(product[0]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { pavadinimas, kaina, nuotrauka } = req.body;

    const [result] = await db.execute(
      "INSERT INTO Preke (pavadinimas, kaina, nuotrauka) VALUES (?, ?, ?)",
      [pavadinimas, kaina, nuotrauka]
    );

    res.status(201).json({
      id: result.insertId,
      pavadinimas,
      kaina,
      nuotrauka,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { pavadinimas, kaina, nuotrauka } = req.body;

    await db.execute(
      "UPDATE Preke SET pavadinimas = ?, kaina = ?, nuotrauka = ? WHERE id = ?",
      [pavadinimas, kaina, nuotrauka, req.params.id]
    );

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM Preke WHERE id = ?", [req.params.id]);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
