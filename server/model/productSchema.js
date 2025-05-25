const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  starCount: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  RAM: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

module.exports=Product;
