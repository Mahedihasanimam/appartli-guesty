'use client';

import { useContactUsMutation } from "@/redux/features/users/UserApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const Contact = () => {
  const [contactUs]=useContactUsMutation()
    const router=useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you would typically send the form data to your server

    try {
      const respons=await contactUs(formData).unwrap()
    console.log(respons)
    if(respons?.success){
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }
    } catch (error) {
      alert(error?.message)
    }


    
 
  };

  return (
    <div className="bg-[#060000] min-h-screen text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          {submitted && (
              <div className="bg-green-500 text-white text-center p-4 rounded-lg mb-6">
              Thank you for contacting us! We will get back to you soon.
            </div>
          )}
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
            <div className="mb-4">
              <label className="block text-lg mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBCA7E]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBCA7E]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBCA7E]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#EBCA7E] hover:bg-[#EBCA7E] text-[#000000] transition duration-300 py-2 rounded-lg  text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
