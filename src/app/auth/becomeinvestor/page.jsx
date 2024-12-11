"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "/public/images/logo.svg";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useBecomeAnInvestorMutation } from "@/redux/features/users/UserApi";

const Becomeinvestor = ({
  title = "Become an Investor",
  description = "Please fill the valid information to create an investor account",
}) => {
  const router = useRouter();
  const [becomeAnInvestor] = useBecomeAnInvestorMutation();
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    location: "",
    roomnumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the mutation with form data
      const response = await becomeAnInvestor({
        email: formData.email,
        rooms: formData.roomnumber,
        phone: formData.firstname,
        location: formData.location,
      });

      console.log(response);

      if (response.data?.success) {
        Swal.fire({
          title: "Submitted!",
          text: response.data?.message || "Details submitted successfully, please wait for approval",
          icon: "success",
        }).then(() => {
          router.push('/');
        });
      } else {
        Swal.fire({
          title: "Something went wrong!",
          text: response.error?.data?.message || "An error occurred, please try again.",
          icon: "error",
        }).then(() => {
          router.push('/auth/ownerSignup');
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Submission Failed",
        text: error.message || "An unexpected error occurred",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFFFFF1A]">
      <div className="bg-[#060000] p-[40px] w-full max-w-2xl rounded-lg space-y-4">
        <Image
          src={logo}
          alt="Logo"
          className="mb-4"
          height={200}
          width={200}
        />
        <h2 className="text-2xl font-bold text-center text-white pt-12">{title}</h2>
        <p className="text-[#FFFFFFE5] text-center max-w-xs mx-auto opacity-70 text-sm">{description}</p>

        <form onSubmit={handleSubmit} className="mt-4 w-full space-y-4">
          <div>
            <label className="text-[#FFFFFF] text-[16px] font-medium" htmlFor="firstname">
              Contact number*
            </label>
            <input
              id="firstname"
              name="firstname"
              type="number"
              placeholder="Enter your phone number"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full h-[44px] bg-[#242424] border-none rounded-lg placeholder:text-[#FFFFFF99] text-[#FFFFFF99] p-2"
              required
            />
          </div>

          <div>
            <label className="text-[#FFFFFF] text-[16px] font-medium" htmlFor="email">
              Email*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-[44px] bg-[#242424] border-none rounded-lg placeholder:text-[#FFFFFF99] text-[#FFFFFF99] p-2"
              required
            />
          </div>

          <div className="lg:flex flex-row items-center space-x-4 pb-4">
            <div>
              <label className="text-[#FFFFFF] text-[16px] font-medium" htmlFor="location">
                Property/Home Location*
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Property/Home"
                value={formData.location}
                onChange={handleChange}
                className="w-full h-[44px] bg-[#242424] border-none rounded-lg placeholder:text-[#FFFFFF99] text-[#FFFFFF99] p-2"
                required
              />
            </div>

            <div>
              <label className="text-[#FFFFFF] text-[16px] font-medium" htmlFor="roomnumber">
                Number of rooms*
              </label>
              <input
                id="roomnumber"
                name="roomnumber"
                type="number"
                placeholder="Number of rooms"
                value={formData.roomnumber}
                onChange={handleChange}
                className="w-full h-[44px] bg-[#242424] border-none rounded-lg placeholder:text-[#FFFFFF99] text-[#FFFFFF99] p-2"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-[44px] bg-[#EBCA7E] text-[#0F0F0F] font-bold rounded-lg mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Becomeinvestor;
