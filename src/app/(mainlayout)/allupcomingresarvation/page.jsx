"use client";
import UserCard from "@/components/ui/UserCard";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Pagination } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdOutlineChevronLeft } from "react-icons/md";
import imageone from "/public/images/about.png";
import imagetow from "/public/images/user.png";
import { useSelector } from "react-redux";
import { useLogdinuserReservationQuery } from "@/redux/features/Propertyapi/page";

const Page = () => {
const {data,isLoading}=useLogdinuserReservationQuery()
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const upcommingReservations = data?.rooms?.filter((reservation) => reservation.checkinCheckoutStatus === 'upcoming' );
  // Dummy data

console.log(data)
  console.log('upppp',upcommingReservations)
  const filteredUsers = upcommingReservations?.filter((u) =>
    u?.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const router = useRouter();
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mt-12">
        <h2 className="text-[28px] flex space-x-2 items-center font-bold mb-6 text-white">
          <button onClick={() => router.back()} className="focus:outline-none">
            <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
          </button>
          Your Reservation
        </h2>
        <Button
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#EBCA7E",
          }}
          className="text-sm font-semibold underline"
        >
          All Reservations
        </Button>
      </div>

      <Input
        prefix={<SearchOutlined />}
        style={{
            backgroundColor: "transparent",
            border: "1px solid #FFFFFF",
            color: "#EBCA7E",
            height: "40px",
        }}
        placeholder="Search by user name"
        className="mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
        <Button style={{backgroundColor: "#EBCA7E", fontWeight: "bold",color:"black"}}>upcoming ({upcommingReservations?.length}) </Button>

      <div>
        {paginatedUsers?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

         {/* Pagination Component */}
         <div className="flex justify-center items-center gap-4 mt-8 border-t-2 border-[#424242] p-6 w-full">
        <div className="flex justify-between items-center gap-4 w-full">
          <div className="text-center text-white mt-2">
            Page {currentPage} of {Math.ceil(filteredUsers?.length / pageSize)}
          </div>
          <Pagination
            current={currentPage}
            total={filteredUsers?.length}
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
          <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredUsers?.length / pageSize)))}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
