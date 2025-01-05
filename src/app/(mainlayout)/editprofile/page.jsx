"use client";
import {
  CameraFilled,
  MobileFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import userimg from "/public/images/user.png";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineChevronLeft } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { useUpdateProfileMutation } from "@/redux/features/users/UserApi";
import { useDispatch, useSelector } from "react-redux";
import { imageUrl } from "@/redux/api/ApiSlice";
import Swal from "sweetalert2";
import { setUser } from "@/redux/features/users/userSlice";

const Page = () => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const fileInputRef = useRef(null);

  // Synchronize local state with Redux user state
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setContactNumber(user.contactNumber || "");
      setAddress(user.address || "");
    }
  }, [user]); // Run this effect whenever `user` changes

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBlogImage(file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("contactNumber", contactNumber);
    formData.append("address", address);
    if (blogImage) {
      formData.append("image", blogImage);
    }
  
    try {
      const response = await updateProfile(formData).unwrap();
      dispatch(setUser(response)); // Update Redux store
      console.log("Profile updated successfully:", response);
  
      // Update the local state for image
      if (response?.image) {
        setSelectedImage(imageUrl + response.image);
      }
  
      if (response?.success) {
        Swal.fire({
          title: "Success!",
          text: response?.message,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };
  
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="container mx-auto bg-transparent text-white py-12 min-h-[700px]">
      <h2 className="text-xl flex space-x-2 items-center font-semibold mb-6">
        <button onClick={() => router.back()} className="focus:outline-none">
          <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
        </button>
        My profile
      </h2>

      <div className="lg:flex flex-row lg:space-y-0 space-y-12 justify-between px-4">
        <div className="max-w-xl w-full">
          <div className="flex items-center space-x-4">
            <div className="relative w-fit">
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

                  {user?.role?.map((i,idx)=><span key={idx} className="pr-1">{i}</span>)}
                </p>
              </div>
            </div>
            <div className="bg-[#EBCA7E] rounded-full w-[74px] h-[32px] flex justify-center items-center space-x-2 absolute -bottom-4 left-1 text-black font-bold">
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <CameraFilled className="text-xl" />
                  <span>Add</span>
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

          </div>
        </div>

        <div className="w-full ">
          <h1 className="text-[28px] font-bold pb-12">About You</h1>
          <div className="space-y-4 w-full ">
            <div className="lg:flex flex-row items-center lg:space-x-4 space-y-4">
              <Input
                size="large"
                style={{ backgroundColor: "#242424" }}
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#242424] text-[#FFFFFFCC] opacity-70 text-[16px]"
              />
              <Input
                style={{ backgroundColor: "#242424" }}
                placeholder="Last Name"
                size="large"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#242424] text-[#FFFFFFCC] opacity-70 text-[16px]"
              />
            </div>
            <div className="lg:flex flex-row items-center lg:space-x-4 space-y-4">
              <Input
                style={{ backgroundColor: "#242424" }}
                prefix={<MobileFilled className="text-[#FFFFFFCC]  text-2xl" />}
                size="large"
                placeholder="Enter your contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="bg-[#242424] text-[#FFFFFFCC] opacity-70 text-[16px]"
              />
              <Input
                style={{ backgroundColor: "#242424" }}
                prefix={<CiGlobe className="text-[#FFFFFFCC]  text-3xl" />}
                size="large"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-[#242424] text-[#FFFFFFCC] opacity-70 text-[16px]"
              />
            </div>

      
          </div>

          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#EBCA7E",
              width: "240px",
              height: "44px",
              color: "#000000",
            }}
            type="primary"
            className="border-none text-black font-bold mt-12"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
