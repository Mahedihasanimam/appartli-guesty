"use client";
import { useAddRatingsMutation, useLogdinuserReservationQuery } from "@/redux/features/Propertyapi/page";
import { Avatar, Button, Card, Modal, Rate, Table } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineChevronLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import imageone from "/public/images/user.png";
import Image from "next/image";
import { imageUrl } from "@/redux/api/ApiSlice";
import { PiSprayBottleDuotone } from "react-icons/pi";
import { IoKeySharp } from "react-icons/io5";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { RiCircleLine } from "react-icons/ri";
import { MobileOutlined, UserOutlined } from "@ant-design/icons";
import { CiGlobe } from "react-icons/ci";
import Swal from "sweetalert2";
import ProfileProtect from "@/components/ProfileProtect";



const Profile = () => {
  const user = useSelector((state) => state.user.user?.data);
  // console.log(' main user',user)
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

  const realData = logdinUserReservation?.rooms?.slice(-8).map((room, index) => ({
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


  const createdAtDate = new Date(user?.createdAt);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in years, months, and days
  let years = currentDate.getFullYear() - createdAtDate.getFullYear();
  let months = currentDate.getMonth() - createdAtDate.getMonth();
  let days = currentDate.getDate() - createdAtDate.getDate();

  // Adjust months and years based on the date difference
  if (months < 0) {
    months += 12;
  }
  if (days < 0) {
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Determine which unit to display
  let timeAgo = '';
  if (years > 0) {
    timeAgo = `${years} year${years > 1 ? 's' : ''}`;
  } else if (months > 0) {
    timeAgo = `${months} month${months > 1 ? 's' : ''}`;
  } else {
    timeAgo = `${days} day${days > 1 ? 's' : ''}`;
  }







  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (

    <ProfileProtect>

    <div className="p-4 container mx-auto text-white">
      <div>
        {/* Header */}
        <h2 className="text-xl flex space-x-2 items-center font-semibold mb-6">
          <button onClick={() => router.back()} className="focus:outline-none">
            <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
          </button>
          My profile
        </h2>





        <div className="lg:flex flex-row space-x-6 mb-8 ">
          <Card className="bg-[#2C2C2E] w-full max-w-sm  p-4 border-none h-fit">
            <div className="text-white flex items-center w-fit mx-auto space-x-2 ">
              {
                user?.image ? <Avatar size={80} className="bg-gray-400">
                  <Image width={80}
                    height={80} src={imageUrl + user?.image} alt="Avatar" />
                </Avatar> : <div className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-gray-400 "> <UserOutlined className="text-xl " /></div>
              }

              <div>
                <h3 className="text-lg font-semibold">{user?.fullName || user?.firstName}</h3>
                <p className="text-[#FFFFFF66]">

                {user?.role?.map((item,idx)=><span key={idx} className="pr-1">{item}</span>)}
                </p>
              </div>
            </div>
            
            <p className="text-[#FFFFFFCC] font-medium  mt-2 text-center">
              {timeAgo} on Appartali
            </p>
          </Card>
          <Card className="bg-transparent lg:w-2/3 w-full p-4 border-none h-fit text-[#FFFFFF]">
            <h3 className="text-[28px] font-bold text-[#FFFFFF] mb-4">
              About {user?.fullName || user?.firstName}
            </h3>
            <Button
              onClick={() => router.push("/editprofile")}
              style={{ backgroundColor: "transparent", color: "#EBCA7E" }}
              className="bg-transparent border-[1px] border-secoundary rounded-[4px] w-fit px-4 py-2 text-sm font-semibold text-secoundary font-bold  mb-4"
            >
              Edit Profile
            </Button>
            <div className="space-y-4 lg:flex flex-row items-center justify-between">
              <div className="space-y-3">
                <p className="flex gap-3  text-[16px] text-white font-medium">
                  {" "}
                  <MobileOutlined className="text-[24px]" /> Contact number:{" "}
                  <span className="text-white opacity-70"> {user?.phone}</span>
                </p>
                <p className="flex gap-3 text-[16px] text-white font-medium">
                  {" "}
                  <CiGlobe className="text-[24px]" /> Lives in:{" "}
                  <span className="text-white opacity-70">
                    {user?.location}
                  </span>
                </p>
              </div>


            </div>
          </Card>
        </div>

      </div>

      {/* Booking List */}
      <div className="p-2 rounded-md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold mb-4">Booking list</h3>
          <Button
            onClick={() => router.push("/bookingList")}
            style={{ backgroundColor: "transparent", color: "#EBCA7E" }}
            className="bg-transparent border-[1px] border-secoundary rounded-[4px] w-fit px-4 py-2 text-sm font-semibold text-secoundary font-bold mb-4"
          >
            See all
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={realData}
            pagination={false}
            className="custom-table"
            scroll={{ x: "max-content" }}
          />
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
    </ProfileProtect>
  );
};

export default Profile;
