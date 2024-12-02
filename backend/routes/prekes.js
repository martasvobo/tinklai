const express = require("express");
const {
  getAllPrekes,
  getPrekeById,
  createPreke,
  updatePreke,
  deletePreke,
} = require("../controllers/prekeController");

const router = express.Router();

router.get("/", getAllPrekes);
router.get("/:id", getPrekeById);
router.post("/", createPreke);
router.put("/:id",  updatePreke);
router.delete("/:id", deletePreke);

module.exports = router;
