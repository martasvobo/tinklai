const db = require("../db.js");

exports.getAllPrekes = async () => {
  const [rows] = await db.execute("SELECT * FROM Preke");
  return rows;
};

exports.getPrekeById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM Preke WHERE id = ?", [id]);
  return rows[0];
};

exports.createPreke = async (pavadinimas, kaina, nuotrauka) => {
  const [result] = await db.execute(
    "INSERT INTO Preke (pavadinimas, kaina, nuotrauka) VALUES (?, ?, ?)",
    [pavadinimas, kaina, nuotrauka]
  );
  return result.insertId;
};

exports.updatePreke = async (id, pavadinimas, kaina, nuotrauka) => {
  await db.execute(
    "UPDATE Preke SET pavadinimas = ?, kaina = ?, nuotrauka = ? WHERE id = ?",
    [pavadinimas, kaina, nuotrauka, id]
  );
};

exports.deletePreke = async (id) => {
  await db.execute("DELETE FROM Preke WHERE id = ?", [id]);
};
