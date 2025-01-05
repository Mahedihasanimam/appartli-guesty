"use client";

import React, { useState, useRef } from "react";
import { Carousel, DatePicker, InputNumber, Button, Rate, Input, message } from "antd";
import Image from "next/image";
import slideimage from "/public/images/Rectangle 67.png";
import slideimage2 from "/public/images/Rectangle 68.png";
import {
  CheckCircleFilled,
  ClearOutlined,
  FileOutlined,
  HeartOutlined,
  HomeFilled,
  LeftOutlined,
  MessageOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import favimg from "/public/icons/fevorite.png";
const { RangePicker } = DatePicker;

import {
  WifiOutlined,
  LockOutlined,
  CoffeeOutlined,
  HomeOutlined,
  StarFilled,
} from "@ant-design/icons";

import { MdLiveTv, MdLuggage } from "react-icons/md";
import { LuRefrigerator } from "react-icons/lu";
import { BsPersonWorkspace } from "react-icons/bs";
import { BiSolidWasher } from "react-icons/bi";
import { PiHairDryerLight } from "react-icons/pi";
import { TbIroning1 } from "react-icons/tb";
import { PiSprayBottle } from "react-icons/pi";
import { IoIosKey } from "react-icons/io";
import { FaCircleNotch, FaStar } from "react-icons/fa";
import userimg from "/public/images/user.png";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FaLanguage } from "react-icons/fa";
import { FaLocationPinLock } from "react-icons/fa6";


import { Card, Avatar, List, Divider, Progress, Tooltip } from "antd"; // Import from Ant Design
import profileimg from "/public/images/about.png";
import { useRouter } from "next/navigation";
import { useAddReviewRatingsMutation, useGetRatingsByPropertyIdQuery, useGetRoomsByIdQuery } from "@/redux/features/Propertyapi/page";
import { imageUrl } from "@/redux/api/ApiSlice";
import { useMakeAreservationMutation } from "@/redux/features/reservation/ReservationApi";
import Swal from "sweetalert2";
import { useCreateGuestyReservationMutation, useGetGuestyCalendarQuery, useGetGuestyPropertiesQuery, useGetGuestySinglePropertyQuery } from "@/redux/features/guesty/guestyApi";
import { useSelector } from "react-redux";
import moment from "moment";

const Page = ({ params }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  // Place hooks at the top level
  const [dates, setDates] = useState(null);
  const [guests, setGuests] = useState(2);
  const [contact, setcontact] = useState();
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(8);
  const [expandedReviewIds, setExpandedReviewIds] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const carouselRef = useRef(null);
  const [startResarveDate, setstartresarveDate] = useState('')
  const [endResarveDate, setEndResarveDate] = useState('')
  const startisodate = new Date(startResarveDate)
  const EndIsodate = new Date(endResarveDate)
  // Fetch data using query
  const { isLoading, data: roomsalldata, error } = useGetRoomsByIdQuery(params?.id);
  const [addReviewRatings, { isLoading: reviewLoading, error: reviewError }] = useAddReviewRatingsMutation({}, { refetchOnFocus: true })
  const [MakeAreservation, { isLoading: reservationLoading, }] = useMakeAreservationMutation()
  const [createReservation] = useCreateGuestyReservationMutation();

  const { data: guestydata, error: guestyerror, isLoading: guestyLoading } = useGetGuestySinglePropertyQuery(params?.id);
  // console.log('guestyyyy',guestydata)
  // console.log('guestyyyyid',params?.id)
  const currentDate = new Date();
  const startcalDate = currentDate.toISOString().split('T')[0];  // Current date in 'YYYY-MM-DD' format
  const endcalDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)).toISOString().split('T')[0]; // One year from today
  
  const { data:calenderData, error:calError, isLoading:calLoading } = useGetGuestyCalendarQuery({
    listingId:params?.id,
    startDate:startcalDate,
    endDate:endcalDate,
  });

  
  const { isLoading: getratingLoading, data: ratingsData } = useGetRatingsByPropertyIdQuery(params?.id)
  if (calLoading) return <p>Loading calendar data...</p>;

  if (calError) return <p>Error fetching calendar: {calError.message}</p>;

// Filter dates where blocks.b is true
const blockedDates = calenderData?.data?.days
  .filter((day) => day.blocks.b === true)
  .map((day) => day.date);

console.log("Blocked Dates:", blockedDates);

