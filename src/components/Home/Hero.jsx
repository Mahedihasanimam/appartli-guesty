'use client'; // Ensure this component uses client-side rendering
import { Button, Card, DatePicker, Image, Input, Modal, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Carousel } from 'antd';
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import heroimg1 from "/public/images/heroimg.png";
import { useGetAllSearchPropertyQuery } from "@/redux/features/Propertyapi/page";
import Swal from "sweetalert2";
import PropartyCard from "../ui/PropartyCard";
import RoomsCard from "../ui/RoomsCard";
import { useSearchGuestyPropertiesQuery } from "@/redux/features/guesty/guestyApi";
import { IoLocationOutline } from "react-icons/io5";




const Hero = ({ title, description }) => {
 
  const [isCheckInVisible, setIsCheckInVisible] = useState(false);
  const [isCheckOutVisible, setIsCheckOutVisible] = useState(false);


  
  const [searchParams, setSearchParams] = useState({});
  const [debouncedParams, setDebouncedParams] = useState(searchParams);
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [maxGuests, setMaxGuests] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isLoading } = useSearchGuestyPropertiesQuery(debouncedParams, {
    skip: Object.keys(debouncedParams).length === 0, // Skip API call if no params
  });

  // Extract unique cities from data
  const extractUniqueCities = (data) => {
    const cities = data?.results?.map((property) => property?.address?.city).filter(Boolean);
    return [...new Set(cities)];
  };

  const cities = data?.results?.map((property) => property?.address?.city).filter(Boolean);
console.log('cities',cities)
console.log('data',data)
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


  return (
    <div>
      <div className="relative w-full min-h-[407px]  ">
        {/* Hero section with carousel background */}
        <Carousel autoplay className="container mx-auto  w-full h-full z-0">
          <div className="w-full">
            <Image src={heroimg1.src} alt="HeroImage1" className="w-full min-h-[600px]  h-full object-cover" />
          </div>
          <div>
            <Image src={heroimg1.src} alt="Hero Image 2" className="w-full min-h-[600px]  h-full object-cover" />
          </div>
          <div>
            <Image src={heroimg1.src} alt="Hero Image 3" className="w-full min-h-[600px]  h-full object-cover" />
          </div>
        </Carousel>

        {/* Content Layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center  z-20 px-4 sm:px-6 lg:px-0">
          <div className="max-w-4xl text-center">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl leading-tight font-bold">
              {title}
            </h1>
            <p className="text-white text-lg leading-tight mt-4">
              {description}
            </p>
          </div>


          {/* Search Bar */}
          {/* <div className="space-y-8">
            <div className="lg:flex md:flex sm:flex hidden items-center bg-[#FFFFFF99] rounded-xl shadow-lg px-4 sm:px-6 lg:px-8 py-4 space-y-4 sm:space-y-0 sm:space-x-4 lg:max-w-4xl w-full mx-auto my-6 lg:mt-20 mt-8">
              <div className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out">
                <p className="text-[16px] text-[#000000] pl-2">Where</p>
                <Input
                  placeholder="Add location"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    handleInputChange("city", e.target.value);
                  }}
                  bordered={false}
                  className="text-sm text-gray-700"
                />
              </div>
              <div className="h-12 border-r border-gray-500"></div>
              <div className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out">
                <p className="text-[16px] text-[#000000] pl-2">Check In</p>
                <DatePicker
                  className="w-full"
                  value={startDate ? dayjs(startDate) : null}
                  onChange={(date) => {
                    setstartDate(date);
                    handleInputChange("checkIn", date ? dayjs(date).format("YYYY-MM-DD") : null);
                  }}
                />
              </div>
              <div className="h-12 border-r border-gray-400"></div>
              <div className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out">
                <p className="text-[16px] text-[#000000] pl-2">Check Out</p>
                <DatePicker
                  className="w-full"
                  value={endDate ? dayjs(endDate) : null}
                  onChange={(date) => {
                    setendDate(date);
                    handleInputChange("checkOut", date ? dayjs(date).format("YYYY-MM-DD") : null);
                  }}
                />
              </div>
              <div className="h-12 border-r border-gray-400"></div>
              <div className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out">
                <p className="text-[16px] text-[#000000] pl-4">Who</p>
                <Input
                  type="number"
                  placeholder="Add Guest"
                  value={maxGuests}
                  onChange={(e) => {
                    setmaxGuests(e.target.value);
                    handleInputChange("minOccupancy", e.target.value ? parseInt(e.target.value) : null);
                  }}
                  bordered={false}
                  className="text-sm text-gray-700"
                />
              </div>
              <button className="bg-[#EBCA7E] h-[48px] w-[48px] rounded-[40px] text-white flex items-center justify-center">
                <SearchOutlined className="text-lg text-black" />
              </button>
            </div>

           
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
              {isLoading && <p>Loading...</p>}
              {error && <p>Error loading properties.</p>}
              {data?.results?.map((property) => (
                <div key={property._id} className="bg-white shadow rounded-lg p-4">
                  <img
                    src={property.picture?.thumbnail}
                    alt={property.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-2">{property.title}</h3>
                  <p className="text-sm text-gray-600">{property.address?.city}, {property.address?.country}</p>
                  <p className="text-sm mt-1">Guests: {property.accommodates}</p>
                  <p className="text-sm">Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms}</p>
                  <p className="text-sm font-bold mt-1">Price: {property.prices?.basePrice} {property.prices?.currency}</p>
                </div>
              ))}
            </div>
          </div> */}
<div>
      {/* Search Bar */}
      <div className="lg:flex md:flex sm:flex hidden items-center bg-[#FFFFFF99] rounded-xl shadow-lg px-4 sm:px-6 lg:px-8 py-4 space-y-4 sm:space-y-0 sm:space-x-4 lg:max-w-4xl w-full mx-auto my-6 lg:mt-20 mt-8">
        <div className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out">
          <p className="text-[16px] text-[#000000] pl-2">Where</p>
          <Select
           width={200}
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
                 <p className="text-[16px] text-[#000000] pl-2 flex items-center space-x-2"> <IoLocationOutline /> {city}</p> 
              </Option>
            ))}
          </Select>
        </div>
        <div className="h-12 border-r border-gray-500"></div>
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
        <div className="h-12 border-r border-gray-400"></div>
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
        <div className="h-12 border-r border-gray-400"></div>
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
        <button
          className="bg-[#EBCA7E] h-[48px] w-[48px] rounded-[40px] text-white flex items-center justify-center"
          onClick={() => setIsModalOpen(true)}
        >
          <SearchOutlined className="text-lg text-black" />
        </button>
      </div>

      {/* Results Modal */}
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
            <div key={property._id} className="bg-white shadow rounded-lg p-4">
              <img
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
          ))}
        </div>
      </Modal>
    </div>




        </div>

      </div>

      {data?.properties?.length > 0 &&
        <div className="container mx-auto  w-full h-full bg-black ">
          <div className="search-results    bg-black pb-12 rounded-lg p-6 w-full ">
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}


            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
              {data?.properties?.map((item) => (
                <RoomsCard key={item?._id} data={item} />
              ))}
            </div>
          </div>

        </div>
      }

    </div>
  );
};

export default Hero;
