import React, { createContext, useState } from 'react'
import axios from "axios";

export const contextProvider= createContext();
const AppContext = ({children}) => {
    const [services, setServices] = useState([]);
    const [allProduct,setAllProduct]=useState([]);
    const [user,setUser]=useState({
      email:"",
      isAdmin:false
    })
    const url = import.meta.env?.VITE_BACKEND_URL
    const Servicefetch=async()=>{
        try {
            const response=await axios.get(`${url}/api/service`);
            if(response){
                setServices(response?.data?.data);
            }
           
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    }

    const Productfetch=async()=>{
      try {
          const response=await axios.get(`${url}/api/product`);
          if(response){

            console.log("API",response.data);
            setAllProduct(response?.data?.products);
          }
         
      } catch (error) {
          console.error("Error fetching services:", error);
      }
  }   
  
  console.log("ALL product in context",allProduct);

   

  return (
    <contextProvider.Provider value={{user,setUser,Servicefetch,services,Productfetch,allProduct}}>
      {children}
    </contextProvider.Provider>
  )
}

export default AppContext;