const isDateBlocked = (currentDate) => {
  if (!currentDate) return false;

  // Format the current date as "YYYY-MM-DD"
  const formattedDate = currentDate.format("YYYY-MM-DD");

  // Check if the date is in the blockedDates array or is in the past
  const isPastDate = moment(formattedDate).isBefore(moment(), "day");
  const isBlocked = blockedDates.includes(formattedDate);

  return isBlocked || isPastDate;
};


  if (isLoading || reviewLoading || getratingLoading) {
    return <h1>Loading...</h1>;
  }

  if (error || reviewError) {
    console.error(error);
  }

  console.log(guestydata?.prices?.basePrice)

  const perNightRate = parseInt(guestydata?.prices?.basePrice);
  const cleaningFee = parseInt(guestydata?.prices?.cleaningFee);
  const serviceFee = parseInt(guestydata?.prices?.extraPersonFee);

  const handlePreviewClick = (index) => {
    setActiveSlide(index);
    carouselRef.current?.goTo(index, false);
  };
  const handleDateChange = (dateRange) => {
    if (dateRange && dateRange.length === 2) {
      const [startDate, endDate] = dateRange;

      // Convert to JavaScript Date objects
      const startDateJS = startDate.toDate();
      const endDateJS = endDate.toDate();

      // Or format as strings (e.g., "YYYY-MM-DD")
      const startDateFormatted = startDate.format("YYYY-MM-DD");
      const endDateFormatted = endDate.format("YYYY-MM-DD");
      setstartresarveDate(startDateFormatted)
      setEndResarveDate(endDateFormatted)

      // console.log("Start Date (Date object):", startDateJS);
      // console.log("End Date (Date object):", endDateJS);


      // console.log("Start Date (formatted):", startDateFormatted);
      // console.log("End Date (formatted):", endDateFormatted);

      setDates(dateRange);
      calculateTotal(dateRange, guests);
    } else {
      console.log("Date range is not complete or is invalid");
    }
  };


  const handleGuestsChange = (value) => {
    setGuests(value);
    calculateTotal(dates, value);
    // console.log("Number of Guests:", value);
  };
  const handleContactChange = (value) => {
    setcontact(value);

    // console.log("Number:", value);
  };

  const calculateTotal = (dateRange, guests) => {
    if (dateRange) {
      const [checkIn, checkOut] = dateRange;
      const nights = checkOut.diff(checkIn, "day");
      const roomTotal = perNightRate * nights;
      const calculatedTotal = roomTotal + cleaningFee + serviceFee;

      setTotal(calculatedTotal);
      console.log("Total Calculation:", {
        nights,
        roomTotal,
        cleaningFee,
        serviceFee,
        total: calculatedTotal,
      });
    } else {
      setTotal(0);
      console.log("Total Calculation: $0.00 (no dates selected)");
    }
  };

//   const handleReserveClick = async () => {
//     try {



//       // const allresarveData = {
//       //   propertyId: params?.id,
//       //   checkInDate: startResarveDate,
//       //   checkOutDate: endResarveDate,
//       //   guests: guests,
//       //   totalPrice: total
//       // }



//       const allGuestyData = {
//         reservation: {
//           listingId: params?.id,
//           checkInDateLocalized: startResarveDate,
//           checkOutDateLocalized: endResarveDate,
//           guestsCount: guests,
//           email: user?.email,
//           phone: contact
//         },
//         guest: {
//           firstName: user?.firstName,
//           lastName: user?.lastName,
//           email: user?.email,
//           phone: contact,
//         },
//         policy: {
//           privacy: {
//             version: 1,
//             dateOfAcceptance: startisodate.toISOString(), // or use `null` if not applicable
//             isAccepted: true,
//           },
//           termsAndConditions: {
//             version: 1,
//             dateOfAcceptance: EndIsodate.toISOString(), // or use `null` if not applicable
//             isAccepted: true,
//           },
//           marketing: {
//             dateOfAcceptance: EndIsodate.toISOString(), // or use `null` if not applicable
//             isAccepted: true,
//           },
//         },
//       };

//       // const respons = await MakeAreservation(allresarveData)
//       // console.log(respons)

//       const guestyRespons = await createReservation(allGuestyData).unwrap();
// console.log('Guesty response:', guestyRespons);

      
//       // if (respons?.data?.success) {
//       //   Swal.fire({
//       //     title: 'Reserved!',
//       //     text: respons?.data?.message,
//       //     icon: 'success',
//       //   });
//       //   router.push('/payment')
//       // } else {
//       //   Swal.fire({
//       //     title: respons?.error?.data?.message,
//       //     text: 'Please try again...',
//       //     icon: 'error',
//       //   });
//       //   router.push('/auth/GuestLogin')
//       // }


//     } catch (error) {
//       Swal.fire({
//         title: 'opps...!',
//         text: 'Please try again...',
//         icon: 'error',
//       });
      
      
//     }
//   };


