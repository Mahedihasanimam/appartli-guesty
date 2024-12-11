"use client";
import React, { useState } from "react";
import { MdOutlineChevronLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import { DownOutlined } from "@ant-design/icons";
import Image from "next/image";
import imageone from '/public/icons/home.png';
import { useDispatch } from "react-redux";
import { setValue1 } from "@/redux/features/addPropertySlice/AddPropertySlice";

const Page = () => {
  const dispatch=useDispatch()
  const router = useRouter();

  const [formData, setFormData] = useState({
    location: '',
    numofrooms: '',
    guest: '',
    description: '',
    propertyType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      propertyType: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    const { location, numofrooms, guest, description, propertyType } = formData;
    if (!location || !numofrooms || !guest || !description || !propertyType) {
      alert("Please fill all the fields");
      return;
    }

    console.log("Form data:", formData);
    dispatch(setValue1(formData));
    // Redirect to the next page
    router.push("/proparty/makeitstandout");
  };


  return (
    <div className="container mx-auto text-white p-4">
      <div className="flex items-center justify-between py-6 mt-12">
        <div>
          <h2 className="text-[24px] flex space-x-2 items-center font-bold">
            <button onClick={() => router.back()} className="focus:outline-none">
              <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
            </button>
            Tell us about your place
          </h2>
          <p className="text-[#FFFFFFCC] pl-2 pt-2">
            Share some basic info, like where it is and how many guests can stay.
          </p>
        </div>

        <div>
          <Image className="object-cover" src={imageone} alt="image" />
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="mt-4 w-full">
          <p className="text-[#FFFFFF] text-[16px] font-medium pb-1">What kind of property you have?</p>
          <div className="relative">
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={(e) => handleSelectChange(e.target.value)}
              className="custom-select text-white mb-4 bg-[#242424] text-[#FFFFFF99] placeholder:text-[#FFFFFF99] w-full h-16 rounded-lg border-none p-4"
            >
              <option value="">Select property type</option>
              <option value="rooms">Rooms</option>
              <option value="countryside">Countryside</option>
              <option value="apartment">Apartment</option>
              <option value="beachfront">Beachfront</option>
            </select>
            <DownOutlined className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg text-white" />
          </div>

          <div className="w-full flex gap-[20px] items-center justify-between">
            <div className="w-full">
              <p className="text-[#FFFFFF] text-[16px] font-medium pb-1">Location</p>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full h-16 bg-[#242424] text-[#FFFFFF99] rounded-lg p-4"
                placeholder="Please enter your location of property"
              />
            </div>
          </div>

          <div className="w-full flex gap-[20px] items-center justify-between">
            <div className="w-full">
              <p className="text-[#FFFFFF] text-[16px] font-medium pb-1">Number of rooms</p>
              <input
                type="number"
                name="numofrooms"
                value={formData.numofrooms}
                onChange={handleChange}
                className="w-full h-16 bg-[#242424] text-[#FFFFFF99] rounded-lg p-4"
                placeholder="Enter the total number of rooms"
              />
            </div>
          </div>

          <div className="w-full">
            <p className="text-[#FFFFFF] text-[16px] font-medium pb-1">Guest</p>
            <input
              type="text"
              name="guest"
              value={formData.guest}
              onChange={handleChange}
              className="w-full h-16 bg-[#242424] text-[#FFFFFF99] rounded-lg p-4"
              placeholder="Please enter how many guests can stay"
            />
          </div>

          <div className="w-full">
            <p className="text-[#FFFFFF] text-[16px] font-medium pb-1">Description</p>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full h-48 bg-[#242424] text-[#FFFFFF99] rounded-lg p-4"
              placeholder="Please describe your property"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 h-12 bg-[#EBCA7E] font-bold rounded-lg text-[#0F0F0F] border-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
