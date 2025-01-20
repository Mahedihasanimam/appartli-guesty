"use client";

import React, { useEffect, useState } from "react";
import { Input, DatePicker, Button, Tabs, Pagination, Modal, Select } from "antd";
import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";
import RoomsCard from "@/components/ui/RoomsCard";
import roomimage from "/public/images/roomimage.png";
import { useGetAllSearchPropertyQuery, useGetRoomsQuery } from "@/redux/features/Propertyapi/page";
import Swal from "sweetalert2";
import { useGetGuestyPropertiesQuery, useSearchGuestyPropertiesQuery } from "@/redux/features/guesty/guestyApi";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";

const { Option } = Select;

const Page = () => {
  const { data, isError, isLoading, refetch } = useGetRoomsQuery({}, {
    refetchOnFocus: true
  });
  const [activeKey, setActiveKey] = useState("1");
  const { data:guestydata, error:guestyError, isLoading:guestyLoading } = useGetGuestyPropertiesQuery();

const [location, setLocation] = useState('');
const [searchParams, setSearchParams] = useState({});
const [debouncedParams, setDebouncedParams] = useState(searchParams);

const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [maxGuests, setMaxGuests] = useState("");
const [isModalOpen, setIsModalOpen] = useState(false);

const { data:searchdata, error, isLoading:searchLoading } = useSearchGuestyPropertiesQuery(debouncedParams, {
  skip: Object.keys(debouncedParams).length === 0, // Skip API call if no params
});

// Extract unique cities from data
const extractUniqueCities = (data) => {
  const cities = searchdata?.results?.map((property) => property?.address?.city).filter(Boolean);
  return [...new Set(cities)];
};

const cities = searchdata?.results?.map((property) => property?.address?.city).filter(Boolean);

// Debounce search params to avoid excessive API calls
useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedParams(searchParams);
  }, 500);

  return () => clearTimeout(handler);
}, [searchParams]);

const handleInputChange = (field, value) => {
  setSearchParams((prev) => ({
    ...prev,
    [field]: value || undefined,
  }));
};



  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Adjust page size as needed

  if (isLoading || searchLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading rooms data</div>;
  }
  



  // Extract properties from the data for easier handling
  const roomsData = guestydata?.results || [];
  console.log(roomsData);

  // Create a unique list of categories with "All Category" at the beginning
  const uniqueCategories = Array.from(new Set(roomsData.map((room) => room?.propertyType)));
  const categories = ['All Category', ...uniqueCategories];

  // Function to handle tab change
  const handleTabChange = (key) => {
    setActiveKey(key);
    setCurrentPage(1); // Reset to page 1 when category changes
  };

  // Function to filter rooms by category
  const filterRoomsByCategory = (category) => {
    if (category === "All Category") return roomsData;
    return roomsData.filter((room) => room?.propertyType.toLowerCase() === category.toLowerCase());
  }; 4

  // Get rooms for the active category
  const filteredRooms = filterRoomsByCategory(categories[parseInt(activeKey) - 1]);

  // Calculate paginated data
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <div>