console.log(params?.id)
  const handleReserveClick = async () => {
    try {
      // const allGuestyData = {
      //   reservation: {
      //     listingId: params?.id,
      //     checkInDateLocalized: startResarveDate,
      //     checkOutDateLocalized: endResarveDate,
      //     guestsCount: guests,
      //     email: user?.email,
      //     phone: contact || user?.phone,
      //     MIN_NIGHT:2
      //   },
      //   guest: {
      //     firstName: user?.firstName,
      //     lastName: user?.lastName,
      //     email: user?.email,
      //     phone: contact,
      //   },
        // policy: {
        //   privacy: {
        //     version: 1,
        //     dateOfAcceptance: startisodate?.toISOString(),
        //     isAccepted: true,
        //   },
      //     termsAndConditions: {
      //       version: 1,
      //       dateOfAcceptance: EndIsodate?.toISOString(),
      //       isAccepted: true,
      //     },
      //     marketing: {
            // dateOfAcceptance: EndIsodate?.toISOString(),
            // isAccepted: true,
      //     },
      //   },
      // };


      const allGuestyData = {

        //   "coupon": "string",
        listingId: params?.id,
          checkInDateLocalized: startResarveDate,
          checkOutDateLocalized: endResarveDate,
          guestsCount: guests,
          email:user?.email,
          phone:contact || user?.phone,
          MIN_NIGHT:2,
          "status": "confirmed",
   
        guest: {
          firstName: "abir",
          lastName: "arafat", 
          email: "abirwerks@gmail.com",
          phone: "01999999999"
        },
        policy: {
          privacy: {version: 1,dateOfAcceptance: startisodate?.toISOString(), isAccepted: true},
          termsAndConditions: {version: 1,   dateOfAcceptance: EndIsodate?.toISOString(),isAccepted: true,},
          marketing: { dateOfAcceptance: EndIsodate?.toISOString(),isAccepted: true,}
        },
        payment: {token: "pm_1KTRn22eZvKYlo2CkHIARaGo"}
      }

      // API Call
      const guestyResponse = await createReservation(allGuestyData).unwrap();

      console.log(allGuestyData)
  console.log('guestyrespons',guestyResponse)
      // Check if the response contains required fields
      if (
        guestyResponse &&
        guestyResponse._id &&
        guestyResponse.confirmationCode &&
        guestyResponse.status === 'confirmed'
      ) {
        // Successful Reservation
        Swal.fire({
          title: 'Reservation Confirmed!',
          html: `
            <p><strong>Confirmation Code:</strong> ${guestyResponse.confirmationCode}</p>
            <p><strong>Reservation Status:</strong> ${guestyResponse.status}</p>
          `,
          icon: 'success',
        });
      } else {
        // Handle unexpected success response structure
        Swal.fire({
          title: 'Reservation Successful!',
          text: 'The reservation was created, but some details are missing.',
          icon: 'warning',
        });
      }
    }  catch (error) {
      console.error('API Error:', error);
    
      // Extract the error details from the response
      const errorCode = error?.data || 'LISTING_CALENDAR_BLOCKED';
      const errorMessage = error?.data?.error?.message || 'Something went wrong. Please try again.';
      const errorDetails = error?.data?.error?.data?.errors?.join(', ') || 'No additional dates available.';
    
      // Show the error in a user-friendly way
      Swal.fire({
        title: 'Reservation Failed!',
        html: `
          <p> ${errorCode}</p>
        
        `,
        icon: 'error',
      });
    }
    
  };
  // <p><strong>Message:</strong> ${errorMessage}</p>
   // <p><strong>Details:</strong> ${errorDetails}</p>













  const toggleShowMore = (id) => {

    if (expandedReviewIds.includes(id)) {
      setExpandedReviewIds(expandedReviewIds.filter((reviewId) => reviewId !== id));
    } else {
      setExpandedReviewIds([...expandedReviewIds, id]);
    }
  };

  const handleShowAll = () => {
    router.push(`/showAllReview?id=${params?.id}`);
  };

  const handleClick = (index) => {
    setRating(index + 1);
  };

  const handleMouseOver = (index) => {
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = async (e) => {
    console.log(e)
    e.preventDefault();
    if (reviewText.trim() && rating > 0) {
      setReviewText('');
      setRating(0);
      const reviewData = {
        propertyId: params?.id,
        review: reviewText,
        rating
      }

      try {
        const respons = await addReviewRatings(reviewData)
        console.log('the respons is ', respons)
        if (respons?.data?.success) {
          message.success(respons?.data?.message)
        }
        if (respons?.error) {

          message.error(respons?.error?.data?.message || 'someting went wrong')
        }
      } catch (error) {
        message.error(error?.message || 'Something went wrong')
      }



    } else {
      message.error('Please provide both review text and rating.');
    }
  };
  const { category, createdAt, description, services, images, location, maxGuests, owner, reviews, roomCount, startDate, endDate, roomId, totalRatings } = roomsalldata?.room || {}


  if (services && services[0]) {
    // Convert the services string into an array
    const servicesArray = services[0]?.split(',').map(service => service.trim());
    console.log('servicesArray:', servicesArray);
  }

  const renderServiceIcon = (service) => {
    switch (service) {
      case 'Lock on bedroom door':
        return <LockOutlined className="text-xl text-white" />;
      case 'Wifi':
        return <WifiOutlined className="text-xl text-white" />;
      case 'Tv':
        return <MdLiveTv className="text-xl text-white" />;
      case 'Luggage drop-off allowed':
        return <MdLuggage className="text-xl text-white" />;
      case 'Refrigerator':
        return <LuRefrigerator className="text-xl text-white" />;
      case 'Kitchen':
        return <CoffeeOutlined className="text-xl text-white" />;
      case 'Dedicated workspace':
        return <BsPersonWorkspace className="text-xl text-white" />;
      case 'Washer':
        return <BiSolidWasher className="text-xl text-white" />;
      case 'Hair dryer':
        return <PiHairDryerLight className="text-xl text-white" />;
      case 'Iron machine':
        return <TbIroning1 className="text-xl text-white" />;
      default:
        return null;
    }
  };



  console.log('ratings -----', ratingsData?.data?.[0]);
  const {
    averageRating = 0,
    checkin = 0,
    communication = 0,
    cleanliness = 0,
    values = 0
  } = ratingsData?.data?.[0] || {};

  // console.log('asjdlasl',averageRating,checkin,communication,cleanliness)



  console.log('usersss', user)
  return (

    // .container>div*{ssdflk}+div>p*4{items}
    <div className="bg-[]">
      <div className="container mx-auto mt-8 text-white flex items-center justify-between p-4  ">
        <Link className="text-lg font-medium" href="/">
          {" "}
          <LeftOutlined /> {guestydata?.title}
        </Link>

      </div>

      <div className="flex flex-col lg:flex-row text-white lg:p-2 md:p-2 p-4 container mx-auto">
        {/* Image Carousel */}
        <div className="lg:w-2/3">
          {/* Image Carousel */}
          <Carousel
            ref={carouselRef}
            beforeChange={(current, next) => setActiveSlide(next)}
          >
            {guestydata?.pictures?.map((image, index) => (
              <div key={index}>
                <Image
                  src={image?.original}
                  alt={`Room Slide ${index + 1}`}
                  width={800}
                  height={600}
                  className="w-full max-h-[600px] h-auto rounded-md"
                />
              </div>
            ))}
          </Carousel>

          {/* Preview Section */}
          <div className="mt-4 flex space-x-4">
            {guestydata?.pictures?.slice(0, 6).map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer ${activeSlide === index ? "border-2 border-yellow-500" : ""
                  }`}
                onClick={() => handlePreviewClick(index)}
              >
                <Image
                  src={image?.thumbnail}
                  alt={`Preview ${index + 1}`}
                  width={150}
                  height={100}
                  className="rounded-md max-h-[100px]"
                />
              </div>
            ))}
          </div>

          <p className="mt-4 text-[24px] font-bold text-[#FFFFFF]">
            Room in {location}
          </p>
          <p className="text-sm">Room id: {roomId}</p>
        </div>

        {/* Booking Form */}
        <div className="lg:w-1/3 lg:ml-8 mt-8 lg:mt-0 bg-[#1B1B1B] h-fit pb-20 rounded-lg space-y-8 p-6">
          <h2 className="text-2xl  font-semibold">
            {perNightRate.toFixed(2)} - {guestydata?.prices?.currency}
            <span className="text-base font-light">Per night</span>
          </h2>

          <div className="mt-4">
            <RangePicker
            disabledDate={isDateBlocked}
              style={{
                height: "44px",
                backgroundColor: "#4B4B4B",
                border: "none",
                color: "white",
              }}
              className="w-full text-[16px] font-medium"
              placeholder={["Check-in", "Check-out"]}
              onChange={handleDateChange}
            />
          </div>

          <div className="mt-4">
            <InputNumber
              min={1}
              max={maxGuests}
              defaultValue={2}
              className="w-full text-[16px] font-medium custom-input" // Add custom class
              placeholder="Guests"
              onChange={handleGuestsChange}
            />
          </div>

          <div className="mt-4">
            <Input
              required
              disabled
              style={{ backgroundColor: '#4B4B4B', height: '44px', border: 'none', color: 'white' }}
              defaultValue={user?.email}
              className="w-full text-[16px] font-medium " // Add custom class


            />
          </div>
          <div className="mt-4">
            <InputNumber
              required
              type="number"
              style={{ backgroundColor: '#4B4B4B', height: '44px', border: 'none', color: 'white' }}
              defaultValue={user?.phone}
              className="w-full text-[16px] font-medium " // Add custom class
              placeholder="your phone number"
              onChange={handleContactChange}
            />
          </div>

          <Button
            style={{
              height: "44px",
              backgroundColor: "#EBCA7E",
              border: "none",
              color: "#0F0F0F",
            }}
            type="primary"
            className="mt-4 w-full text-[16px] font-bold bg-yellow-500  text-black"
            onClick={handleReserveClick} // Attach the click handler here
          >
            {
              reservationLoading ? "loading..." : "Reserve"
            }

          </Button>
          <p className="mt-4 text-sm text-[#FFFFFFB2] font-medium text-center py-8">
            You won’t be charged yetz
          </p>
          {/* Pricing Breakdown */}
          <div className="mt-8 text-[16px] font-medium text-[#FFFFFFCC] ">
            {dates ? (
              <div className="text-[#FFFFFF] font-medium space-y-3">
                <p className="flex justify-between ">
                  <span>
                    {guestydata?.prices?.currency}{perNightRate} * {dates[1].diff(dates[0], "day")} nights
                  </span>
                  <span>{guestydata?.prices?.currency}{perNightRate * dates[1].diff(dates[0], "day")}</span>
                </p>
                <p className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span> {guestydata?.prices?.currency} {cleaningFee}</span>
                </p>
                <p className="flex justify-between">
                  <span>Appartali service fee</span>
                  <span> {guestydata?.prices?.currency}  {serviceFee}</span>
                </p>
                <hr className="my-2 " />
                <p className="flex pt-2 justify-between font-medium text-[#FFFFFF]">
                  <span>Total before taxes</span>
                  <span> {guestydata?.prices?.currency}  {total.toFixed(2)}</span>
                </p>
              </div>
            ) : (
              <div className="text-[#FFFFFF] font-medium space-y-3">
                <p className="flex justify-between">
                  <span>{guestydata?.prices?.currency} 0.00 * 0 nights</span>
                  <span>{guestydata?.prices?.currency} 0.00</span>
                </p>
                <p className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>{guestydata?.prices?.currency} 0.00</span>
                </p>
                <p className="flex justify-between">
                  <span>Appartali service fee</span>
                  <span>{guestydata?.prices?.currency} 0.00</span>
                </p>
                <hr className="my-2 border-dashed border-1 border-gray-600" />
                <p className="flex pt-2 justify-between text-[#FFFFFF] font-medium">
                  <span>Total before taxes</span>
                  <span>{guestydata?.prices?.currency} 0.00</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto bg-[#1B1B1B]  lg:flex flex-wrap space-y-6 text-center items-center justify-between p-4 my-8 rounded-lg">
        <div className="text-[#FFFFFF] font-bold text-[28px] flex items-center justify-arround p-4 w-fit gap-4 lg:mx-0  mx-auto">
          <Image
            src={favimg}
            alt="Favourite"
            width={30}
            height={30}
            className="mr-2"
          />
          <span className="text-white font-medium">
            Guest <br /> favorite
          </span>
          <Image
            src={favimg}
            alt="Favourite"
            width={30}
            height={30}
            className="mr-2"
          />
        </div>
        <div>
          <p className="text-[#FFFFFFCC] font-medium text-[16px]  ">
            One of the most loved homes <br /> on Appartali, according to guest
          </p>
        </div>

        <div className="text-[#FFFFFFCC] text-center">
          <h1 className="text-[24px] font-bold pl-4">{guestydata?.reviews?.avg}</h1>
          <Rate className="ml-12" disabled value={guestydata?.reviews?.avg} />
        </div>
        <div className="text-[#FFFFFFCC] ">
          <h1 className="text-[24px] font-bold">{guestydata?.reviews?.total}</h1>
          <p className="underline">Reviews </p>
        </div>
      </div>

      {/* about room section-------------------------- */}
      <div className="container mx-auto">
        <div className="lg:flex md:flex flex-row items-center justify-between p-4 my-8 border border-[#424242] rounded-lg">
          {/* Profile Section */}
          <Card className="w-full bg-transparent text-white" bordered={false}>
            <div className="flex items-center">
              {
                owner?.image ? <Avatar
                  size="large"
                  icon={
                    <Image
                      height={96}
                      width={96}
                      src={imageUrl + owner?.image}
                      alt="Profile"
                    />
                  }
                /> : <div className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-gray-400 "> <UserOutlined className="text-xl " /></div>
              }
              <div className="ml-4">
                <h2 className="text-xl  font-bold">Stay with {owner?.firstName}</h2>
                <p className="text-sm text-[#FFFFFFCC]">
                  {owner?.role?.map((i, idx) => <span key={idx} className="pr-1"> {i}</span>)} • 12 years hosting
                </p>
              </div>
            </div>
            <br />
            <h2 className="text-xl  font-bold py-4">About this place</h2>
            <p className="text-[#FFFFFFCC] text-[16px] font-normal leading-6 max-w-lg">
              {guestydata?.publicDescription?.summary}
            </p>
          </Card>

          {/* About Room Section */}
          <Card
            className="w-full bg-transparent text-white mt-4"
            bordered={false}
          >
            <h2 className="text-xl  font-bold py-4">About room</h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <HomeOutlined className="text-xl" />{" "}
                <div>
                  <h3 className="text-lg  font-bold text-[#FFFFFF]">
                    Room in a town house
                  </h3>{" "}
                  <p className="text-sm text-[#FFFFFFCC] font-normal">
                    Your own room in a home, plus access to shared spaces.
                  </p>{" "}
                </div>
              </li>

              <li className="flex items-center space-x-4">
                <HomeFilled className="text-xl" />{" "}
                <div>
                  <h3 className="text-lg  font-bold text-[#FFFFFF]">
                    Shared common spaces
                  </h3>{" "}
                  <p className="text-sm text-[#FFFFFFCC] font-normal">
                    You {'`'}ll share parts of the home with the Host.
                  </p>{" "}
                </div>
              </li>

              <li className="flex items-center space-x-4">
                <ShopOutlined className="text-xl" />{" "}
                <div>
                  <h3 className="text-lg  font-bold text-[#FFFFFF]">
                    Shared bathroom
                  </h3>{" "}
                  <p className="text-sm text-[#FFFFFFCC] font-normal">
                    You`ll share the bathroom with others.
                  </p>{" "}
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <CheckCircleFilled className="text-xl" />{" "}
                <div>
                  <h3 className="text-lg  font-bold text-[#FFFFFF]">
                    David is a superhost
                  </h3>{" "}
                  <p className="text-sm text-[#FFFFFFCC] font-normal">
                    Superhosts are experienced, highly rated Hosts.
                  </p>{" "}
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>











      {/* what this places offers section-------------------- */}
      <div className=" container mx-auto  border-b-2 border-[#424242]  my-6 p-4">
        <h2 className="text-xl text-white  font-bold">
          What this places offers
        </h2>
        <div className="w-full  ">
          <ul className="space-y-4 grid grid-cols-2 w-full   ">
            {guestydata?.amenities?.map(service => service.trim()).map((service, idx) => (
              <li key={idx} className="flex items-center space-x-4 text-[#FFFFFFCC] font-normal">
                {renderServiceIcon(service)}
                <p className="text-sm text-[#FFFFFFCC] font-normal text-[16px]">
                  {service}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:flex md:flex flex-row  my-8  w-full">
          {/* Left Column - First 5 Items */}

          {/* Right Column - Remaining Items */}
          <div className="w-full lg:pl-8 md:pl-8 lg:mt-0 md:mt-0 mt-8">
            {/* <ul className="space-y-4">
              {services[0]?.split(',').map(service => service.trim()).slice(5).map((service, idx) => (
                <li key={idx} className="flex items-center space-x-4 text-[#FFFFFFCC] font-normal">
                  {renderServiceIcon(service)}
                  <p className="text-sm text-[#FFFFFFCC] font-normal text-[16px]">
                    {service}
                  </p>
                </li>
              ))}
            </ul> */}
          </div>
        </div>


      </div>

      {/* guest fevorite section -------------------- */}
      <div className=" border-b-2 border-[#424242]  my-6 container mx-auto p-4">
        <div className="space-y-2 py-8  ">
          <div className="text-[#FFFFFFCC] mx-auto w-fit ">
            <h1 className="text-[24px] font-bold pl-4 text-white"> {guestydata?.reviews?.avg}</h1>
            <Rate className="w-fit mx-auto text-center" allowHalf disabled value={guestydata?.reviews?.avg} />
          </div>
          <h1 className="text-2xl text-white  font-bold  text-center">
            Guest favorite
          </h1>
          <p className="text-[16px] text-[#FFFFFFCC] font-normal max-w-md mx-auto text-center">
            One of the most loved homes on Airbnb based on ratings, reviews, and
            reliability
          </p>
        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2   space-x-4 my-12">
          <div className="border-r border-[#424242]  pr-8 mb-4 w-full max-w-xs text-center space-y-3">
            <h3 className="text-lg  font-medium text-[#FFFFFF]">
              Overall rating
            </h3>
            <Progress
              percent={
                averageRating === 1 ? 20 :
                  averageRating === 2 ? 40 :
                    averageRating === 3 ? 60 :
                      averageRating === 4 ? 80 :
                        averageRating === 5 ? 100 : 0
              }
              width={100}
              format={(percent) => (
                <span style={{ color: "white" }}>{averageRating}</span>
              )}
            />

            <Progress
              percent={
                cleanliness === 1 ? 20 :
                  cleanliness === 2 ? 40 :
                    cleanliness === 3 ? 60 :
                      cleanliness === 4 ? 80 :
                        cleanliness === 5 ? 100 : 0
              }
              width={100}
              format={(percent) => (
                <span style={{ color: "white" }}>{cleanliness}</span>
              )}
            />
            <Progress
              percent={
                checkin === 1 ? 20 :
                  checkin === 2 ? 40 :
                    checkin === 3 ? 60 :
                      checkin === 4 ? 80 :
                        checkin === 5 ? 100 : 0
              }
              width={100}
              format={(percent) => (
                <span style={{ color: "white" }}>{checkin}</span>
              )}
            />
            <Progress
              percent={
                communication === 1 ? 20 :
                  communication === 2 ? 40 :
                    communication === 3 ? 60 :
                      communication === 4 ? 80 :
                        communication === 5 ? 100 : 0
              }
              width={100}
              format={(percent) => (
                <span style={{ color: "white" }}>{communication}</span>
              )}
            />
            <Progress
              percent={
                values === 1 ? 20 :
                  values === 2 ? 40 :
                    values === 3 ? 60 :
                      values === 4 ? 80 :
                        values === 5 ? 100 : 0
              }
              width={100}
              format={(percent) => (
                <span style={{ color: "white" }}>{values}</span>
              )}
            />
          </div>

          <div className="border-r border-[#424242]  pr-8 mb-4 space-y-2 w-full max-w-xs text-center">
            <h3 className="text-lg  font-medium text-[#FFFFFF]">Cleanliness</h3>
            <h3 className="text-xl font-bold text-center text-[#FFFFFF]">
              {cleanliness}
            </h3>
            <PiSprayBottle className="text-6xl text-white text-center block mx-auto" />
          </div>
          <div className="border-r border-[#424242]  pr-8 mb-4 space-y-2 w-full max-w-xs text-center">
            <h3 className="text-lg  font-medium text-[#FFFFFF]">Check In</h3>
            <h3 className="text-xl font-bold text-center text-[#FFFFFF]">
              {checkin}
            </h3>
            <IoIosKey className="text-6xl text-white text-center block mx-auto" />
          </div>

          <div className="border-r border-[#424242]  pr-8 mb-4 space-y-2 w-full max-w-xs text-center">
            <h3 className="text-lg  font-medium text-[#FFFFFF]">
              Communication
            </h3>
            <h3 className="text-xl font-bold text-center text-[#FFFFFF]">
              {communication}
            </h3>
            <MessageOutlined className="text-6xl text-white text-center block mx-auto" />
          </div>

          <div className=" space-y-2 w-full max-w-xs text-center">
            <h3 className="text-lg  font-medium text-[#FFFFFF]">Values</h3>
            <h3 className="text-xl font-bold text-center text-[#FFFFFF]">
              {values}
            </h3>
            <FaCircleNotch className="text-6xl text-white text-center block mx-auto" />
          </div>
        </div>
      </div>



      {/* all reviews hurdCodedreviews---------------------------- */}
      <div className="container mx-auto">
        <div className=" text-white py-8 px-4 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews?.slice(0, visibleReviews).map((review) => (
              <Card
                key={review?._id}
                className="bg-[#1c1c1c] text-white"
                style={{ border: "none" }}
              >
                <div className="flex items-center mb-2">
                  {
                    review?.user?.image ? <Avatar
                      size="large"
                      icon={
                        <Image
                          height={96}
                          width={96}
                          src={imageUrl + review?.user?.image}
                          alt="Profile"
                        />
                      }
                    /> : <div className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-gray-400 "> <UserOutlined className="text-xl " /></div>
                  }

                  <div className="ml-2">
                    <p className="text-[16px] text-[#FFFFFF] font-bold">
                      {review?.user?.fullName}
                    </p>
                    <p className="text-[12px] text-[#FFFFFFCC] font-normal">
                      {review?.years} years on {review?.user?.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Rate
                    disabled
                    defaultValue={review?.rating}
                    className="mb-1"
                  />
                  <p className="text-[12px] font-medium text-[#FFFFFF] pb-4">
                    <span className="text-4xl font-bold">. </span>
                    {new Date(review?.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm mt-2">
                  {expandedReviewIds.includes(review?._id)
                    ? review.review
                    : review.review.slice(0, 250)}
                </p>

                <Button
                  type="link"
                  className="text-yellow-500 p-0"
                  onClick={() => toggleShowMore(review?._id)}
                >
                  {expandedReviewIds.includes(review?._id)
                    ? "Show less"
                    : "Show more"}
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-4 text-center w-full flex items-center justify-end">
            <Button
              style={{ backgroundColor: "#EBCA7E", width: "240px", height: "44px", color: "#000000" }}
              className=" border-none text-black font-bold"
              type="primary"
              onClick={handleShowAll}

            >
              Show all
            </Button>
          </div>

        </div>
      </div>

      <div className="container mx-auto border-t-2 border-[#424242]  my-12 p-4">
        <h3 className="text-[24px]  font-bold text-[#FFFFFF] py-6">Meet your host</h3>
        <div className=" text-white  flex  items-center">
          <Card
            className="w-full bg-transparent lg:p-8"
            bordered={false}
            bodyStyle={{ padding: 0 }}
          >
            <div className="lg:flex md:flex flex-row gap-8 ">
              {/* Left Section: Host Info */}
              <div className="bg-[#242424] h-fit rounded-lg p-6 w-full max-w-md ">
                <div className="flex items-center pb-4">
                  {/* Avatar and Name */}


                  {
                    owner?.image ? <Avatar size={80} className="bg-gray-400">
                      <Image height={96}
                        width={100} src={imageUrl + owner?.image} alt="Avatar" />
                    </Avatar> : <div className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-gray-400 "> <UserOutlined className="text-xl " /></div>
                  }

                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-white">
                      {owner?.firstName}
                    </h2>
                    <Tooltip title="Superhost">
                      <span className="text-[#FFFFFFCC] text-sm font-semibold">
                        {owner?.role?.map((i, idx) => <span key={idx} className="pr-1"> {i}</span>)}
                      </span>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex items-center justify-around pb-4">
                  <div className="mt-2">
                    <div className="text-sm text-gray-400 mt-2 text-center">
                      {" "}
                      <p className="text-[#FFFFFF] text-2xl pb-1 font-bold">
                        {reviews?.length}
                      </p>{" "}
                      Reviews
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="text-sm text-gray-400 mt-2 text-center">
                      <p className="text-[#FFFFFF] text-2xl pb-1 font-bold">
                        {totalRatings}*
                      </p>{" "}
                      Ratings
                    </div>
                  </div>
                  {/* <div className="text-sm text-gray-400 mt-2">
                    <p className="text-[#FFFFFF] text-2xl pb-1 font-bold">
                      7 years
                    </p>{" "}
                    Hosting
                  </div> */}
                </div>
              </div>

              {/* Right Section: Host Details */}
              <div className="w-full">
                <div className="mb-4">
                  <h3 className="text-[20px] font-medium text-white">
                    {owner?.fullName}  {owner?.role?.map((i, idx )=> <span key={idx} className="pr-1">{i}</span>)}
                  </h3>
                  <p className="text-sm text-[#FFFFFFCC] opacity-70 py-4">
                    Superhosts are experienced, highly rated hosts who are
                    committed to <br /> providing great stays for guests.
                  </p>
                </div>
                <div className="mb-4">

                  <div className="flex items-center space-x-2">
                    <div>
                      {
                        owner?.image ? <Avatar size={80} className="bg-gray-400">
                          <Image height={96}
                            width={100} src={imageUrl + owner?.image} alt="Avatar" />
                        </Avatar> : <div className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-gray-400 "> <UserOutlined className="text-xl " /></div>
                      }
                    </div>
                    <div>
                      <p className="text-[20px] font-[300] opacity-70 text-[#FFFFFFCC]">
                        {owner?.firstName}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-4 flex items-center justify-between" >
                  <div>
                    <h3 className="text-[20px] font-medium text-[#FFFFFFCC] pb-3">
                      Host Details:
                    </h3>

                    <p className="text-[20px] font-[300] opacity-70 text-[#FFFFFFCC]">
                      Email: {owner?.email}
                    </p>
                    <p className="text-[20px] font-[300] opacity-70 text-[#FFFFFFCC]">
                      Phone : {owner?.phone}
                    </p>
                  </div>
                  {/* Message Button */}
                  {/* <Link href={"/message"}	> 
             <Button
              style={{backgroundColor: "#EBCA7E",width: "240px",height: "44px", color: "#000000"}}
                type="primary"
                className=" border-none text-black font-bold"
              >
                Message
              </Button>
              
              </Link> */}
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="mt-6 flex justify-between items-center">
              {/* Work and Languages */}
              <div className="text-sm space-y-2">

                <p className="flex gap-3 text-[16px] text-white font-medium"> <FaLanguage className="text-[24px]" /> Language: <span className="text-white opacity-70">English</span></p>
                <p className="flex gap-3  text-[16px] text-white font-medium"> <FaLocationPinLock className="text-[24px]" />Lives in: <span className="text-white opacity-70">{owner?.address || 'address not found'}</span></p>
              </div>

            </div>
          </Card>
        </div>
      </div>


      {/* add review or ratings ---------------------------- */}
      <div className="container mx-auto my-12 bg-[#242424] p-6 rounded-lg text-white">
        <form onSubmit={handleSubmit} className="review-form">
          <h2 className="text-lg font-bold mb-4">Leave a Review</h2>
          <Input.TextArea
            rows={8}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            style={{ marginBottom: '12px', backgroundColor: '#242424', color: '#FFFFFFCC' }}
            className="bg-[#242424] text-[#FFFFFFCC] opacity-70"
          />
          <div>
            <div className="flex items-center jsutify-center space-x-2">
              <h3>Rate this item:</h3>
              <div style={{ display: 'flex' }}>
                {[...Array(5)].map((_, index) => {
                  const isFilled = (hoverValue || rating) > index;
                  return (
                    <FaStar
                      key={index}
                      onClick={() => handleClick(index)}
                      onMouseOver={() => handleMouseOver(index)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        cursor: 'pointer',
                        color: isFilled ? 'goldenrod' : 'white',
                        transition: 'color 0.2s',
                      }}
                      size={24} // Adjust size as needed
                    />
                  );
                })}
              </div>
            </div>

          </div>
          <br />
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#EBCA7E",
              borderColor: "#EBCA7E",
              width: "240px",
              height: "44px",
              color: "#000000",
              fontWeight: "500"
            }}
          >
            Submit Review
          </Button>
        </form>
      </div>

      {/* add review or ratings end ---------------------------- */}

    </div>
  );
};

export default Page;
