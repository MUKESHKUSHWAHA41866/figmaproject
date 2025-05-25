 
import React, { useContext } from "react";
import { Star, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { contextProvider } from "../context/AppContext";

const ProductCard = ({ product, onDelete }) => {
  const { user, Productfetch } = useContext(contextProvider);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8080/api/product/${product._id}`);
      toast.success("Product deleted successfully.");
      if (onDelete) onDelete(product._id);
      Productfetch(); // Refresh product list
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="relative bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 w-64 text-center">
      {/* Sale Badge */}
      {product?.onSale && (
        <div className="absolute top-3 right-3 bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
          On Sale
        </div>
      )}

      {/* Delete Button */}
      {user?.isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute top-3 left-3 p-1 rounded-full hover:bg-red-100 transition"
          title="Delete Product"
        >
          <Trash2 className="w-5 h-5 text-red-500" />
        </button>
      )}

      {/* Product Image */}
      <img
        src={product?.productImage}
        alt={product?.productName}
        className="w-full h-44 object-contain mb-3 rounded-lg"
      />

      {/* Product Info */}
      <h3 className="text-lg font-semibold text-gray-800">{product?.productName}</h3>
      <p className="text-gray-500 text-sm">{product?.RAM} - {product?.color}</p>

      {/* Rating */}
      <div className="flex items-center justify-center mt-2 space-x-1">
        {Array(product?.starCount).fill(0).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
        <span className="text-gray-600 text-sm">({product?.ratingCount})</span>
      </div>

      {/* Pricing */}
      <div className="mt-3">
        <span className="text-xs text-gray-400">Starting at</span>
        <div className="flex items-center justify-center space-x-2 mt-1">
          <span className="text-xl font-bold text-blue-600">₹{product?.price}</span>
          <span className="text-gray-400 line-through text-sm">₹{product?.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