{/* Search Bar */}
<div className="bg-[#FFFFFF99] rounded-xl shadow-lg px-4 py-6 space-y-4 lg:space-y-0 lg:px-8 lg:py-4 lg:space-x-4 lg:max-w-4xl w-full mx-auto my-6 lg:mt-20 mt-8">
  {/* Mobile & Tablet Layout */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-4">




    {/* Check In */}
    <div className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out">
      <p className="text-[16px] text-[#000000] pl-2">Check In</p>
      <DatePicker
        className="w-full"
        value={startDate ? dayjs(startDate) : null}
        onChange={(date) => {
          setStartDate(date);
          handleInputChange("checkIn", date ? dayjs(date).format("YYYY-MM-DD") : null);
        }}
      />
    </div>

    {/* Divider */}
    <div className="hidden lg:block h-12 border-r border-gray-400"></div>

    {/* Check Out */}
    <div className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out">
      <p className="text-[16px] text-[#000000] pl-2">Check Out</p>
      <DatePicker
        className="w-full"
        value={endDate ? dayjs(endDate) : null}
        onChange={(date) => {
          setEndDate(date);
          handleInputChange("checkOut", date ? dayjs(date).format("YYYY-MM-DD") : null);
        }}
      />
    </div>



    {/* Divider */}
    <div className="hidden lg:block h-12 border-r border-gray-500"></div>

    {/* Location */}
    <div className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out">
      <p className="text-[16px] text-[#000000] pl-2">Where</p>
      <Select
        showSearch
        placeholder="Select a city"
        value={location}
        onChange={(value) => {
          setLocation(value);
          handleInputChange("city", value);
        }}
        style={{ width: "100%" }}
      >
        {cities?.map((city, index) => (
          <Option key={index} value={city}>
            <p className="text-[16px] text-[#000000] pl-2 flex items-center space-x-2">
              <IoLocationOutline /> {city}
            </p>
          </Option>
        ))}
      </Select>
    </div>



    {/* Divider */}
    <div className="hidden lg:block h-12 border-r border-gray-400"></div>

    {/* Guests */}
    <div className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out">
      <p className="text-[16px] text-[#000000] pl-4">Who</p>
      <Input
        type="number"
        placeholder="Add Guest"
        value={maxGuests}
        onChange={(e) => {
          setMaxGuests(e.target.value);
          handleInputChange("minOccupancy", e.target.value ? parseInt(e.target.value) : null);
        }}
        bordered={false}
        className="text-sm text-gray-700"
      />
    </div>

    {/* Search Button */}
    <button
      className="bg-[#EBCA7E] h-[48px] w-[48px] rounded-[40px] text-white flex items-center justify-center lg:ml-4"
      onClick={() => setIsModalOpen(true)}
    >
      <SearchOutlined className="text-lg text-black" />
    </button>
  </div>
</div>


<Modal
  width={1100}
  style={{ top: 100 }}
  title="Search Results"
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  footer={null}
  centered
>
  <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
    {searchLoading && <p>Loading...</p>}
    {error && <p>Error loading properties.</p>}
    {searchdata?.results?.map((property) => (
      <Link key={property?._id} href={`/propertyDetails/${property?._id}`}>
        <div className="bg-white shadow rounded-lg p-4">
          <Image
            width={400}
            height={400}
            src={property.picture?.thumbnail}
            alt={property.title}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="text-lg font-semibold mt-2">{property.title}</h3>
          <p className="text-sm text-gray-600">
            {property.address?.city}, {property.address?.country}
          </p>
          <p className="text-sm mt-1">Guests: {property.accommodates}</p>
          <p className="text-sm">
            Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms}
          </p>
          <p className="text-sm font-bold mt-1">
            Price: {property.prices?.basePrice} {property.prices?.currency}
          </p>
        </div>
      </Link>
    ))}
  </div>
</Modal>
</div>
      <div className="container mx-auto py-16 px-4 h-full ">
        <h1 className="xl:text-[56px] lg:text-[56px] font-black leading-none text-2xl text-white font-Merriweather text-center pb-12">
          Explore Amazing Rooms
        </h1>

        {/* Tabs for categories */}
        <Tabs activeKey={activeKey} onChange={handleTabChange} tabBarStyle={{ borderBottom: "none" }}>
          {categories?.map((category, index) => (
            <Tabs.TabPane
              tab={
                <button
                  className={`category-button ${
                    activeKey === String(index + 1) ? "active-tab" : ""
                  }`}
                >
                  {category}
                </button>
              }
              key={index + 1}
            >
              {/* Room cards for each category */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-8">
                {paginatedRooms.map((room) => (
                  <RoomsCard key={room.id} data={room} />
                ))}
              </div>
            </Tabs.TabPane>
          ))}
        </Tabs>

        {/* Pagination controls */}
        <div className="flex justify-center items-center gap-4 mt-8 border-t-2 border-[#424242] p-6 w-full">
          <div className="flex justify-between items-center gap-4 w-full">
            <div className="text-center text-white mt-2">
              Page {currentPage} of {Math.ceil(roomsData.length / pageSize)}
            </div>
            <Pagination
              current={currentPage}
              total={filteredRooms.length}
              pageSize={pageSize}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              className="text-center"
            />
          </div>
          <div className="flex justify-end items-center gap-4 w-full">
            <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
              Previous
            </Button>
            <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(roomsData.length / pageSize)))}>
              Next
            </Button>
          </div>
        </div>

        
      </div>

   
    </div>
  );
};

export default Page;
