// server.js
const express = require("express");
const app = express();

let products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 19.99,
    description: "A smooth and responsive wireless mouse.",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 89.99,
    description: "A durable keyboard with tactile feedback.",
  },
  {
    id: 3,
    name: "Noise-Canceling Headphones",
    price: 129.99,
    description: "Headphones with superior noise cancellation.",
  },
];
let currentId = 4; // Adjusted to ensure unique IDs for new products

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Create a new product
app.post("/api/products", (req, res) => {
  const product = {
    id: currentId++,
    name: req.body.name,
    price: parseFloat(req.body.price),
    description: req.body.description,
  };
  products.push(product);
  res.json(product);
});

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Delete a product
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    res.json({ message: "Product deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
