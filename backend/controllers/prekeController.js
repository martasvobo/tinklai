const Preke = require("../models/Preke");

exports.getAllPrekes = async (req, res) => {
  try {
    const prekes = await Preke.getAllPrekes();
    res.json(prekes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPrekeById = async (req, res) => {
  try {
    const preke = await Preke.getPrekeById(req.params.id);
    if (!preke) {
      return res.status(404).json({ error: "Preke nerasta" });
    }
    res.json(preke);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPreke = async (req, res) => {
  try {
    const { pavadinimas, kaina } = req.body;
    const nuotrauka = req.file ? req.file.buffer : null;
    const id = await Preke.createPreke(pavadinimas, kaina, nuotrauka);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePreke = async (req, res) => {
  try {
    const { pavadinimas, kaina } = req.body;
    const nuotrauka = req.file ? req.file.buffer : null;
    await Preke.updatePreke(req.params.id, pavadinimas, kaina, nuotrauka);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePreke = async (req, res) => {
  try {
    await Preke.deletePreke(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
