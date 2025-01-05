


"use client";
import { Button, Rate, Table, Pagination, DatePicker, Modal } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import imageone from "/public/images/user.png";
import { MdOutlineChevronLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { PiSprayBottleDuotone } from "react-icons/pi";
import { IoKeySharp } from "react-icons/io5";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { RiCircleLine } from "react-icons/ri";
import { useAddRatingsMutation, useLogdinuserReservationQuery } from "@/redux/features/Propertyapi/page";
import { useSelector } from "react-redux";
import { imageUrl } from "@/redux/api/ApiSlice";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const user = useSelector((state) => state.user.user);
  const { isLoading, data: logdinUserReservation } = useLogdinuserReservationQuery();
  const [addRatings, { isLoading: ratingLoading, isError, isSuccess }] = useAddRatingsMutation();
  const router = useRouter();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [ratings, setRatings] = useState({
    cleanliness: 0,
    checkin: 0,
    communication: 0,
    values: 0, // Changed from `values` for consistency
  });

  const handleRatingChange = (field, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [field]: value,
    }));
  };

  const handleReviewClick = (propertyId) => {
    setRatings({
      cleanliness: 0,
      checkin: 0,
      communication: 0,
      values: 0,
    });
    setSelectedPropertyId(propertyId);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    const dataToSubmit = { ...ratings, propertyId: selectedPropertyId };

    try {
      const response = await addRatings(dataToSubmit).unwrap(); // API call with full data
      if (response?.success) {
        Swal.fire({
          title: 'success!',
          text: response?.message,
          icon:'success'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'oppps..!',
        text: 'something went wrong',
        icon:'error'
      })
    }

    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const realData = logdinUserReservation?.rooms?.map((room, index) => ({
    key: index + 1,
    roomId: room?.property?.roomId,
    checkin: room.checkInDate,
    checkOut: room.checkOutDate || "---",
    Imageurl: room?.property?.images[0],
    review: room?.property?.totalRatings ? (
      <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={room?.property?.totalRatings} />
    ) : (
      <a onClick={() => handleReviewClick(room?.property?._id)} className="text-[#EBCA7E]">
        Give review
      </a>
    ),
  })) || [];

  const columns = [
    {
      title: "Room Id",
      dataIndex: "roomId",
      key: "roomId",
      render: (text, record) => (
        <div className="flex items-center space-x-2">
          <Image
            src={imageUrl + record?.Imageurl || "/fallback-image.png"}
            alt="Room"
            width={50}
            height={50}
            className="rounded-lg"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Check in",
      dataIndex: "checkin",
      key: "checkin",
      render: (_, record) => (
        <span>{new Date(record.checkin).toLocaleDateString()}</span>
      ),
    },
    {
      title: "Check out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (_, record) => (
        <span>{new Date(record.checkOut).toLocaleDateString()}</span>
      ),
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
    },
  ];

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  // Calculate paginated data
  const paginatedData = realData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const handlePageChange = (key) => {
    setCurrentPage(1);
  };
  return (
    <div className="container mx-auto my-12">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl flex text-white space-x-2 items-center font-semibold mb-6">
            <button onClick={() => router.back()} className="focus:outline-none">
              <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
            </button>
            My profile
          </h2>
        </div>
        {/* <div>
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
        </div> */}
      </div>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={paginatedData}
          pagination={false} // Disable default pagination
          className="custom-table2 text-red-500"
          scroll={{ x: "max-content" }}
        />
      </div>
      {/* Pagination Component */}
      <div className="flex justify-center items-center gap-4 mt-8 border-t-2 border-[#424242] p-6 w-full">
        <div className="flex justify-between items-center gap-4 w-full">
          <div className="text-center text-white mt-2">
            Page {currentPage} of {Math.ceil(realData.length / pageSize)}
          </div>
          <Pagination
            current={currentPage}
            total={realData.length}
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
          <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(realData.length / pageSize)))}>
            Next
          </Button>
        </div>
      </div>
      

         {/* Review Modal */}
         <Modal
        width={700}
        className="custom-modal text-white"
        open={isModalVisible}
        
        onCancel={handleModalCancel}
        footer={[
          <Button
            key="submit"
            onClick={handleModalOk}
            style={{ backgroundColor: "#EBCA7E", height: "44px", width: "100%", color: "#0F0F0F", fontWeight: 700 }}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="lg:flex md:flex flex-row items-center justify-between space-y-4 pt-6">
          <div className="space-y-2 pt-4">
            <PiSprayBottleDuotone className="text-xl block mx-auto" />
            <p className="text-[16px] font-medium text-center">Cleanliness:</p>
            <Rate onChange={(value) => handleRatingChange("cleanliness", value)} value={ratings.cleanliness} />
          </div>
          <div className="space-y-2">
            <IoKeySharp className="text-xl block mx-auto" />
            <p className="text-[16px] font-medium text-center">Check in:</p>
            <Rate onChange={(value) => handleRatingChange("checkin", value)} value={ratings.checkin} />
          </div>
          <div className="space-y-2">
            <BiMessageRoundedDetail className="text-xl block mx-auto" />
            <p className="text-[16px] font-medium text-center">Communication:</p>
            <Rate onChange={(value) => handleRatingChange("communication", value)} value={ratings.communication} />
          </div>
          <div className="space-y-2">
            <RiCircleLine className="text-xl block mx-auto" />
            <p className="text-[16px] font-medium text-center">Value:</p>
            <Rate onChange={(value) => handleRatingChange("values", value)} value={ratings.values} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
