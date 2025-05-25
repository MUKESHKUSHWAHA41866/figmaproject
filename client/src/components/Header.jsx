

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, User, ShoppingBag } from "lucide-react";
import { contextProvider } from "../context/AppContext";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(contextProvider);

  const logout = () => {
    setUser({ ...user, isAdmin: false });
    toast.success("Logout Successfully");
  };

  const handleLogin = () => {
    if (user?.isAdmin) {
      logout();
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="shadow-md border-b bg-white">
      {/* Top Nav */}
      <div className="flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/Header.png" alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Top Links */}
        <div className="flex items-center space-x-6 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-blue-600">Sell</a>
          <a href="#" className="hover:text-blue-600">Buy</a>
          <a href="#" className="hover:text-blue-600">Repair</a>
          <a href="#" className="hover:text-blue-600">Become Partner</a>
        </div>

        {/* Search Box */}
        <div className="flex-1 max-w-lg mx-8">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 text-sm text-gray-700">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>Mumbai</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <button onClick={handleLogin} className="hover:text-blue-600">
              {user?.isAdmin ? "Logout" : "Username"}
            </button>
          </div>
          <ShoppingBag className="w-5 h-5" />
        </div>
      </div>

      {/* Bottom Menu */}
      <div className="flex items-center justify-center gap-8 px-6 py-2 border-t text-sm font-medium text-gray-600">
        <a href="#" className="hover:text-blue-600">Good deals</a>
        <a href="#" className="hover:text-blue-600">Sell Phone</a>
        <a href="#" className="hover:text-blue-600">Sell Gadget</a>
        <a href="#" className="hover:text-blue-600">Buy Phone</a>
        <a href="#" className="hover:text-blue-600">Repair Device</a>
        <a href="#" className="hover:text-blue-600">Accessories</a>
        <a href="#" className="hover:text-blue-600">Our store</a>
        <a href="#" className="hover:text-blue-600">More</a>
      </div>
    </header>
  );
};

export default Header;


