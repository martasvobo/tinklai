const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const checkQuery =
      "SELECT id, kiekis FROM Krepselio_preke WHERE vartotojas_id = ? AND preke_id = ?";
    const [existing] = await db.execute(checkQuery, [userId, itemId]);

    if (existing.length > 0) {
      const updateQuery =
        "UPDATE Krepselio_preke SET kiekis = kiekis + ? WHERE id = ?";
      await db.execute(updateQuery, [1, existing[0].id]);
      res.json({ message: "Cart item quantity updated", id: existing[0].id });
    } else {
      const insertQuery =
        "INSERT INTO Krepselio_preke (vartotojas_id, preke_id, kiekis) VALUES (?, ?, ?)";
      const [result] = await db.execute(insertQuery, [userId, itemId, 1]);
      res
        .status(201)
        .json({ message: "Item added to cart", id: result.insertId });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const query = `
            SELECT kp.*, p.pavadinimas, p.kaina 
            FROM Krepselio_preke kp
            JOIN Preke p ON kp.preke_id = p.id
            WHERE kp.vartotojas_id = ?
        `;
    const [items] = await db.execute(query, [userId]);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const query = "DELETE FROM Krepselio_preke WHERE id = ?";
    await db.execute(query, [itemId]);
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/order/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const cartQuery = `
            SELECT kp.kiekis, p.id as preke_id, p.kaina
            FROM Krepselio_preke kp
            JOIN Preke p ON kp.preke_id = p.id
            WHERE kp.vartotojas_id = ?
        `;
    const [cartItems] = await db.execute(cartQuery, [userId]);

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const kainos = cartItems.map((item) => item.kaina.toFixed(2)).join(",");
    const kiekiai = cartItems.map((item) => item.kiekis).join(",");
    const prekes = cartItems.map((item) => item.preke_id).join(",");

    let suma = cartItems.reduce(
      (acc, item) => acc + item.kaina * item.kiekis,
      0
    );
    suma = suma.toFixed(2);

    const createOrderQuery =
      "INSERT INTO Uzsakymas (vartotojas_id, kainos, kiekiai, prekes, suma) VALUES (?, ?, ?, ?, ?)";
    const [orderResult] = await db.execute(createOrderQuery, [
      userId,
      kainos,
      kiekiai,
      prekes,
      suma,
    ]);

    const clearCartQuery =
      "DELETE FROM Krepselio_preke WHERE vartotojas_id = ?";
    await db.execute(clearCartQuery, [userId]);

    res.status(201).json({
      message: "Order created successfully",
      orderId: orderResult.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
