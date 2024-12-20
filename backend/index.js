const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const inquiryRoutes = require("./routes/inquiry");
const cartRoutes = require("./routes/cartItem");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
