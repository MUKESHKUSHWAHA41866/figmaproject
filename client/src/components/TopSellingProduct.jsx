import React, { useContext, useEffect, useState } from "react";
import { contextProvider } from "../context/AppContext";
import ProductCard from "./ProductCard";
import CreateProduct from "./CreateProduct";

const TopSellingProduct = () => {
  const [addProductModal, setAddProductModal] = useState(false);
  const { user, Productfetch, allProduct } = useContext(contextProvider);

  useEffect(() => {
    Productfetch();
  }, []);

  console.log("ALLPRODUCT", allProduct);
  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex gap-2">
        <p className="font-[IBM Plex Sans] text-[24px] font-bold">Top Selling Products</p>
        {user.isAdmin && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-lg shadow-md transition duration-300 mb-4"
            onClick={() => setAddProductModal(true)}
          >
            Add Product
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
        {/* Modal Overlay */}
        {addProductModal && (
          <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-md z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md relative">
              {/* Close Button */}
              <button
                onClick={() => {
                  // setSelectedService(null);
                  setAddProductModal(false);
                }}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                ✖
              </button>

              <CreateProduct setAddProductModal={setAddProductModal} />
            </div>
          </div>
        )}

        {allProduct &&
          allProduct.map((product) => <ProductCard product={product} />)}
      </div>
    </div>
  );
};

export default TopSellingProduct;
