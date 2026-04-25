const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Order = require("./models/Order");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("FoodRush API Running");
});

app.get("/api/menu", (req, res) => {
  res.json([
    { name: "Burger", price: 149 },
    { name: "Pizza", price: 299 },
    { name: "Pasta", price: 199 },
    { name: "Biryani", price: 249 }
  ]);
});

app.post("/api/order", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order" });
  }
});

app.get("/api/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});