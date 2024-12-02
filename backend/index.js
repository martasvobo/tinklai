const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db");
const prekesRoutes = require("./routes/prekes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/prekes", prekesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
