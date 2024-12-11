"use client";
import React, { useState } from "react";
import { Card, Button, Tabs, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import imageone from "/public/images/about.png";
import imagetow from "/public/images/user.png";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import { imageUrl } from "@/redux/api/ApiSlice";
import Swal from "sweetalert2";
import { useChangeReservationRoleMutation } from "@/redux/features/reservation/ReservationApi";

const UserCard = ({ user }) => {
const [changeReservationRole]=useChangeReservationRoleMutation()
  const router = useRouter();
  const pathname=usePathname()
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  console.log('path nameeee',pathname)
  const handleMakeitChecking = async (id) => {
  if (!pathname) {
    console.error("Router pathname is not defined.");
    return;
  }
  let checkinCheckoutStatus = "";

  // Dynamically set the status based on the route's pathname
  if (pathname.includes("/allupcomingresarvation")) {
    checkinCheckoutStatus = "checkin";
  } else if (pathname.includes("/allCheckingInResarvation")) {
    checkinCheckoutStatus = "checkout";
  }else if (pathname.includes("/allChecOutResarvation")) {
    checkinCheckoutStatus = "checkout";
  }
  const allinfo = {
    reservationId: id,
    checkinCheckoutStatus, // Use the dynamic status here
  };
   

    // const result=await changeReservationRole(allinfo)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm"
    }).then(async(result) => {
      if (result.isConfirmed) {

        const result=await changeReservationRole(allinfo)
          if(result?.data?.success){

            Swal.fire({
              title: "completed",
              text: `check the ${checkinCheckoutStatus} tab`,
              icon: "success"
            });
          }

      }
    });

    setIsModalVisible(false)


  }

  const handleCancel=()=>{
    setIsModalVisible(false)
  }
  return (
    <div>
      <Card
        onClick={showModal}
        className="bg-[#242424] border-none text-white w-full rounded-lg shadow-lg  my-6"
      >
        <div className="lg:flex flex-row lg:space-y-0 space-y-6 items-center">
          <Image
          height={200}
          width={200}
            src={imageUrl+user?.property?.images[0]}
            alt="User"
            className="w-[400px]  h-[164px] rounded-lg  object-cover"
          />
          <div className="ml-6 flex justify-around  w-full items-center text-white">
            <div className="space-y-2 text-[16px] text-[#FFFFFFB2]">
              <p>Name: </p>
              <p>Email: </p>
              <p>Contact: </p>
              <p>Location:  </p>
            </div>
            <div className="space-y-2 text-[16px] text-[#FFFFFFB2]">
              <p> {user?.user?.fullName}</p>
              <p>{user?.user?.email}</p>
              <p> {user?.user?.phone}</p>
              <p>{user?.user?.location}</p>
            </div>
          </div>
          <div className="ml-6 flex justify-around  w-full items-center text-white">
            <div className="space-y-2 text-[16px] text-[#FFFFFFB2]">
              <p>Check in date: </p>
              <p>Stay for:</p>
              <p>Guest:</p>
              <p>Pay:  </p>
            </div>
            <div className="space-y-2 text-[16px] text-[#FFFFFFB2]">
              <p> {new Date(user?.checkInDate).toLocaleDateString()}</p>
              <p>{Math.floor((new Date(user?.checkOutDate) - new Date(user?.checkInDate)) / (1000 * 60 * 60 * 24))}</p>
              <p>{user?.guests}</p>
              <p> $ {user?.totalPrice}</p>
            </div>
          </div>
        </div>
      </Card>

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        closeIcon={<MdClose className="text-white" />}
        className="custom-modal"
        bodyStyle={{
          backgroundColor: "#242424",
          padding: "20px",
          borderRadius: "8px",
        }}
        style={{
          backgroundColor: "#242424", // Black overlay with some opacity
        }}
      >
        <div className="text-white">
        <Image
          height={200}
          width={200}
            src={imageUrl+user?.property?.images[0]}
            alt="User"
            className="w-[400px]  h-[164px] rounded-lg  object-cover"
          />
          <h3 className="text-lg font-bold mb-2 text-center">{user.name}</h3>
         <div className="flex items-center justify-between py-6 space-x-4">
         <div className="text-sm space-y-2 text-[#FFFFFFB2] ">
            <strong>Email:</strong>
            <p>Contact:</p>
            <p>Location:</p>
            <p>Check-in date:</p>
            <p>Stay for:</p>
            <p>Guests:</p>
            <p>Pay:</p>
          </div>
          <div className="text-sm space-y-2 text-[#FFFFFFB2]">
          <p>{user?.user?.email}</p>
          <p> {user?.user?.phone}</p>
            <p>{user?.user?.location}</p>
            <p>{user?.checkInDate}</p>
            <p>{Math.floor((new Date(user?.checkOutDate) - new Date(user?.checkInDate)) / (1000 * 60 * 60 * 24))}</p>
            <p>{user?.guests }</p>
            <p>{user?.totalPrices}</p>
          </div>
         </div>

          <button
            onClick={()=>handleMakeitChecking(user?._id)}
            className="bg-secoundary text-black mt-4 w-full py-2 rounded-md font-semibold bg-[#EBCA7E]"
          >
            Complete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserCard;
