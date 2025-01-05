'use client';

import { useGetAllFAQQuery } from "@/redux/features/EditContent/editContentApi";
import React, { useState, Suspense } from "react";

const FAQ = () => {
  const { data, isLoading } = useGetAllFAQQuery();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#060000] min-h-screen text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto">
          {data?.data?.map((item, index) => (
            <div key={index} className="mb-6">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center bg-gray-800 px-6 py-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
              >
                <span className="text-lg">{item.question}</span>
                <span className="text-2xl">{activeIndex === index ? "-" : "+"}</span>
              </button>
              {activeIndex === index && (
                <div className="bg-gray-700 mt-2 px-6 py-4 rounded-lg transition duration-300 ease-in-out">
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
