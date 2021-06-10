import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// Description: Fetch all products
// Route: GET /api/products
// Access: Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// Description: Fetch a single product
// Route: GET /api/products/:id
// Access: Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Description: Delete a product
// Route: DELETE /api/products/:id
// Access: Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById, deleteProduct };
