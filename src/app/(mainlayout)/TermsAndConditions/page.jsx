"use client";

import { useGetTermsAndServiceQuery } from "@/redux/features/EditContent/editContentApi";
import React from "react";

const TermsAndConditions = () => {

  const {data,isLoading,error}=useGetTermsAndServiceQuery()
  if(isLoading){
    return <div>Loading...</div>
  }
  if(error){
    return <div>Error</div>
  }
  console.log(data)
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#4B4B4B] text-[#ffffffc2] rounded-lg shadow-md my-6">
      <h1 className="text-3xl font-bold mb-4 text-white">Terms and Conditions</h1>
      
      <p className="mb-4">
       {data?.data?.content}
      </p>

    </div>
  );
};

export default TermsAndConditions;
