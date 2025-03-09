"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/Home/Hero";
import Proparty from "@/components/Home/Proparty";
import Rooms from "@/components/Home/Rooms";
import { SearchOutlined } from "@ant-design/icons";
import { Input, DatePicker, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useGetAllSearchPropertyQuery } from "@/redux/features/Propertyapi/page";
import RoomsCard from "@/components/ui/RoomsCard";
import Swal from "sweetalert2";
import Link from "next/link";
import { useSearchGuestyPropertiesQuery } from "@/redux/features/guesty/guestyApi";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import moment from "moment";

const { Option } = Select;
const Page = () => {
  const [searchParams, setSearchParams] = useState({});
  const [debouncedParams, setDebouncedParams] = useState(searchParams);
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [maxGuests, setMaxGuests] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isLoading } = useSearchGuestyPropertiesQuery(
    debouncedParams,
    {
      skip: Object.keys(debouncedParams).length === 0, // Skip API call if no params
    }
  );

  const currentDate = new Date();
  const startcalDate = currentDate.toISOString().split("T")[0];
  const endcalDate = new Date(
    currentDate.setFullYear(currentDate.getFullYear() + 1)
  )
    .toISOString()
    .split("T")[0];

  const isDateBlocked = (currentDate) => {
    if (!currentDate) return false;

    // Format the current date as "YYYY-MM-DD"
    const formattedDate = currentDate.format("YYYY-MM-DD");

    // Check if the date is in the blockedDates array or is in the past
    const isPastDate = moment(formattedDate).isBefore(moment(), "day");
    // const isBlocked = blockedDates.includes(formattedDate);

    return isPastDate;
  };
  const isDateBlockedbooth = (currentDate) => {
    if (!currentDate) return false;

    // Format the current date as "YYYY-MM-DD"
    const formattedDate = currentDate.format("YYYY-MM-DD");

    // Block past dates (before today)
    const isPastDate = moment(formattedDate).isBefore(moment(), "day");

    // Block dates before or equal to the selected check-in date (startDate)
    const isBeforeOrSameCheckIn =
      startDate &&
      moment(formattedDate).isSameOrBefore(moment(startDate), "day");

    return isPastDate || isBeforeOrSameCheckIn; // Block past dates & same or before check-in date
  };

  // Extract unique cities from data
  const extractUniqueCities = (data) => {
    const cities = data?.results
      ?.map((property) => property?.address?.city)
      .filter(Boolean);
    return [...new Set(cities)];
  };

  const cities = data?.results
    ?.map((property) => property?.address?.city)
    .filter(Boolean);
  console.log("cities", cities);
  console.log("data", data);
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

   if(field === "checkIn"){
    setStartDate(value);
    
   }
  };
  useEffect(() => {
    setEndDate(null); 
  }, [startDate]);
  

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
                disabledDate={isDateBlocked} // Blocks past dates
                className="w-full"
                value={startDate ? dayjs(startDate) : null}
                onChange={(date) => {
                  setStartDate(date); // Set check-in date
                  setEndDate(null); // Reset check-out date when check-in changes
                  handleInputChange(
                    "checkIn",
                    date ? dayjs(date).format("YYYY-MM-DD") : null
                  );
                }}
              />
            </div>

            {/* Divider */}
            <div className="hidden lg:block h-12 border-r border-gray-400"></div>

            {/* Check Out */}
            <div className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out">
              <p className="text-[16px] text-[#000000] pl-2">Check Out</p>
              <DatePicker
                disabledDate={isDateBlockedbooth}
                className="w-full"
                value={endDate ? dayjs(endDate) : null}
                onChange={(date) => {
                  setEndDate(date);
                  handleInputChange(
                    "checkOut",
                    date ? dayjs(date).format("YYYY-MM-DD") : null
                  );
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
                type="text"
                placeholder="Add Guests"
                value={maxGuests}
                onChange={(e) => {
                  setMaxGuests(e.target.value);
                  handleInputChange(
                    "minOccupancy",
                    e.target.value ? parseInt(e.target.value) : null
                  );
                }}
                bordered={false}
                className="text-sm text-gray-700 bg-white rounded-md h-8 w-full"
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
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading properties.</p>}
            {data?.results?.map((property) => (
              <Link
                key={property?._id}
                href={`/propertyDetails/${property?._id}`}
              >
                <div className="bg-white shadow rounded-lg p-4">
                  <Image
                    width={400}
                    height={400}
                    src={property.picture?.thumbnail}
                    alt={property.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-2">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {property.address?.city}, {property.address?.country}
                  </p>
                  <p className="text-sm mt-1">
                    Guests: {property.accommodates}
                  </p>
                  <p className="text-sm">
                    Bedrooms: {property.bedrooms} | Bathrooms:{" "}
                    {property.bathrooms}
                  </p>
                  <p className="text-sm font-bold mt-1">
                    Price: {property.prices?.basePrice}{" "}
                    {property.prices?.currency}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Modal>
      </div>

      <Rooms />
      <Proparty
        title={
          "Transform your property into a lucrative experience for travelers"
        }
      />
    </div>
  );
};

export default Page;
