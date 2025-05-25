const Product=require("../model/productSchema");
const AddProduct=async (req,res)=>{
    try {
        const { productName, productImage, onSale, starCount, ratingCount, price, color, ram } = req.body;
        console.log(req.body);
        if (!productName || !productImage || !price || !color || !ram) {
          return res.status(400).json({ message: "All required fields must be provided." });
        }
    
        const newProduct = new Product({
          productName,
          productImage,
          onSale,
          starCount,
          ratingCount,
          price,
          color,
          RAM:ram,
        });
    
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully!", product: newProduct });
      } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } 
}

const GetProduct = async (req, res) => {
  try {
    // Fetch products where onSale is true
    const allProduct = await Product.find({  });
    console.log(allProduct);
    res.status(200).json({ success: true, products: allProduct });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const DeleteProduct = async (req, res) => {
  const { id } = req.params;
console.log(id);

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
console.log(deletedProduct);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully.", product: deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


module.exports={AddProduct,GetProduct,DeleteProduct};