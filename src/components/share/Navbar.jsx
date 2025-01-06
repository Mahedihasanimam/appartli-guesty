"use client";
import { useCallback, useContext, useEffect, useState } from "react";
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
  const user = useSelector((state) => state.user.user);

  
  const dispatch=useDispatch()



console.log('user img',imageUrl+user?.data?.image)



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
  }, [ ]);

  const handleSwitch = () => {
    if (user?.role?.includes("owner")) {
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
const profileMenuItems = [
  {
    key: "1",
    label: <Link href="/auth/GuestLogin">Guest Log in</Link>,
    style: { color: "#ffffff" },
  },
  {
    key: "2",
    label: <Link href="/auth/OwnarLogin">Owner Log in</Link>,
    style: { color: "#ffffff" },
  },
  {
    key: "3",
    label: <a href="/browsemore">Book your stay</a>,
    style: { color: "#ffffff" },
  },
  {
    key: "4",
    label: <a href="/FAQ">FAQ</a>,
    style: { color: "#ffffff" },
  },
  {
    key: "5",
    label:  isowner ? (
      <Link href="/ownerProfile">Owner profile</Link>
     
    ) : (
      <Link href="/Profile">My Profile</Link>
    ),





    style: { color: "#ffffff" },
  },
  {
    key: "6",
    label: (
      <button onClick={handleLogut}>
        <span style={{ color: "#EBCA7E" }}>Logout</span>
      </button>
    ),
  },
];



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
           
            <Dropdown
            style={{ backgroundColor: "#EBCA7E", color: "#000000" }}
  menu={{ items: profileMenuItems }}
  trigger={["hover"]}
  className="text-white "
>
  <div>
    {/* Avatar or trigger content here */}
    {user ? (
      user?.data?.image ? (
        <Avatar size={50} className="bg-gray-400">
          <Image
            width={50}
            height={50}
            src={imageUrl + user?.data?.image}
            alt="Avatar"
          />
        </Avatar>
      ) : (
        <div className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-gray-400">
          <UserOutlined className="text-xl" />
        </div>
      )
    ) : (
      <svg
        width="40"
        height="41"
        viewBox="0 0 40 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SVG content */}
      </svg>
    )}
  </div>
</Dropdown>

         
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
          open={languageModalVisible}
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
  menu={{ items: profileMenuItems }}
  trigger={["hover"]}
  className="text-white"
>
  <div>
    {/* Avatar or trigger content here */}
    {user ? (
      user?.data?.image ? (
        <Avatar size={50} className="bg-gray-400">
          <Image
            width={50}
            height={50}
            src={imageUrl + user?.data?.image}
            alt="Avatar"
          />
        </Avatar>
      ) : (
        <div className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-gray-400">
          <UserOutlined className="text-xl" />
        </div>
      )
    ) : (
      <svg
        width="40"
        height="41"
        viewBox="0 0 40 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SVG content */}
      </svg>
    )}
  </div>
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
