import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { contextProvider } from "../context/AppContext";

const CreateProduct = ({setAddProductModal}) => {
  const [onSale, setOnSale] = useState(false);
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState(null);
  const [starCount, setStarCount] = useState(4);
  const [ratingCount, setRatingCount] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("Black");
  const [ram, setRam] = useState("4GB");
  const [loading, setLoading] = useState(false);

const { Productfetch } = useContext(contextProvider);

const url = import.meta.env?.VITE_BACKEND_URL
  

  const uploadImage = async (pics) => {
    if (!pics) {
      toast.warning("Please select an image.");
      return null;
    }
    if (!["image/jpeg", "image/png"].includes(pics.type)) {
      toast.warning("Please select a valid image (JPEG/PNG).");
      return null;
    }

    setLoading(true);
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "daruus6qx");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/daruus6qx/image/upload",
        data
      );
      return response.data.url.toString();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed.");
      return null;
    } finally {
      setLoading(false);
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = image;

    if (!productName || !price || !ratingCount) {
      return toast.error("Please fill in all required fields.");
    }

    if (typeof image !== "string" && image) {
      imageUrl = await uploadImage(image);
      if (!imageUrl) return;
    }

    try {
      await axios.post(`${url}/api/product`, {
        productName,
        productImage: imageUrl,
        onSale,
        starCount,
        ratingCount,
        price,
        color,
        ram,
      });

      toast.success("Product created successfully!");

      // Reset form
      setProductName("");
      setImage(null);
      setStarCount(4);
      setRatingCount("");
      setPrice("");
      setColor("Black");
      setRam("4GB");
      setOnSale(false);
      setAddProductModal(false);
      Productfetch();
      
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-semibold text-center mb-4">Create a Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={onSale}
            onChange={(e) => setOnSale(e.target.checked)}
          />
          <label className="text-sm font-medium">On Sale</label>
        </div>

        
        <input
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

       
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border rounded-lg"
        />

        
        <select
          value={starCount}
          onChange={(e) => setStarCount(Number(e.target.value))}
          className="w-full p-2 border rounded-lg"
        >
          {[1, 2, 3, 4].map((star) => (
            <option key={star} value={star}>
              {star} Star{star > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        {/* Rating Count */}
        <input
          type="number"
          placeholder="Rating Count"
          value={ratingCount}
          onChange={(e) => setRatingCount(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

        {/* Color Selection */}
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Blue">Blue</option>
          <option value="Red">Red</option>
        </select>

        {/* RAM Selection */}
        <select
          value={ram}
          onChange={(e) => setRam(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="4GB">4GB</option>
          <option value="8GB">8GB</option>
          <option value="16GB">16GB</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          {loading ? "Uploading..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

