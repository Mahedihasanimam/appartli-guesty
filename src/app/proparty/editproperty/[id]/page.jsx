

'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import imageone from "/public/icons/home.png";
import imagetow from "/public/icons/stand.png";
import imagthree from "/public/icons/car.png";
import { MdOutlineChevronLeft } from 'react-icons/md';
import logo from "/public/images/logo.svg";
import { useGetRoomsByIdQuery, useUpdateARoomMutation } from '@/redux/features/Propertyapi/page';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
  const router=useRouter()
  const [updateARoom] = useUpdateARoomMutation();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data, isLoading } = useGetRoomsByIdQuery(params?.id);
  const [allservices, setallservices] = useState([]);
  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    numOfRooms: '',
    guests: '',
    description: '',
    images: [],
    pernightCost: '',
    nightforstay: '',
    maxGuests: '',
    startDate: '',
    endDate: '',
    services: [],
  });

  useEffect(() => {
    if (data?.room?.services[0]) {
      const servicesArray = data.room.services[0].split(',').map(service => service.trim());
      console.log('----------', servicesArray);
      setallservices(servicesArray);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        images: data.room?.images || [],
        services: allservices,
      }));
    }
  }, [data, allservices]);

  const handleServiceChange = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services?.includes(service)
        ? prev.services.filter((item) => item !== service)
        : [...(prev.services || []), service],
    }));
  };

 
 

  const handleRemoveOption = (option) => {
    const newSelectedOptions = selectedOptions.filter(item => item !== option);
    setSelectedOptions(newSelectedOptions);
    setFormData({
      ...formData,
      services: [...newSelectedOptions],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit =async(e) => {
    e.preventDefault();
    // Log the form data to the console
    console.log(formData);
    const roomId=params?.id
    try {
      const response = await updateARoom({ roomId, formData }).unwrap();
      console.log('Room updated successfully:', response);
      if(response?.success){
        Swal.fire({
          title:'successfully updated',
          text:response?.message,
          icon:'success'
        }).then(
          router.push('/ownerProfile')
        )
      }
    } catch (error) {
      Swal.fire({
        title:'opps',
        text:error?.message,
        icon:'error'
      })

    }

  };

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to Array
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...selectedFiles], // Append new files to existing images
    }));
  };
  


  
  const [showDropdown, setShowDropdown] = useState(false);

  const services = [
    "Lock on bedroom door",
    "Wifi",
    "Tv",
    "Luggage dropoff allowed",
    "Refrigerator",
    "Kitchen",
    "Dedicated workspace",
    "Washer",
    "Hair dryer",
    "Iron machine",
  ];

 


  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };
  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        images: data.room?.images || [],
        services: allservices,
      }));
    }
  }, [data, allservices]);
  
  

  if(isLoading ){
    return <h1>Loading....</h1>
  }
 

  return (
    <div>
      <Image className="pt-6" src={logo} alt="logo" />
      <div className="container mx-auto">
        <div className="text-white">
          <h2 className="text-[28px] flex space-x-2 items-center font-bold mt-12">
            <button onClick={() => window.history.back()} className="focus:outline-none">
              <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
            </button>
            Tell us about your place
          </h2>

          <div className="flex items-center justify-between py-6">
            <p className="text-[#FFFFFFCC] pt-4">
              Share some basic info, like where it is and how many guests can stay.
            </p>
            <Image src={imageone} alt="home icon" />
          </div>

          <form onSubmit={handleSubmit} className="mt-4 w-full">
            <div className="mb-4">
              <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">
                What kind of property do you have?
              </label>
              <select

                name="propertyType"
                onChange={handleInputChange}
               defaultValue={data?.room?.category}
                className="w-full p-4 bg-[#242424] text-white rounded-lg"
              >
                <option value="rooms">Rooms</option>
                <option value="countryside">Country Side</option>
                <option value="apartment">Apartment</option>
                <option value="beachfront">Beachfront</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">Location</label>
              <input
                type="text"
                name="location"
                defaultValue={data?.room?.location}
                onChange={handleInputChange}
                className="w-full p-4 bg-[#242424] text-[#FFFFFF99] rounded-lg"
                placeholder="Enter your property location"
              />
            </div>

            <div className="mb-4">
              <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">Number of Rooms</label>
              <input
                type="number"
                name="numOfRooms"
                defaultValue={data?.room?.roomCount}
                onChange={handleInputChange}
                className="w-full p-4 bg-[#242424] text-[#FFFFFF99] rounded-lg"
                placeholder="Enter the total number of rooms"
              />
            </div>

            {/* <div className="mb-4">
              <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">Guests</label>
              <input
                type="number"
                name="guests"
                defaultValue={data?.room?.maxGuests}
                onChange={handleInputChange}
                className="w-full p-4 bg-[#242424] text-[#FFFFFF99] rounded-lg"
                placeholder="Enter how many guests can stay"
              />
            </div> */}

            <div className="mb-4">
              <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">Description</label>
              <textarea
                name="description"
                defaultValue={data?.room?.description}
                onChange={handleInputChange}
                className="w-full p-4 bg-[#242424] text-[#FFFFFF99] rounded-lg"
                placeholder="Describe your property"
                rows="6"
              ></textarea>
            </div>

            <div className="text-white mt-12">
              <div className="flex items-center justify-between py-6">
                <div>
                  <h2 className="text-[28px] flex space-x-2 items-center font-bold">Make it stand out</h2>
                  <p className="text-[#FFFFFFCC] pt-4">
                    Add 4 or less photos plus a title and description—we’ll help you out.
                  </p>
                </div>
                <Image src={imagetow} alt="image" />
              </div>
            </div>

            <div className="mb-4 border p-4 rounded-lg border-[#7C7C7C]">
              <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">
                Upload Images
              </label>
              <input
              
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden "
                id="file-input"
              />
              <div className='flex items-center justify-center'>
              <label
                  htmlFor="file-input"
                  className="w-fit  text-white rounded-lg cursor-pointer text-center"
                >
                  <svg width="137" height="137" viewBox="0 0 137 137" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M81.249 88.5507L81.8496 89.0544L126.593 132.971C123.287 135.009 119.478 136.087 115.594 136.084H41.3236C37.4402 136.089 33.6319 135.014 30.325 132.978L75.0684 89.0544L75.6044 88.5959C76.4225 87.9993 77.407 87.6741 78.4194 87.666C79.4319 87.6579 80.4214 87.9673 81.249 88.5507ZM115.594 19.834C118.351 19.834 121.08 20.3769 123.627 21.4317C126.173 22.4865 128.487 24.0326 130.436 25.9817C132.385 27.9308 133.931 30.2446 134.986 32.7912C136.041 35.3378 136.584 38.0672 136.584 40.8236V115.094C136.584 119.144 135.434 122.928 133.452 126.138L88.6373 82.144L87.8107 81.3884C85.1998 79.1929 81.8998 77.986 78.4886 77.9789C75.0774 77.9718 71.7725 79.165 69.1525 81.3496L68.2807 82.144L23.4663 126.132C21.4143 122.816 20.3294 118.993 20.334 115.094V74.7427C28.0138 77.9478 36.4729 78.798 44.6369 77.1854C52.8009 75.5728 60.3014 71.5701 66.1857 65.6857C72.0701 59.8014 76.0728 52.3009 77.6854 44.1369C79.298 35.9729 78.4478 27.5138 75.2427 19.834H115.594ZM36.4798 0.458984C41.1445 0.458984 45.7635 1.37776 50.0731 3.16285C54.3826 4.94794 58.2984 7.56438 61.5968 10.8628C64.8953 14.1612 67.5117 18.077 69.2968 22.3866C71.0819 26.6962 72.0007 31.3152 72.0007 35.9798C72.0007 40.6445 71.0819 45.2635 69.2968 49.5731C67.5117 53.8826 64.8953 57.7984 61.5968 61.0968C58.2984 64.3953 54.3826 67.0117 50.0731 68.7968C45.7635 70.5819 41.1445 71.5007 36.4798 71.5007C27.0591 71.5007 18.0242 67.7583 11.3628 61.0968C4.70135 54.4354 0.958984 45.4005 0.958984 35.9798C0.958984 26.5591 4.70135 17.5242 11.3628 10.8628C18.0242 4.20135 27.0591 0.458985 36.4798 0.458984ZM102.691 39.209C98.8333 39.209 95.1339 40.7413 92.4064 43.4689C89.6788 46.1964 88.1465 49.8958 88.1465 53.7532C88.1465 57.6105 89.6788 61.3099 92.4064 64.0374C95.1339 66.765 98.8333 68.2973 102.691 68.2973C106.548 68.2973 110.247 66.765 112.975 64.0374C115.702 61.3099 117.235 57.6105 117.235 53.7532C117.235 49.8958 115.702 46.1964 112.975 43.4689C110.247 40.7413 106.548 39.209 102.691 39.209ZM102.691 48.8965C103.979 48.8965 105.214 49.4082 106.125 50.319C107.036 51.2298 107.547 52.4651 107.547 53.7532C107.547 55.0412 107.036 56.2765 106.125 57.1873C105.214 58.0981 103.979 58.6098 102.691 58.6098C101.403 58.6098 100.167 58.0981 99.2565 57.1873C98.3457 56.2765 97.834 55.0412 97.834 53.7532C97.834 52.4651 98.3457 51.2298 99.2565 50.319C100.167 49.4082 101.403 48.8965 102.691 48.8965ZM36.4798 13.3757L35.8986 13.4209C35.2534 13.5387 34.6593 13.8503 34.1955 14.3141C33.7318 14.7779 33.4202 15.3719 33.3023 16.0171L33.2507 16.6048V32.7507H17.0919L16.5107 32.8023C15.8654 32.9202 15.2714 33.2318 14.8076 33.6955C14.3438 34.1593 14.0323 34.7534 13.9144 35.3986L13.8627 35.9798L13.9144 36.5611C14.0323 37.2063 14.3438 37.8003 14.8076 38.2641C15.2714 38.7279 15.8654 39.0394 16.5107 39.1573L17.0919 39.209H33.2507V55.3742L33.3023 55.9554C33.4202 56.6007 33.7318 57.1947 34.1955 57.6585C34.6593 58.1223 35.2534 58.4338 35.8986 58.5517L36.4798 58.6098L37.0611 58.5517C37.7063 58.4338 38.3003 58.1223 38.7641 57.6585C39.2279 57.1947 39.5394 56.6007 39.6573 55.9554L39.709 55.3742V39.209H55.8871L56.4684 39.1573C57.1136 39.0394 57.7076 38.7279 58.1714 38.2641C58.6352 37.8003 58.9467 37.2063 59.0646 36.5611L59.1163 35.9798L59.0646 35.3986C58.9463 34.7525 58.6338 34.1578 58.1688 33.6939C57.7037 33.23 57.1083 32.919 56.4619 32.8023L55.8806 32.7507H39.709V16.6048L39.6573 16.0236C39.5406 15.3772 39.2296 14.7817 38.7657 14.3167C38.3018 13.8517 37.7072 13.5392 37.0611 13.4209L36.4798 13.3757Z" fill="#929292" />
                  </svg>

                 <div className='pt-4'>
                 <p className="text-white text-[16px] font-normal">
                    Drop your image here,{" "}
                    <span className="text-[#EBCA7E]">or browse</span>
                  </p>
                  <p className="text-[#FFFFFFCC] text-sm font-light text-center pt-2">
                    Supports: PNG, JPG, JPEG, WEBP
                  </p>
                 </div>
                </label>
              </div>

              {/* <div>
                  ----------------------------------------------------------------------------------------   
              </div> */}

              <div>
                
                 {formData.images.map((image, index) => (
          <li key={index}>{typeof image === "string" ? image : image.name}</li>
        ))}
              </div>
            </div>

            <div className="mb-4">

            <div className="flex items-center justify-between py-6">
           <div>
           <h2 className="text-[28px] flex space-x-2 items-center font-bold mt-12">
              Finish up & publish
            </h2>
              <p className="text-[#FFFFFFCC] pt-4">
                Choose a starting price, verify a few details, then publish your
                listing.
              </p>
           </div>
              <Image src={imagthree} alt="image" />
            </div>


              <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">Per night cost</label>
              <input
                type="number"
                name="pernightCost"
                defaultValue={data?.room?.pricePerNight}
                onChange={handleInputChange}
                className="w-full p-4 bg-[#242424] text-[#FFFFFF99] rounded-lg"
                placeholder="Enter per night cost"
              />
            </div>

            <div className="mb-4">
              <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">Number of nights for stay</label>
              <input
                type="number"
                name="nightforstay"
                value={formData.nightforstay}
                onChange={handleInputChange}
                className="w-full p-4 bg-[#242424] text-[#FFFFFF99] rounded-lg"
                placeholder="Enter number of nights"
              />
            </div>

            <div className="mb-4">
              <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">Max Guests</label>
              <input
                type="number"
                name="maxGuests"
                defaultValue={data?.room?.maxGuests}
                onChange={handleInputChange}
                className="w-full p-4 bg-[#242424] text-[#FFFFFF99] rounded-lg"
                placeholder="Enter max number of guests"
              />
            </div>

            {/* Room Availability */}
        <div className="mb-4">
          <label className="text-white text-lg font-medium">Room availability</label>
          <div className="lg:flex flex-row items-center justify-between gap-6">
            <div className="w-full">
              <label className="text-white text-lg font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                defaultValue={data?.room?.endDate
                  ? new Date(data.room.startDate).toISOString().split("T")[0]
                  : ""}
                onChange={handleInputChange}
                className="w-full p-4 bg-[#242424] text-[#FFFFFF99] rounded-lg"
              />
            </div>

            <div className="w-full">
              <label className="text-white text-lg font-medium">End Date</label>
              <input
                type="date"
                name="endDate"
                defaultValue={data?.room?.endDate
                  ? new Date(data.room.endDate).toISOString().split("T")[0]
                  : ""}
                onChange={handleInputChange}
                className="w-full p-4 bg-[#242424] text-[#FFFFFF99] rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Services Offered */}
        <div className="mb-4">
          <label className="text-white text-lg font-medium">What service you offer for user?</label>
          <div className="relative">
            <button
              type="button"
              onClick={toggleDropdown}
              className="w-full p-4 bg-[#242424] text-[#FFFFFF99] rounded-lg flex justify-between items-center"
            >
              {formData?.services?.length > 0
                ? `${formData?.services?.length} selected`
                : "Select services"}
              <span className="text-white">▼</span>
            </button>

            {showDropdown && (
              <div className="absolute left-0 mt-2 w-full bg-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                <div className="p-2">
                  {services.map((service) => (
                    <label key={service} className="flex items-center text-white py-1">
                      <input
                        type="checkbox"
                        defaultValue={service}
                         defaultChecked={allservices?.map(i=>i.includes(service))}
                        onChange={() => handleServiceChange(service)}
                        className="mr-2"
                      />
                      {service}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>


            <div className="mt-8 flex justify-between">
              <button
                type="submit"
                className="py-2  px-6 bg-[#EBCA7E] text-black font-medium text-lg rounded-lg w-full"
              >
                Finish and Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
