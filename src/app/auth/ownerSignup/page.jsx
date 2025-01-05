"use client";

import React, { useState } from "react";
import { Input, Button, Space, Checkbox } from "antd";
import logo from "/public/images/logo.svg";
import Image from "next/image";
import fbimage from "/public/icons/fb.svg";
import googleimg from "/public/icons/google.svg";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/firebase/Firebase.config";
import { useRegisterOwnerMutation, useSocialLoginMutation } from "@/redux/features/users/UserApi";

import { setUser } from "@/redux/features/users/userSlice";
import { useAppDispatch } from "@/redux/hooks";

const OwnerSignup = ({
  title = "Sign UP",
  description = "Please fill in valid information to create an Appartali account",
  showSocialButtons = true,
}) => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isAgreed, setIsAgreed] = useState(false);
  const [registerUser, { isLoading, error }] = useRegisterOwnerMutation();
  const [socialLogin, { socialIsLoading }] = useSocialLoginMutation();
 if(isLoading){
  return <p className="text-white text-4xl">Loading...</p>
 }
 console.log(error)



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };


  const handleFinish = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.phone) {
      return Swal.fire("Validation Failed", "Please fill all fields", "error");
    }

    if (!isAgreed) {
      return Swal.fire("Agreement Required", "You must agree to the terms and policy", "error");
    }

    try {
      const response = await registerUser(formData).unwrap();
      if (response.success) {
        // Save user data and token in localStorage
        if(typeof window !== 'undefined'){
          localStorage.setItem("token", response.data?.token);
        }

        dispatch(setUser(response.data?.user));
        Swal.fire({
          title: "SignUp successful!",
          text: response.message || "User created successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#EBCA7E",
        });

        // Redirect or take any action needed
        router.push("/"); // Example route
      }
    } catch (error) {
      console.error("Signup Error:", error);
      Swal.fire({
        title: "SignUp Failed",
        text: error.data?.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#EBCA7E",
      });
    }
  };

 

  const onGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User Data:", user);
      // TO DO : call the loginUser mutation with the user data
      const displayName = user.displayName;
      const [firstName, lastName] = displayName.split(" "); // Split by space
      const email = user.email;
      const photoURL = user.photoURL;


      const Googleuser = {
        firstName,
        lastName,
        email,
        photoURL
      }
      const response = await socialLogin(Googleuser) // (values).unwrap(); 
      if (response?.data?.success) {
        Swal.fire({
          title: 'Login Successful!',
          text: 'You have logged in successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#EBCA7E',
        }).then(() => {
          router.push('/');
        });
        // Store only the token in localStorage

        if(typeof window !== 'undefined'){

          localStorage.setItem("token", response.data?.data?.token);
        }

        // Dispatch action to set user data in RTK
        dispatch(setUser(response.data?.data?.user));
      }

    } catch (error) {
      Swal.fire("Login Failed", error.message, "error");
    }
  };

  const onFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Extract user information
      const displayName = user.displayName;
      const [firstName, lastName] = displayName.split(" ");
      const email = user.email;
      const photoURL = user.photoURL;

      const GoogleUser = {
        firstName,
        lastName,
        email,
        photoURL,
      };

      const response = await socialLogin(GoogleUser);
      if (response?.data?.success) {
        Swal.fire({
          title: 'Login Successful!',
          text: 'You have logged in successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#EBCA7E',
        }).then(() => {
          router.push('/');
        });

        // Store only the token in localStorage
        if(typeof window !== 'undefined'){
          
          localStorage.setItem("token", response.data?.data?.token);
        }

        // Dispatch action to set user data in RTK
        dispatch(setUser(response.data?.data?.user));
      }
    } catch (error) {
      Swal.fire("Login Failed", error.message, "error");
    }
  };

  return (

   
    <div className="flex justify-center items-center min-h-screen bg-[#FFFFFF1A]">
      <div className="bg-[#060000] p-[40px] w-full max-w-2xl rounded-lg space-y-4">
        <Image src={logo} alt="Logo" className="mb-4" height={200} width={200} />
        <h2 className="text-2xl font-bold text-center text-white pt-12">{title}</h2>
        <p className="text-[#FFFFFFE5] text-center max-w-xs mx-auto opacity-70 text-sm">{description}</p>

        {showSocialButtons && (
          <Space className="pb-4 w-full">
            <Button
              type="primary"
              className="w-full flex items-center justify-center"
              style={{ backgroundColor: "#1877f2", borderColor: "#1877f2", height: "44px" }}
              onClick={onFacebookLogin}
            >
              <Image src={fbimage} alt="Facebook" height={30} width={30} />
              Continue with Facebook
            </Button>
            <Button
              type="default"
              style={{ height: "44px" }}
              className="w-full p-4 flex items-center justify-center"
              onClick={onGoogleLogin}
            >
              <Image src={googleimg} alt="Google" height={30} width={30} />
              Continue with Google
            </Button>
          </Space>
        )}

        <form onSubmit={handleFinish} className="mt-4 w-full">
          <div className="w-full flex gap-[20px] items-center justify-between">
            <div className="w-full">
              <p className="text-[#FFFFFF] text-[16px] font-medium">First Name*</p>
              <Input
                name="firstName" // Corrected to match the state
                value={formData.firstName} // Corrected to match the state
                onChange={handleChange}
                style={{ height: "44px", backgroundColor: "#242424", border: "none", color: "#FFFFFF99" }}
                placeholder="Enter your first name"
                className="rounded-lg placeholder:text-[#FFFFFF99]"
              />
            </div>
            <div className="w-full">
              <p className="text-[#FFFFFF] text-[16px] font-medium">Last Name*</p>
              <Input
                name="lastName" // Corrected to match the state
                value={formData.lastName} // Corrected to match the state
                onChange={handleChange}
                style={{ height: "44px", backgroundColor: "#242424", border: "none", color: "#FFFFFF99" }}
                placeholder="Enter your last name"
                className="rounded-lg placeholder:text-[#FFFFFF99]"
              />
            </div>
          </div>

          <div className="w-full">
            <p className="text-[#FFFFFF] text-[16px] font-medium">Email*</p>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ height: "44px", backgroundColor: "#242424", border: "none", color: "#FFFFFF99" }}
              placeholder="Enter your Email"
              className="rounded-lg placeholder:text-[#FFFFFF99]"
            />
          </div>

          <div className="w-full flex gap-[20px] items-center justify-between">
            <div className="w-full">
              <p className="text-[#FFFFFF] text-[16px] font-medium">Password*</p>
              <Input.Password
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{ height: "44px", backgroundColor: "#242424", border: "none", color: "#FFFFFF99" }}
                placeholder="Enter your Password"
                className="rounded-lg ant-input"
              />
            </div>

            <div className="w-full">
              <p className="text-[#FFFFFF] text-[16px] font-medium">Contact Number*</p>
              <Input
                name="phone" // Corrected to match the state
                value={formData.phone} // Corrected to match the state
                onChange={handleChange}
                style={{ height: "44px", backgroundColor: "#242424", border: "none", color: "#FFFFFF99" }}
                placeholder="Enter your contact number"
                className="rounded-lg ant-input"
              />
            </div>
          </div>

          <div className="flex justify-start items-center space-x-2">
            <label htmlFor="termsCheckbox" className="flex items-center cursor-pointer">
              <Checkbox className="text-white opacity-70" checked={isAgreed} onChange={handleCheckboxChange} id="termsCheckbox">
                By creating your account you agree to the <span className="text-secoundary">terms of use</span> & our <span className="text-secoundary">privacy policy.</span>
              </Checkbox>
            </label>
          </div>

          <Button
            style={{ height: "44px", backgroundColor: "#EBCA7E", border: "none", color: "#0F0F0F" }}
            type="primary"
            htmlType="submit"
            className="w-full mt-12 bg-[#EBCA7E] font-bold"
          >
            Sign UP
          </Button>
        </form>

        <p className="text-[#FFFFFFE5] text-center text-sm">
          Already have an account? <Link href="/auth/OwnarLogin" className="text-secoundary">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default OwnerSignup;
