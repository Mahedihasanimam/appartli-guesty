

'use client';
import React from "react";
import { Input, Form, Button, Space } from "antd";
import logo from "/public/images/logo.svg";
import Image from "next/image";
import fbimage from "/public/icons/fb.svg";
import googleimg from "/public/icons/google.svg";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/firebase/Firebase.config";
import { useLoginOwnerMutation, useSocialLoginMutation } from "@/redux/features/users/UserApi";
import { setUser } from "@/redux/features/users/userSlice";
import { useDispatch } from "react-redux";


const GuestLogin = ({
  title = "OwnarLogin",
  description = "Enter your email & password which had used to create Appartali account",
  onLogin,
  onForgotPassword,
  showSocialButtons = true,
}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginOwnerMutation();
  const [socialLogin, { socialIsLoading }] = useSocialLoginMutation();
  const dispatch = useDispatch();
  const handleFinish = async (values) => {

    try {
      const response = await loginUser(values).unwrap(); // Unwraps the result to handle errors more easily
      console.log(response);
      if (response.success) {
        if (onLogin) {
          onLogin(response);
        }

        if (typeof window !== 'undefined') {

          localStorage.setItem("token", response.data?.token);
        }

        dispatch(setUser(response.data?.user));
        Swal.fire({
          title: 'Login Successful!',
          text: 'You have logged in successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#EBCA7E',
        }).then(() => {
          router.push('/');
        });

        form.resetFields();

      }
    } catch (error) {
      Swal.fire("Login Failed", error.data?.message || "Something went wrong", "error");
    }
  };

  const handlesignup = () => {
    Swal.fire({
      title: "SignUp Successful!",
      text: "You have signed up successfully.",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#EBCA7E",
    }).then(() => {
      router.push("/");
    });
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
        image:photoURL
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
      <div className="bg-[#060000] p-[40px] w-full max-w-xl rounded-lg space-y-4">
        <Image src={logo} alt="Logo" className="mb-4" height={200} width={200} />
        <h2 className="text-2xl font-bold text-center text-white pt-12">{title}</h2>
        <p className="text-[#FFFFFFE5] text-center max-w-2xl mx-auto opacity-70 text-sm">{description}</p>

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

        <Form form={form} onFinish={handleFinish} className="mt-4">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              style={{
                height: "44px",
                backgroundColor: "#242424",
                border: "none",
                color: "#FFFFFF99",
              }}
              type="email"
              placeholder="Enter your Email"
              className="rounded-lg placeholder:text-[#FFFFFF99]"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              style={{
                height: "44px",
                backgroundColor: "#242424",
                border: "none",
                color: "#FFFFFF99",
              }}
              placeholder="Enter your Password"
              className="rounded-lg ant-input"
            />
          </Form.Item>
          <div className="flex justify-end items-center">
            <Link
              href="/auth/verifyEmail"
              className="text-secondary border-b border-secondary hover:text-[#EBCA7E]"
              onClick={onForgotPassword}
            >
              Forgot password
            </Link>
          </div>
          <Button
            style={{
              height: "44px",
              backgroundColor: "#EBCA7E",
              border: "none",
              color: "#0F0F0F",
            }}
            type="primary"
            htmlType="submit"
            className="w-full mt-12 bg-[#EBCA7E] font-bold"
            loading={isLoading}
          >
            Log in
          </Button>
        </Form>
        <p className="mt-2 text-center text-sm text-white">
          Don’t have an account?{" "}
          <Link href="/auth/ownerSignup" className="text-[#EBCA7E]">SignUp as Owner</Link>
        </p>
      </div>
    </div>
  );
};

export default GuestLogin;
