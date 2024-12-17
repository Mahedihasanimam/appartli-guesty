"use client";

import React, { useState } from "react";
import { Input, DatePicker, Button, Tabs, Pagination } from "antd";
import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";
import RoomsCard from "@/components/ui/RoomsCard";
import roomimage from "/public/images/roomimage.png";
import { useGetAllSearchPropertyQuery, useGetRoomsQuery } from "@/redux/features/Propertyapi/page";
import Swal from "sweetalert2";
import { useGetGuestyPropertiesQuery } from "@/redux/features/guesty/guestyApi";


const Page = () => {
  const { data, isError, isLoading, refetch } = useGetRoomsQuery({}, {
    refetchOnFocus: true
  });
  const { data:guestydata, error:guestyError, isLoading:guestyLoading } = useGetGuestyPropertiesQuery();

  const [activeKey, setActiveKey] = useState("1");
const [location, setLocation] = useState('');
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [maxGuests, setmaxGuests] = useState();
  const [isCheckInVisible, setIsCheckInVisible] = useState(false);
  const [isCheckOutVisible, setIsCheckOutVisible] = useState(false);
  const [searchParams, setSearchParams] = useState(null);
  const { data:searchDATa, error, isLoading:searchLoading } =useGetAllSearchPropertyQuery(searchParams, {
    skip: !searchParams, // Prevent API call until searchParams is set
  });

  const handleSearch = () => {
    if (!location && !maxGuests && !startDate && !endDate) {
      // Show an alert or error message if no fields are filled
     Swal.fire({
      title:'proprty not found',
      text:'Please fill all fild search field before searching.'
     })
      return;
    }
    setSearchParams({
      location: location || '', // Allow empty values
      maxGuests: maxGuests ? parseInt(maxGuests) : 0,
      startDate: startDate ? dayjs(startDate).format('YYYY-MM-DD') : '',
      endDate: endDate ? dayjs(endDate).format('YYYY-MM-DD') : '',
    });

  };




 if(searchDATa?.properties?.length<=0){
  Swal.fire({
    title:'search not match',
    text:'No properties matched your search criteria. Please try again with different filters'
  })
 }



  
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
      {/* Search input */}
      <div className="lg:flex md:flex sm:flex hidden items-center bg-[#FFFFFF99] rounded-xl shadow-lg px-4 sm:px-6 lg:px-8 py-4 space-y-4 sm:space-y-0 sm:space-x-4 lg:max-w-4xl w-full mx-auto my-6 lg:mt-20 mt-8">
          <div className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out">
            <p className="text-[16px] text-[#000000] pl-2">Where</p>
            <Input
              placeholder="Add location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              bordered={false}
              className="text-sm text-gray-700"
            />
          </div>
          <div className="h-12 border-r border-gray-500"></div>
          <div
    
            className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out"
            onMouseEnter={() => setIsCheckInVisible(true)}
            onMouseLeave={() => setIsCheckInVisible(false)}
            clas
          >
            <p className="text-[16px] text-[#000000] pl-2">Check In</p>
            {isCheckInVisible ? (
              <DatePicker
                className="w-full"
                open={isCheckInVisible}
                onOpenChange={(open) => setIsCheckInVisible(open)}
                onChange={(date) => setstartDate(date)}
              />
            ) : (
              <Input
                placeholder="Add Dates"
                value={startDate ? dayjs(startDate).format('YYYY-MM-DD') : ''}
                bordered={false}
                className="text-sm text-gray-700"
                readOnly
              />
            )}
          </div>
          <div className="h-12 border-r border-gray-400"></div>
          <div
            className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out"
            onMouseEnter={() => setIsCheckOutVisible(true)}
            onMouseLeave={() => setIsCheckOutVisible(false)}
          >
            <p className="text-[16px] text-[#000000] pl-2">Check Out</p>
            {isCheckOutVisible ? (
              <DatePicker
                className="w-full"
                open={isCheckOutVisible}
                onOpenChange={(open) => setIsCheckOutVisible(open)}
                onChange={(date) => setendDate(date)}
              />
            ) : (
              <Input
                placeholder="Add Dates"
                value={endDate ? dayjs(endDate).format('YYYY-MM-DD') : ''}
                bordered={false}
                className="text-sm text-gray-700"
                readOnly
              />
            )}
          </div>
          <div className="h-12 border-r border-gray-400"></div>
          <div className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out">
            <p className="text-[16px] text-[#000000] pl-4">Who</p>
            <Input
            type="number"
              placeholder="Add Guest"
              value={maxGuests}
              onChange={(e) => setmaxGuests(e.target.value)}
              bordered={false}
              className="text-sm text-gray-700"
            />
          </div>
          <button
            className="bg-[#EBCA7E] h-[48px] w-[48px] rounded-[40px] text-white flex items-center justify-center"
            onClick={handleSearch}
          >
            <SearchOutlined className="text-lg text-black" />
          </button>
        </div>



        {searchDATa?.properties?.length > 0 && 
     <div className="container mx-auto  w-full h-full bg-black ">
     <div className="search-results   bg-black pb-12 rounded-lg p-6 w-full ">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}


          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {searchDATa?.properties?.map((item) => (
             <RoomsCard key={item?._id} data={item}/>
            ))}
          </div>
      </div>

     </div>
        }
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
