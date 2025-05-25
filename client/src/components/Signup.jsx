import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { contextProvider } from "../context/AppContext";

const Signup = () => {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  const {setUser} = useContext(contextProvider);
  const navigate=useNavigate(); 
 
  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(auth);
    try {
      const authResp=await axios.post("http://localhost:8080/api/auth/register",{email:auth.email,password:auth.password});
      console.log(authResp.data);
      if(authResp){
        toast.success("Welcome to dashboard");
        setUser(authResp?.data?.user);
        navigate("/");
      }
      // navigate("/");
    } catch (error) {
      toast.error("Error in Auth")
      console.log("Error Occured",error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Signup</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Email</label>
            <input
              type="email"
              value={auth.email}
              onChange={(e) => setAuth({ ...auth, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Password</label>
            <input
              type="password"
              value={auth.password}
              onChange={(e) => setAuth({ ...auth, password: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Signup
          </button>
        </form>

        
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
  Login
</Link>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Signup;

