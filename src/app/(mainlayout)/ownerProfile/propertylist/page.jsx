'use client'
import React, { useState } from "react";
import Myproperty from "@/components/ui/Myproperty";
import { MdOutlineChevronLeft, MdOutlineWorkOutline } from "react-icons/md";
import { Button,DatePicker, Pagination } from 'antd';
import { useRouter } from 'next/navigation';
import dayjs from "dayjs";
import roomimage from "/public/images/myproperty.png";
const Page = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  
    const handleTabChange = (key) => {
    setCurrentPage(1);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
    const router = useRouter(); // Initialize router
    const roomsData = [
        // Sample data for rooms
        {
            "id": "1",
            "location": "Clichy, France",
            "host": "Stay with Sourav",
            "price": "$560.00",
            "rating": 4.74,
            "roomId": "569845",
            "date": "Feb 10 - Feb 15",
            "category": "Apartment",
            "image": roomimage
        },
        {
            "id": "2",
            "location": "Paris, France",
            "host": "Stay with Marie",
            "price": "$620.00",
            "rating": 4.82,
            "roomId": "678912",
            "date": "Mar 5 - Mar 10",
            "category": "Studio",
            "image": roomimage
        },
        {
            "id": "3",
            "location": "Nice, France",
            "host": "Stay with Pierre",
            "price": "$480.00",
            "rating": 4.68,
            "roomId": "345678",
            "date": "Apr 1 - Apr 6",
            "category": "Villa",
            "image": roomimage
        },
        {
            "id": "4",
            "location": "Lyon, France",
            "host": "Stay with Lucas",
            "price": "$530.00",
            "rating": 4.71,
            "roomId": "789012",
            "date": "May 15 - May 20",
            "category": "House",
            "image": roomimage
        },
        {
            "id": "5",
            "location": "Marseille, France",
            "host": "Stay with Chloe",
            "price": "$600.00",
            "rating": 4.80,
            "roomId": "234567",
            "date": "Jun 10 - Jun 15",
            "category": "Apartment",
            "image": roomimage
        },
        {
            "id": "6",
            "location": "Bordeaux, France",
            "host": "Stay with Anne",
            "price": "$550.00",
            "rating": 4.76,
            "roomId": "890123",
            "date": "Jul 20 - Jul 25",
            "category": "Cottage",
            "image": roomimage
        },
        {
            "id": "7",
            "location": "Marseille, France",
            "host": "Stay with Chloe",
            "price": "$600.00",
            "rating": 4.80,
            "roomId": "234567",
            "date": "Jun 10 - Jun 15",
            "category": "Apartment",
            "image": roomimage
        },
        {
            "id": "8",
            "location": "Bordeaux, France",
            "host": "Stay with Anne",
            "price": "$550.00",
            "rating": 4.76,
            "roomId": "890123",
            "date": "Jul 20 - Jul 25",
            "category": "Cottage",
            "image": roomimage
        },
        {
            "id": "9",
            "location": "Bordeaux, France",
            "host": "Stay with Anne",
            "price": "$550.00",
            "rating": 4.76,
            "roomId": "890123",
            "date": "Jul 20 - Jul 25",
            "category": "Cottage",
            "image": roomimage
        },
        {
            "id": "10",
            "location": "Marseille, France",
            "host": "Stay with Chloe",
            "price": "$600.00",
            "rating": 4.80,
            "roomId": "234567",
            "date": "Jun 10 - Jun 15",
            "category": "Apartment",
            "image": roomimage
        },
        {
            "id": "11",
            "location": "Bordeaux, France",
            "host": "Stay with Anne",
            "price": "$550.00",
            "rating": 4.76,
            "roomId": "890123",
            "date": "Jul 20 - Jul 25",
            "category": "Cottage",
            "image": roomimage
        }
    ];
  // Calculate paginated data
  const paginatedData = roomsData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    return (
        <div className="container mx-auto my-12">
            <div className="flex items-center justify-between mb-4">
            <h2 className="text-[28px] flex space-x-2 items-center font-bold mt-12 text-white pb-4">
        <button onClick={() => router.back()} className="focus:outline-none">
          <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
        </button>
        Property list
      </h2>
      <div>
          <DatePicker 
            onChange={handleDateChange} 
            format="DD MMM YYYY"
            value={selectedDate}
            style={{
              border: '1px solid #EBCA7E', // Remove default border
              backgroundColor: 'transparent', // Match Ant Design primary color
              color: 'white', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              cursor: 'pointer', 
              fontSize: '16px', // Font size
            }} 
          />
        </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-8">
                {paginatedData.map(item => (
                    <Myproperty key={item.id} data={item} />
                ))}
            </div>





        
      <div className="flex justify-center items-center gap-4 mt-8 border-t-2 border-[#424242] p-6 w-full">
        <div className="flex justify-between items-center gap-4 w-full">
          <div className="text-center text-white mt-2">
            Page {currentPage} of {Math.ceil(roomsData.length / pageSize)}
          </div>
          <Pagination
            current={currentPage}
            total={roomsData.length}
            pageSize={pageSize}
            onChange={handlePageChange}
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
    );
};

export default Page;
