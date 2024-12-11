"use client";

import { useRoomBookingHelpQuery } from "@/redux/features/EditContent/editContentApi";

import React from "react";

const RoomBookingHelp = () => {
  const {data,isLoading}=useRoomBookingHelpQuery()
  if(isLoading){
    return <h1>Loading....</h1>
  }
console.log('roombooking data',data)
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#4B4B4B] text-[#ffffffc2] rounded-lg shadow-md my-6">
      <h1 className="text-3xl font-bold mb-4 text-white">Room Booking Help</h1>
      <p className="mb-4">
        Welcome to our Room Booking Help page! Here you ll find information and guidance to assist you with booking a room.
      </p>

      {
        data?.data?.map((item,index)=><div key={item?._id}>
           <h3 className="text-xl font-medium mt-4 mb-2">Q{index+1}: {item?.question}</h3>
      <p className="mb-4">
     {item?.answer}
      </p>

        </div>)
      }
    </div>
  );
};

export default RoomBookingHelp;
