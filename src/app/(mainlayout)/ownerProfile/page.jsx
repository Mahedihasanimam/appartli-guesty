"use client";
import { Avatar, Button, Card, Tooltip, Tabs } from "antd";
import Image from "next/image";
import React, { useEffect } from "react";
import userimg from "/public/images/user.png";
import { MdOutlineChevronLeft, MdOutlineWorkOutline } from "react-icons/md";
import { FaLanguage } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { MobileOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import roomimage from "/public/images/myproperty.png";
import ownerImage from "/public/images/user.png";
import Myproperty from "@/components/ui/Myproperty";
import UserCard from "@/components/ui/UserCard";

import imageone from "/public/images/about.png";
import imagetow from "/public/images/user.png";
import Link from "next/link";
import { useSelector } from "react-redux";
import { imageUrl } from "@/redux/api/ApiSlice";
import { useLogdinuserReservationQuery } from "@/redux/features/Propertyapi/page";
import Swal from "sweetalert2";
import { useChangeReservationRoleMutation } from "@/redux/features/reservation/ReservationApi";


const { TabPane } = Tabs;
const Page = () => {







  const [changeReservationRole]=useChangeReservationRoleMutation()
  const { data, isLoading } = useLogdinuserReservationQuery()
  const { user } = useSelector((state) => state.user)
  const router = useRouter();
  const createdAtDate = new Date(user?.createdAt);

  useEffect(() => {
    if(!user){
      router.push('/auth/OwnerLogin')
    }
    if (!user?.role.includes("owner") || localStorage.getItem('isOwner' == false) ) {
      router.replace("/Profile");
    }

  }, [user, router]);

  if (!user || !user?.role.includes("owner")) {
    return <p>Redirecting...</p>;
  }








  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in years, months, and days
  let years = currentDate.getFullYear() - createdAtDate.getFullYear();
  let months = currentDate.getMonth() - createdAtDate.getMonth();
  let days = currentDate.getDate() - createdAtDate.getDate();

  // Adjust months and years based on the date difference
  if (months < 0) {
    months += 12;
  }
  if (days < 0) {
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Determine which unit to display
  let timeAgo = '';
  if (years > 0) {
    timeAgo = `${years} year${years > 1 ? 's' : ''}`;
  } else if (months > 0) {
    timeAgo = `${months} month${months > 1 ? 's' : ''}`;
  } else {
    timeAgo = `${days} day${days > 1 ? 's' : ''}`;
  }

  // if(isLoading){
  //   return <h1>Loading...</h1>
  // }
  // Group data into categories (checking in and checking out)
  //  const upcommindatagReservations = data?.rooms?.filter((reservation) => reservation.checkinCheckoutStatus === 'upcoming' || new Date(reservation.checkOutDate) > new Date());


  const upcommingReservations = data?.rooms?.filter((reservation) => reservation.checkinCheckoutStatus === 'upcoming' && new Date(reservation.checkOutDate) > new Date());
  const checkingInReservations = data?.rooms?.filter((reservation) => reservation.checkinCheckoutStatus === 'checkin');
  const checkOutReservations = data?.rooms?.filter((reservation) => reservation.checkinCheckoutStatus === 'checkout' && new Date(reservation.checkInDate) < new Date());

  const handleCompleted = (id) => {
    Swal.fire({
      title: "it's alerady done",
      text: "it's already in checkout",
      icon: 'info'
    })
  }

  const handleMakeitCheckOut = async (id) => {
    const allinfo = {
      reservationId: id,
      checkinCheckoutStatus: 'checkout',
    }

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
              text: "check the checkout tab",
              icon: "success"
            });
          }

      }
    });


  }
  const handleMakeitChekin = async (id) => {
    const allinfo = {
      reservationId: id,
      checkinCheckoutStatus: 'checkin',
    }

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
              text: "check the checkin tab",
              icon: "success"
            });
          }

      }
    });


  }


  console.log('checkingInReservations', upcommingReservations)
  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <h2 className="text-xl flex space-x-2 items-center font-semibold mb-6 text-white">
        <button onClick={() => router.back()} className="focus:outline-none">
          <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
        </button>
        My profile
      </h2>
      <div className="lg:flex md:flex flex-row gap-8 bg-[#242424] rounded-lg ">
        {/* Left Section: Host Info */}
        <div className="bg-[#242424] h-fit rounded-lg p-6 w-full max-w-md ">
          <div className="flex items-center pb-4">
            {
              user?.image ? <Avatar size={80} className="bg-gray-400">
                <Image width={80}
                  height={80} src={imageUrl + user?.image} alt="Avatar" />
              </Avatar> : <div className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-gray-400 "> <UserOutlined className="text-xl " /></div>
            }
            <div className="pl-2">
              <h3 className="text-lg font-semibold text-white">{user?.fullName || user?.firstName}</h3>
              <p className="text-[#FFFFFF66]">

                {user?.role?.map((i,idx) => <span key={idx} className="pr-1">{i}</span>)}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-around pb-4">
            <div className="mt-2">
              <div className="text-sm text-gray-400 mt-2">
                {" "}
                <p className="text-[#FFFFFF] text-2xl pb-1 font-bold">
                  {user?.reviewsCount}
                </p>{" "}
                Reviews
              </div>
            </div>
            <div className="flex items-center mt-1">
              <div className="text-sm text-gray-400 mt-2">
                <p className="text-[#FFFFFF] text-2xl pb-1 font-bold">{user?.ratingsCount} *</p>{" "}
                Ratings
              </div>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              <p className="text-[#FFFFFF] text-2xl pb-1 font-bold">{timeAgo}</p>{" "}
              Hosting
            </div>
          </div>
        </div>

        {/* Right Section: Host Details */}
        <Card className="bg-[#242424] lg:w-2/3 w-full p-4 border-none h-fit text-[#FFFFFF]">
          <h3 className="text-[28px] font-bold text-[#FFFFFF] mb-4">
            Welcome, <span>{user?.fullName || user?.firstName}</span>
          </h3>
          <div className="space-y-4 lg:flex flex-row items-center justify-between">
            <div className="space-y-3">
              <p className="flex gap-3  text-[16px] text-white font-medium">
                {" "}
                <MobileOutlined className="text-[24px]" /> Contact number:{" "}
                <span className="text-white opacity-70"> {user?.phone}</span>
              </p>
              <p className="flex gap-3 text-[16px] text-white font-medium">
                {" "}
                <CiGlobe className="text-[24px]" /> Lives in:{" "}
                <span className="text-white opacity-70">
                  {user?.location}
                </span>
              </p>
            </div>

          </div>
        </Card>
      </div>

 

      {/* resarvation list----------------- */}
      <div className="flex items-center justify-between  text-white my-8" >

        <h1 className="text-2xl font-bold ">Your Reservation</h1>
        <Link href={'/allreservation'}> <Button style={{ backgroundColor: "transparent", border: "none", color: "#EBCA7E" }} className=" text-sm   font-bold  underline ">Allreservation</Button></Link>
      </div>


      <div>
        <Card className="bg-[#242424] border-none text-white w-full rounded-lg shadow-lg  my-6">
          <Tabs defaultActiveKey="3" centered>
            <TabPane
              tab={<span className="text-yellow-500">Checking out ({checkOutReservations?.length})</span>}
              key="1"
            >
              {checkOutReservations?.slice(0, 1).map((reservation) => (
                <div key={reservation?._id}>
                  <div  className="lg:flex flex-row lg:space-y-0 space-y-6 items-center">
                    <Image
                      height={200}
                      width={200}
                      src={imageUrl + reservation?.property?.images[0]}// Replace with actual image URL
                      alt="User"
                      className="w-[400px] h-[164px] rounded-lg object-cover"
                    />
                    <div className="ml-6 flex justify-around w-full items-center text-white">
                      <div className="space-y-2 text-[16px] text-[#FFFFFFB2]">
                        <p>Name : {reservation?.user?.fullName}</p>
                        <p>Email : {reservation?.user?.email}</p>
                        <p>Contact : {reservation?.user?.phone}</p>
                        <p>Location : {reservation?.user?.location}</p>
                      </div>
                      <div className="space-y-2 text-[16px] text-[#FFFFFFB2]">
                        <p>Check-in date: {new Date(reservation?.checkInDate).toLocaleDateString()}</p>
                        <p>Stay for: {Math.floor((new Date(reservation?.checkOutDate) - new Date(reservation?.checkInDate)) / (1000 * 60 * 60 * 24))} days</p>
                        <p>Guest: {reservation?.guests}</p>
                        <p>Pay: {reservation?.totalPrice}</p>
                      </div>
                    </div>



                  </div>
                  <div className="mt-4 flex justify-center gap-4 text-white">
                    <Button
                      onClick={() => router.push("/allChecOutResarvation")}
                      style={{ backgroundColor: "transparent", color: "#EBCA7E" }}
                      className="bg-transparent border-[1px] border-secoundary rounded-[4px] w-[149px] h-[36px]t px-4 py-4 text-sm font-semibold text-secoundary"
                    >
                      See all
                    </Button>
                    <Button
                      onClick={() => handleCompleted(reservation?._id)}
                      style={{ backgroundColor: "#EBCA7E", color: "black" }}
                      className="bg-secoundary border-[1px] font-bold w-[149px] h-[36px] border-secoundary rounded-[4px] px-4 py-2 text-sm text-secoundary"
                    >
                      Complete
                    </Button>
                  </div>
                </div>


              ))}

            </TabPane>



            <TabPane
              tab={<span className="text-yellow-500">Checking in ({checkingInReservations?.length})</span>}
              key="2"
            >
              {checkingInReservations?.slice(0, 1)?.map((reservation) => (

                <div key={reservation._id}>
                  <div  className="lg:flex flex-row lg:space-y-0 space-y-6 items-center">
                    <Image
                      height={200}
                      width={200}
                      src={imageUrl + reservation?.property?.images} // Replace with actual image URL
                      alt="User"
                      className="w-[400px] h-[164px] rounded-lg object-cover"
                    />
                    <div className="ml-6 flex justify-around w-full items-center text-white">
                      <div className="space-y-2 text-[16px] text-[#FFFFFFB2]">
                        <p>Name : {reservation?.user?.fullName}</p>
                        <p>Email : {reservation?.user?.email}</p>
                        <p>Contact : {reservation?.user?.phone}</p>
                        <p>Location : {reservation?.user?.location}</p>
                      </div>
                      <div className="space-y-2 text-[16px] text-[#FFFFFFB2]">
                        <p>Check-in date: {new Date(reservation.checkInDate).toLocaleDateString()}</p>
                        <p>Stay for: {Math.floor((new Date(reservation.checkOutDate) - new Date(reservation.checkInDate)) / (1000 * 60 * 60 * 24))} days</p>
                        <p>Guest: {reservation?.guests}</p>
                        <p>Pay: ${reservation?.totalPrice}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center gap-4 text-white">
                    <Button
                      onClick={() => router.push("/allCheckingInResarvation")}
                      style={{ backgroundColor: "transparent", color: "#EBCA7E" }}
                      className="bg-transparent border-[1px] border-secoundary rounded-[4px] w-[149px] h-[36px]t px-4 py-4 text-sm font-semibold text-secoundary"
                    >
                      See all
                    </Button>
                    <Button
                    onClick={()=>handleMakeitCheckOut(reservation?._id)}
                      style={{ backgroundColor: "#EBCA7E", color: "black" }}
                      className="bg-secoundary border-[1px] font-bold w-[149px] h-[36px] border-secoundary rounded-[4px] px-4 py-2 text-sm text-secoundary"
                    >
                      Arrived in
                    </Button>
                  </div>
                </div>
              ))}
            </TabPane>


            <TabPane
              tab={<span className="text-yellow-500">Upcoming ({upcommingReservations?.length})</span>}
              key="3"
            >
              {upcommingReservations?.slice(0, 1)?.map((reservation) => (
                <div key={reservation?._id}>
                <div key={reservation?._id} className="lg:flex flex-row lg:space-y-0 space-y-6 items-center">
                  <Image
                    height={200}
                    width={200}
                    src={imageUrl + reservation?.property?.images[0]} // Replace with actual image URL
                    alt="User"
                    className="w-[400px] h-[164px] rounded-lg object-cover"
                  />
                  <div className="ml-6 flex justify-around w-full items-center text-white">
                    <div className="space-y-2 text-[16px] text-[#FFFFFFB2]">
                      <p>Name : {reservation?.user?.fullName}</p>
                      <p>Email : {reservation?.user?.email}</p>
                      <p>Contact : {reservation?.user?.phone}</p>
                      <p>Location : {reservation?.user?.location}</p>
                    </div>
                    <div className="space-y-2 text-[16px] text-[#FFFFFFB2]">
                      <p>Check-in date: {new Date(reservation?.checkInDate).toLocaleDateString()}</p>
                      <p>Stay for : {Math.floor((new Date(reservation?.checkOutDate) - new Date(reservation?.checkInDate)) / (1000 * 60 * 60 * 24))} days</p>
                      <p>Guest : {reservation?.guests}</p>
                      <p>Pay: ${reservation?.totalPrice}</p>
                    </div>
                  </div>
                </div>

              <div className="mt-4 flex justify-center gap-4 text-white">
                <Button
                  onClick={() => router.push("/allupcomingresarvation")}
                  style={{ backgroundColor: "transparent", color: "#EBCA7E" }}
                  className="bg-transparent border-[1px] border-secoundary rounded-[4px] w-[149px] h-[36px]t px-4 py-4 text-sm font-semibold text-secoundary"
                >
                  See all
                </Button>
                <Button onClick={()=>handleMakeitChekin(reservation._id)}
                  style={{ backgroundColor: "#EBCA7E", color: "black" }}
                  className="bg-secoundary border-[1px] font-bold w-[149px] h-[36px] border-secoundary rounded-[4px] px-4 py-2 text-sm text-secoundary"
                >
                  Next
                </Button>
              </div>
                </div>
              ))}
            </TabPane>



          </Tabs>
        </Card>
      </div>



      {/* my added porperty ------------ */}
      <div className="bg-[#242424] p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">

          <h1 className="text-2xl font-bold text-white mb-4">Your Property List</h1>

          <Button onClick={() => router.push('/ownerProfile/propertylist')} style={{ backgroundColor: "transparent", border: "none", color: "#EBCA7E" }} className=" text-sm  font-bold  underline ">Sea  all</Button>
        </div>
        {
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-8">
            {user?.properties
              ?.filter((property) => !property.isDeleted) // Exclude items where isDeleted is true
              .map((property) => (
                <Myproperty key={property._id} data={property} />
              ))}
          </div>

        }

      </div>
    </div>
  );
};

export default Page;
