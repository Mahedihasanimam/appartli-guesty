// "use client";
// import React, { useState } from "react";
// import { Input, Form, Button } from "antd";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "/public/images/logo.svg";
// import { useDispatch } from "react-redux";
// import { useVerifyEmailMutation } from "@/redux/features/users/UserApi";
// import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";

// const VerifyEmail = ({
//   title = "Verify email",
//   description = "We will send a 4-digit verification code to your email",
//   onLogin,
//   onForgotPassword,
//   onFacebookLogin,
//   onGoogleLogin,
//   showSocialButtons = true,
// }) => {
//   const [form] = Form.useForm();
// const dispatch=useDispatch()
// const router=useRouter()
// const [verifyemail,{isLoading}]=useVerifyEmailMutation()
//   const handleFinish = async(values) => {
//     console.log(values.email)
    
//     const respons=await verifyemail({email:values?.email})
//     console.log(respons)
//     if(respons?.data?.success){
//       Swal.fire({
//         title: 'Code Sended',
//         text: 'check your eamil for verify code ',
//         icon: 'success',
//         confirmButtonText: 'OK',
//         confirmButtonColor: '#EBCA7E',
//       }).then(() => {
//         router.push(`/auth/verifyOTP?email=${encodeURIComponent(values.email)}`);
//       });
//     }
//     if (onLogin) {
//       onLogin(values);
//     }
//     form.resetFields();
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-[#FFFFFF1A]">
//       <div className="bg-[#060000] p-[40px] w-full max-w-xl rounded-lg space-y-4">
//         <Image src={logo} alt="Logo" className="mb-4" height={200} width={200} />
//         <h2 className="text-2xl font-bold text-center text-white pt-12">{title}</h2>
//         <p className="text-[#FFFFFFE5] text-center max-w-xs mx-auto opacity-70 text-sm">{description}</p>

//         <Form form={form} onFinish={handleFinish} className="mt-4">
//           <Form.Item
//             name="email"
//             rules={[{ required: true, message: "Please enter your email" }]}
//           >
//             <Input
              // style={{
              //   height: "44px",
              //   backgroundColor: "#242424",
              //   border: "none",
              //   color: "#FFFFFF99",
              // }}
//               type="email"
//               placeholder="Enter your Email"
//               className="rounded-lg placeholder:text-[#FFFFFF99]"
//             />
//           </Form.Item>
//           {/* <Link href="/auth/verifyOTP">
//           </Link> */}
//             <Button
              // style={{
              //   height: "44px",
              //   backgroundColor: "#EBCA7E",
              //   border: "none",
              //   color: "#0F0F0F",
              // }}
//               type="primary"
//               htmlType="submit"
//               className="w-full mt-12 bg-[#EBCA7E] font-bold"
//             >
//               Submit
//             </Button>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;


"use client";
import React, { useState } from "react";
import { Input, Form, Button } from "antd";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/images/logo.svg";
import { useDispatch } from "react-redux";
import { useVerifyEmailMutation } from "@/redux/features/users/UserApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const VerifyEmail = ({
  title = "Verify email",
  description = "We will send a 4-digit verification code to your email",
  onLogin,
}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [verifyemail, { isLoading }] = useVerifyEmailMutation();

  const handleFinish = async (values) => {
    try {
      console.log(values.email);

      const response = await verifyemail({ email: values?.email });

      if (response?.data?.success) {
        Swal.fire({
          title: 'Code Sent',
          text: 'Check your email for the verification code.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#EBCA7E',
        }).then(() => {
          router.push(`/auth/verifyOTP?email=${encodeURIComponent(values.email)}`);
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: response?.data?.message || 'Failed to send the verification code.',
          icon: 'error',
          confirmButtonText: 'Retry',
          confirmButtonColor: '#EBCA7E',
        });
      }
    } catch (error) {
      console.error('Error during email verification:', error);
      Swal.fire({
        title: 'Something went wrong!',
        text: 'Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EBCA7E',
      });
    }

    if (onLogin) {
      onLogin(values);
    }
    form.resetFields();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFFFFF1A]">
      <div className="bg-[#060000] p-[40px] w-full max-w-xl rounded-lg space-y-4">
        <Image src={logo} alt="Logo" className="mb-4" height={200} width={200} />
        <h2 className="text-2xl font-bold text-center text-white pt-12">{title}</h2>
        <p className="text-[#FFFFFFE5] text-center max-w-xs mx-auto opacity-70 text-sm">{description}</p>

        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input style={{
                height: "44px",
                backgroundColor: "#242424",
                border: "none",
                color: "#FFFFFF99",
              }} placeholder="Enter your email" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{
              height: "44px",
              backgroundColor: "#EBCA7E",
              border: "none",
              color: "#0F0F0F",
              width:"100%",
              fontWeight:'500'
            }}
          >
            Send Verification Code
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmail;
