

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CreateService from "./CreateService";
import { contextProvider } from "../context/AppContext";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const Services = () => {
  const { user, Servicefetch, services } = useContext(contextProvider);

  const [addServiceModal, setAddServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    Servicefetch();
  }, []);

  const handleEdit = (service) => {
    setSelectedService(service);
    setAddServiceModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/service/${id}`);
      if (response) {
        toast.success("Service deleted");
        Servicefetch();
      }
    } catch (error) {
      toast.error("Error occurred while deleting service");
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Our Services</h2>
        {user.isAdmin && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition duration-300"
            onClick={() => setAddServiceModal(true)}
          >
            Add Service
          </button>
        )}
      </div>

      {/* Modal */}
      {addServiceModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => {
                setSelectedService(null);
                setAddServiceModal(false);
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-lg"
            >
              ✖
            </button>
            <CreateService
              selectedService={selectedService}
              setAddServiceModal={setAddServiceModal}
              setSelectedService={setSelectedService}
            />
          </div>
        </div>
      )}

      {services.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No services available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="relative bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <div className="bg-[#FFE7CB] rounded-t-xl p-4">
                <img
                  src={service.servicePic}
                  alt={service.serviceName}
                  className="h-40 mx-auto object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {service.serviceName}
                </h3>
              </div>

              {/* Admin Controls */}
              {user.isAdmin && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                    onClick={() => handleEdit(service)}
                    title="Edit"
                  >
                    <Pencil size={18} className="text-blue-600" />
                  </button>
                  <button
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200"
                    onClick={() => handleDelete(service._id)}
                    title="Delete"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;

