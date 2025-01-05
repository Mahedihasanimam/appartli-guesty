"use client";

import { useGetProfileQuery } from "@/redux/features/users/UserApi";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
     // ------------------------------Inital User Get On Rtk Query Start---------------------------------
      useGetProfileQuery("")
      // ------------------------------Inital User Get On Rtk Query End---------------------------------
  const [token, setToken] = useState(null);
const router=useRouter()
  useEffect(() => {
    // Retrieve token from localStorage if available
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);




  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem('isOwner')
  };


  return (
    <UserContext.Provider value={{ token, setToken, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
