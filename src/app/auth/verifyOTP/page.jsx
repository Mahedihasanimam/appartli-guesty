"use client";
import React, { useState, useEffect } from "react";
import { Input, Form, Button } from "antd";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/images/logo.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { useOtpVerifyMutation, useVerifyEmailMutation } from "@/redux/features/users/UserApi";
import Swal from "sweetalert2";

const VerifyOTP = ({ title = "OTP Verification",searchParams }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [form] = Form.useForm();
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [verifyOTPCode, { isLoading: verifyotpcodeLoading }] = useOtpVerifyMutation();
  const [verifyEmail, { isLoading: resendLoading }] = useVerifyEmailMutation();
  // console.log(searchParams);
  // Extract email from query parameters
  useEffect(() => {
    const queryEmail = searchParams?.email;
    if (queryEmail) {
      setEmail(queryEmail);
    }
  }, [searchParams]);

  const description = `We’ve sent you a verification code to ${email || "your email"}`;

  const handleFinish = async () => {
    const otpValue = otp.join("");
    console.log("Success:", { otp: otpValue });

    try {
      const response = await verifyOTPCode({ email, emailVerifyCode: otpValue });

      if (response.data?.success) {
        await Swal.fire({
          title: response?.data?.message,
          text: "Email verified successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#EBCA7E",
        });
        router.push(`/auth/createnewPassoword?email=${encodeURIComponent(email)}`);
      } else {
        throw new Error(response?.data?.message || "Verification failed");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      await Swal.fire({
        title: "Something went wrong!",
        text: "Please try again later",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#EBCA7E",
      });
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await verifyEmail({ email });
      if (response.data?.success) {
        await Swal.fire({
          title: "Verification code sent",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#EBCA7E",
        });
      } else {
        throw new Error(response?.data?.message || "Failed to resend verification code");
      }
    } catch (error) {
      console.error("Error resending verification code:", error);
      await Swal.fire({
        title: "Something went wrong!",
        text: "Please try again later",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#EBCA7E",
      });
    }
  };

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFFFFF1A]">
      <div className="bg-[#060000] p-[40px] w-full max-w-xl rounded-lg space-y-4">
        <div className="text-center mb-6">
          <Image src={logo} alt="Logo" width={150} height={50} />
          <h2 className="text-2xl font-bold mt-4">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <Form form={form} onFinish={handleFinish}>
          <div className="flex max-w-xs mx-auto justify-between mb-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                maxLength={1}
                value={digit}
                style={{backgroundColor:"#242424",color:"white",fontWeight:'700'}}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 text-center text-xl border rounded"
              />
            ))}
          </div>
          <Button
            type="primary"
            htmlType="submit"
            loading={verifyotpcodeLoading}
            className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
            style={{
              height: "44px",
              backgroundColor: "#EBCA7E",
              border: "none",
              color: "#0F0F0F",
              width:"100%",
              fontWeight:'500'
            }}
          >
            Verify OTP
          </Button>
        </Form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Didn’t receive the code?{" "}
            <Button
              type="link"
              onClick={handleResendOTP}
              loading={resendLoading}
              className="text-yellow-500"
            >
              Resend OTP
            </Button>
          </p>
        </div>
        <div className="mt-4 text-center">
          <Link href="/auth/login" className="text-gray-500">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
