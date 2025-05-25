
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { contextProvider } from "../context/AppContext";

const CreateService = ({ selectedService, setAddServiceModal,setSelectedService }) => {
  const [serviceName, setServiceName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateRequest, setUpdateRequest] = useState(false);
  const {user,Servicefetch} = useContext(contextProvider);
  const url = import.meta.env?.VITE_BACKEND_URL

  console.log("SELECTED",selectedService)
 

  useEffect(() => {
    if (selectedService) {
      setServiceName(selectedService.serviceName || "");
      setImage(selectedService.servicePic || "");
      setUpdateRequest(true);
    } else {
      setServiceName("");
      setImage(null);
      setUpdateRequest(false);
    }
  }, [selectedService]);
  

  // Upload image to Cloudinary
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = image;

    if (!serviceName) {
      return toast.error("Please enter a service name.");
    }

    if (typeof image !== "string" && image) {
      imageUrl = await uploadImage(image);
      if (!imageUrl) return;
    }

    try {
      if (updateRequest) {
        // Update service
        await axios.put(`${url}/api/service/${selectedService._id}`, {
          serviceName,
          servicePic: imageUrl,
        });
        toast.success("Service updated successfully!");
        setAddServiceModal(false);
        setSelectedService(null);
        
      } else {
        // Create new service
        await axios.post(`${url}/api/service`, {
          serviceName,
          servicePic: imageUrl,
        });
        toast.success("Service created successfully!");
        setUpdateRequest(false); // Reset state after successful creation
        setAddServiceModal(false);
        setSelectedService(null);
      }

      // Reset form
      setServiceName("");
      setImage(null);
      Servicefetch();
 
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("Failed to save service.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-semibold text-center mb-4">
        {updateRequest ? "Update Service" : "Create a Service"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Service Name Input */}
        <input
          type="text"
          placeholder="Enter service name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border rounded-lg"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          {loading ? "Uploading..." : updateRequest ? "Update Service" : "Create Service"}
        </button>
      </form>
    </div>
  );
};

export default CreateService;
