const express = require("express");
const { AddProduct,GetProduct,DeleteProduct } = require("../controllers/productController");
const router = express.Router();

router.post('/',AddProduct);
router.get('/',GetProduct);
router.delete('/:id',DeleteProduct);

module.exports=router;