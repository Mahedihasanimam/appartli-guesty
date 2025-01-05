"use client";
import { useContext, useEffect, useState } from "react";
import { Input, Button, Dropdown, Menu, Drawer, Modal, Select, Avatar } from "antd";
import { MenuOutlined, NotificationFilled, UserOutlined } from "@ant-design/icons";
import logo from "/public/images/logo.svg";
import gloval from "/public/icons/gloval.svg";
import user from "/public/icons/user.svg";
import Image from "next/image";
import Link from "next/link";

import imageone from '/public/images/user.png'
import { UserContext } from "@/app/lib/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "@/redux/features/users/userSlice";
import { useRouter } from "next/navigation";
import { useGetLoginUserByIdQuery, useLazyGetProfileQuery } from "@/redux/features/users/UserApi";
import { imageUrl } from "@/redux/api/ApiSlice";
const Navbar = () => {
const dispatch=useDispatch()
  const [getProfile,{isLoading}]=useLazyGetProfileQuery()
const addedToken=localStorage.getItem('token')

const handlesetUser=React.useCallback(async()=>{
  const user=await getProfile(addedToken)
 
  if(user?.data?.data){
    dispatch(setUser(user?.data?.data))
  }
},[])

useEffect(()=>{
  if(addedToken){
    handlesetUser()
  }
},[ addedToken,handlesetUser])



  const user = useSelector((state) => state.user.user);
//  console.log(user?._id)
  
  const router=useRouter()
  const {logoutUser,token}=useContext(UserContext)
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [isowner, setisowner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  

  // Retrieve the state from localStorage on initial render
  useEffect(() => {
    const storedIsOwner = localStorage.getItem("isOwner");
    if (storedIsOwner) {
      setisowner(JSON.parse(storedIsOwner));
    }
  }, []);

  const handleSwitch = () => {
    if (user?.role.includes("owner")) {
      const newIsOwner = !isowner;
      setisowner(newIsOwner);
      localStorage.setItem("isOwner", newIsOwner); 
    } else {
      router.push("/auth/becomeinvestor");
    }
  };

console.log("user",user?.role)
console.log("user",user?.role)


console.log(isowner)
// const userRole=user?.role
// const isownerr=userRole.map((role) => role === "owner")
// const isguest=userRole.map((role) => role === "guest")
// console.log('userRoleeeee',isownerr,isguest)
const showLanguageModal = () => {
  setLanguageModalVisible(true);
};

const handleLanguageModalCancel = () => {
  setLanguageModalVisible(false);
};
const handleLogut = () => {
  localStorage.removeItem('isOwner')
  logoutUser()
  dispatch(clearUser())
}
  const profileMenu = (
    <Menu
      style={{
        width: 200,
        backgroundColor: "#060000",
        color: "#ffffff !important",
      }}
    >
      <Menu.Item key="1" style={{ color: "#ffffff" }}>
        <Link href="/auth/GuestLogin"> Guest Log in</Link>
      </Menu.Item>
      <Menu.Item key="2" style={{ color: "#ffffff" }}>
        <Link href="/auth/OwnarLogin">Owner Log in</Link>
      </Menu.Item>
      <Menu.Item key="3" style={{ color: "#ffffff" }}>
        <a href="/browsemore">Book your stay</a>
      </Menu.Item>
      <Menu.Item key="4" style={{ color: "#ffffff" }}>
        <a href="/FAQ">FAQ</a>
      </Menu.Item>
      <Menu.Item key="5" style={{ color: "#ffffff" }}>
        {isowner ? (
          <Link href="/ownerProfile">Owner profile</Link>
         
        ) : (
          <Link href="/Profile">My Profile</Link>
        )}
      </Menu.Item>
       <Menu.Item key="4" style={{ color: "#EBCA7E" }}>
        <button onClick={handleLogut}>

        <a className="text-red-500" >Logout</a>
        </button>

      </Menu.Item>
      
    </Menu>
  );

  return (
    <div className="bg-primary">
      <nav className="w-full p-4 container mx-auto flex justify-between items-center">
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-4 ">
          <Link href="/">
            <Image src={logo} alt="Logo" />
          </Link>
        </div>

        {/* Middle: Search bar with category button (Hidden on small screens) */}
        <div className="hidden w-full  lg:flex item-center justify-start  space-x-2 px-2">
          <ul className="space-x-2 list-none flex item-center gap-[24px] text-[16px] font-medium text-white py-4">
            <li>
              <Link href="/" className="text-[16px] hover:text-secoundary">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-[16px] hover:text-secoundary"
              >
                Services
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="text-[16px] hover:text-secoundary">
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-[16px] hover:text-secoundary">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side: Links (Hidden on small screens) */}
        <div className="hidden lg:flex items-center space-x-6">
          {isowner ? (
              <Button
              onClick={handleSwitch}
              style={{ backgroundColor: "#EBCA7E", color: "#000000" }}
              className="bg-[#EBCA7E] text-[#000000] font-bold text-[16px] p-5"
              type="primary"
            >
              Estimate my property
            </Button>
          ) : (
            <Button
              onClick={handleSwitch}
              style={{ backgroundColor: "#EBCA7E", color: "#000000" }}
              className="bg-[#EBCA7E] text-[#000000] font-bold text-[16px] p-5"
              type="primary"
            >
              Switch to Guest profile
            </Button>
          )}

          <div className="w-full flex gap-6 items-center justify-center">
            {/* <div className="w-full">
              <svg onClick={showLanguageModal} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0.0361328C5.37258 0.0361328 0 5.40872 0 12.0361C0 18.6635 5.37258 24.0361 12 24.0361C18.6274 24.0361 24 18.6635 24 12.0361C24 5.40872 18.6274 0.0361328 12 0.0361328ZM1.91567 9.48311C1.70951 10.3 1.6 11.1553 1.6 12.0361C1.6 16.9539 5.01328 21.0744 9.6 22.1578V21.1675L8 19.5675V17.1675L6.4 15.5675V13.6361C6.4 13.1943 6.75817 12.8361 7.2 12.8361H13.6C14.9255 12.8361 16 13.9106 16 15.2361V16.055C16.8175 16.172 17.4642 16.8186 17.5811 17.6361H20.7651C21.8 16.0197 22.4 14.098 22.4 12.0361C22.4 7.70984 19.7584 4.00053 16.0001 2.43322V4.03613C16.0001 5.36162 14.9255 6.43613 13.6001 6.43613H12.0001C11.5582 6.43613 11.2001 6.79431 11.2001 7.23613C11.2001 8.56162 10.1255 9.63613 8.80006 9.63613H8.00006V10.7675L7.29712 11.4704C6.35986 12.4077 4.84026 12.4077 3.903 11.4704L1.91567 9.48311Z" fill="white" />
              </svg>

            </div> */}
            <div>
              {/* notification ---------------- */}
              <Link href={'/allnotifications'}><div className="cursor-pointer " >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 20.0361H2V18.0361H3V11.0671C3 6.07913 7.03 2.03613 12 2.03613C16.97 2.03613 21 6.07913 21 11.0671V18.0361H22V20.0361ZM9.5 21.0361H14.5C14.5 21.6992 14.2366 22.3351 13.7678 22.8039C13.2989 23.2727 12.663 23.5361 12 23.5361C11.337 23.5361 10.7011 23.2727 10.2322 22.8039C9.76339 22.3351 9.5 21.6992 9.5 21.0361Z" fill="#EDEDED" />
                </svg>

              </div></Link>
              <div>

              </div>
            </div>
            <div>
              <Dropdown
                className="text-white"
                overlay={profileMenu}
                trigger={["hover"]}
              >
              {
                user ? <div>
                   {
                user?.image ? <Avatar size={50} className="bg-gray-400">
                  <Image width={50}
                    height={50} src={imageUrl + user?.image} alt="Avatar" />
                </Avatar> : <div className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-gray-400 "> <UserOutlined className="text-xl " /></div>
              }
                  
                </div> :   <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.0361328" width="40" height="40" rx="16" fill="url(#paint0_linear_99_1963)" />
                <path d="M16 16.8361C16 14.627 17.7909 12.8361 20 12.8361C22.2091 12.8361 24 14.627 24 16.8361C24 19.0453 22.2091 20.8361 20 20.8361C17.7909 20.8361 16 19.0453 16 16.8361Z" fill="black" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20 8.03613C13.3726 8.03613 8 13.4087 8 20.0361C8 26.6635 13.3726 32.0361 20 32.0361C26.6274 32.0361 32 26.6635 32 20.0361C32 13.4087 26.6274 8.03613 20 8.03613ZM9.6 20.0361C9.6 14.2924 14.2562 9.63613 20 9.63613C25.7438 9.63613 30.4 14.2924 30.4 20.0361C30.4 22.9954 29.164 25.6661 27.1801 27.5599C26.9385 24.6899 24.5324 22.4361 21.6 22.4361H18.4C15.4676 22.4361 13.0615 24.6899 12.8199 27.5599C10.836 25.6661 9.6 22.9954 9.6 20.0361Z" fill="black" />
                <defs>
                  <linearGradient id="paint0_linear_99_1963" x1="0" y1="20.0361" x2="40" y2="20.0361" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EBCA7E" />
                    <stop offset="1" stop-color="#C4B490" />
                  </linearGradient>
                </defs>
              </svg>
              }

              </Dropdown>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button (Visible on small screens) */}
        <div className="lg:hidden">
          <MenuOutlined
            className="text-2xl text-white"
            onClick={() => setDrawerVisible(true)}
          />
        </div>

        {/* Modal for language selection */}
        <Modal
          visible={languageModalVisible}
          onCancel={handleLanguageModalCancel}
          footer={null}
        >
          <h2 className="text-lg font-semibold mb-4">
            Choose Your Preferred Language
          </h2>
          <Select
            className="h-[44px]"
            placeholder="Select Language"
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="gr">Greek</Select.Option>
            {/* Add other languages as needed */}
          </Select>
          <p className="mb-4 text-sm text-gray-500">
            Note: Changing the language will refresh the page to apply your
            selection.
          </p>
        </Modal>

        {/* Drawer for mobile menu */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
                 {/* Right Side: Links (Hidden on small screens) */}
        <div className=" flex items-center space-x-6">
          {isowner ? (
              <Button
              onClick={handleSwitch}
              style={{ backgroundColor: "#EBCA7E", color: "#000000" }}
              className="bg-[#EBCA7E] text-[#000000] font-bold text-[16px] p-5"
              type="primary"
            >
              Estimate my property
            </Button>
          ) : (
            <Button
              onClick={handleSwitch}
              style={{ backgroundColor: "#EBCA7E", color: "#000000" }}
              className="bg-[#EBCA7E] text-[#000000] font-bold text-[16px] p-5"
              type="primary"
            >
              Switch to Guest profile
            </Button>
          )}

          <div className="w-full flex gap-6 items-center justify-center">
            {/* <div className="w-full">
              <svg onClick={showLanguageModal} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0.0361328C5.37258 0.0361328 0 5.40872 0 12.0361C0 18.6635 5.37258 24.0361 12 24.0361C18.6274 24.0361 24 18.6635 24 12.0361C24 5.40872 18.6274 0.0361328 12 0.0361328ZM1.91567 9.48311C1.70951 10.3 1.6 11.1553 1.6 12.0361C1.6 16.9539 5.01328 21.0744 9.6 22.1578V21.1675L8 19.5675V17.1675L6.4 15.5675V13.6361C6.4 13.1943 6.75817 12.8361 7.2 12.8361H13.6C14.9255 12.8361 16 13.9106 16 15.2361V16.055C16.8175 16.172 17.4642 16.8186 17.5811 17.6361H20.7651C21.8 16.0197 22.4 14.098 22.4 12.0361C22.4 7.70984 19.7584 4.00053 16.0001 2.43322V4.03613C16.0001 5.36162 14.9255 6.43613 13.6001 6.43613H12.0001C11.5582 6.43613 11.2001 6.79431 11.2001 7.23613C11.2001 8.56162 10.1255 9.63613 8.80006 9.63613H8.00006V10.7675L7.29712 11.4704C6.35986 12.4077 4.84026 12.4077 3.903 11.4704L1.91567 9.48311Z" fill="white" />
              </svg>

            </div> */}
            <div>
              {/* notification ---------------- */}
              <Link href={'/allnotifications'}><div className="cursor-pointer " >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 20.0361H2V18.0361H3V11.0671C3 6.07913 7.03 2.03613 12 2.03613C16.97 2.03613 21 6.07913 21 11.0671V18.0361H22V20.0361ZM9.5 21.0361H14.5C14.5 21.6992 14.2366 22.3351 13.7678 22.8039C13.2989 23.2727 12.663 23.5361 12 23.5361C11.337 23.5361 10.7011 23.2727 10.2322 22.8039C9.76339 22.3351 9.5 21.6992 9.5 21.0361Z" fill="#EDEDED" />
                </svg>

              </div></Link>
              <div>

              </div>
            </div>
            <div>
              <Dropdown
                className="text-white"
                overlay={profileMenu}
                trigger={["hover"]}
              >
              {
                user ? <div>
                   {
                user?.image ? <Avatar size={50} className="bg-gray-400">
                  <Image width={50}
                    height={50} src={imageUrl + user?.image} alt="Avatar" />
                </Avatar> : <div className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-gray-400 "> <UserOutlined className="text-xl " /></div>
              }
                  
                </div> :   <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.0361328" width="40" height="40" rx="16" fill="url(#paint0_linear_99_1963)" />
                <path d="M16 16.8361C16 14.627 17.7909 12.8361 20 12.8361C22.2091 12.8361 24 14.627 24 16.8361C24 19.0453 22.2091 20.8361 20 20.8361C17.7909 20.8361 16 19.0453 16 16.8361Z" fill="black" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20 8.03613C13.3726 8.03613 8 13.4087 8 20.0361C8 26.6635 13.3726 32.0361 20 32.0361C26.6274 32.0361 32 26.6635 32 20.0361C32 13.4087 26.6274 8.03613 20 8.03613ZM9.6 20.0361C9.6 14.2924 14.2562 9.63613 20 9.63613C25.7438 9.63613 30.4 14.2924 30.4 20.0361C30.4 22.9954 29.164 25.6661 27.1801 27.5599C26.9385 24.6899 24.5324 22.4361 21.6 22.4361H18.4C15.4676 22.4361 13.0615 24.6899 12.8199 27.5599C10.836 25.6661 9.6 22.9954 9.6 20.0361Z" fill="black" />
                <defs>
                  <linearGradient id="paint0_linear_99_1963" x1="0" y1="20.0361" x2="40" y2="20.0361" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EBCA7E" />
                    <stop offset="1" stop-color="#C4B490" />
                  </linearGradient>
                </defs>
              </svg>
              }

              </Dropdown>
            </div>
          </div>
        </div>
          
          <ul className="space-y-2 py-4">
            <li>
              <Link href="/" className="text-[16px] hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-[16px] hover:text-primary">
                Services
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="text-[16px] hover:text-primary">
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-[16px] hover:text-primary">
                About
              </Link>
            </li>
          </ul>
      

 
          <div className="flex flex-col space-y-4">
            <Link href={"/auth/signup"}>
              <Button
                className="text-[#FFFFFF] font-semibold text-[16px] p-5"
                type="primary"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </Drawer>
      </nav>
    </div>
  );
};

export default Navbar;
