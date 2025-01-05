"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "/public/images/logo.svg";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/features/users/UserApi";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Importing icons from react-icons

const VerifyEmail = ({
  title = "Create New Password",
  description = "You have to create a new password",
  searchParams
}) => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [email, setEmail] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

  // Extract email from query parameters
  useEffect(() => {
    const queryEmail = searchParams?.email;
    if (queryEmail) {
      setEmail(queryEmail);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newpassword !== confirmpassword) {
      Swal.fire({
        title: 'Error',
        text: 'Passwords do not match. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EBCA7E',
      });
      return;
    }

    if (!email) {
      Swal.fire({
        title: 'Error',
        text: 'Email is required. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EBCA7E',
      });
      return;
    }

    try {
      const response = await resetPassword({ email, newPassword: newpassword, confirmPassword: confirmpassword }).unwrap();
      Swal.fire({
        title: 'Success',
        text: response.message || 'Password reset successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EBCA7E',
      });
      router.push('/');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.data?.message || 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EBCA7E',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFFFFF1A]">
      <div className="bg-[#060000] p-[40px] w-full max-w-xl rounded-lg space-y-4">
        <Image src={logo} alt="Logo" className="mb-4" height={200} width={200} />
        <h2 className="text-2xl font-bold text-center text-white pt-12">{title}</h2>
        <p className="text-[#FFFFFFE5] text-center max-w-xs mx-auto opacity-70 text-sm">{description}</p>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="w-full mb-4">
            <label htmlFor="newpassword" className="text-[#FFFFFF] text-[16px] font-medium">New Password*</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                id="newpassword"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#242424] text-[#FFFFFF99] border-none"
                placeholder="Enter your new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
              >
                {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
              </button>
            </div>
          </div>

          <div className="w-full mb-4">
            <label htmlFor="confirmpassword" className="text-[#FFFFFF] text-[16px] font-medium">Confirm Password*</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                id="confirmpassword"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#242424] text-[#FFFFFF99] border-none"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle visibility
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
              >
                {showConfirmPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-12 bg-[#EBCA7E] text-[#0F0F0F] font-bold p-3 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
