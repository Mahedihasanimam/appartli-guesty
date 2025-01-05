

// "use client";
// import { Avatar, Button, Card, Pagination, Rate, Tooltip } from "antd";
// import Image from "next/image";
// import React, { useState } from "react";
// import { FaLanguage } from "react-icons/fa";
// import { FaLocationPinLock } from "react-icons/fa6";
// import { MdOutlineWorkOutline } from "react-icons/md";
// import userimg from "/public/images/user.png";
// import profileimg from "/public/images/about.png";
// import Link from "next/link";
// import { useGetAllReviewByPropertyIdQuery } from "@/redux/features/Propertyapi/page";

// import { useRouter, useSearchParams } from "next/navigation";
// import { UserOutlined } from "@ant-design/icons";

// const Page = ({params}) => {



//   return (
//     <Suspense fallback={<h1>Loading...</h1>}>
//       <PageContent params={params} />
//     </Suspense>
//   );
// };









// const PageContent=({params}){
  
// }

// const searchParams=useSearchParams()
//   const id = searchParams.get('id')
//   const [expandedReviewIds, setExpandedReviewIds] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 8;



// const {data,isLoading}=useGetAllReviewByPropertyIdQuery(id)

// if(isLoading){
//   return <h1>Loading...</h1>
// }

// const reviews=data?.data
// console.log('all reviews',reviews)




//   const toggleShowMore = (id) => {
//     if (expandedReviewIds.includes(id)) {
//       setExpandedReviewIds(expandedReviewIds.filter((reviewId) => reviewId !== id));
//     } else {
//       setExpandedReviewIds([...expandedReviewIds, id]);
//     }
//   };

//   // Calculate the reviews to display for the current page
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const displayedReviews = reviews.slice(startIndex, endIndex);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < Math.ceil(reviews.length / pageSize)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
    // <div>
    //      <div className="container mx-auto   my-12 p-4">
    //     <h3 className="text-[24px]  font-bold text-[#FFFFFF] py-6">
    //       Meet your host
    //     </h3>
    //     <div className=" text-white  flex  items-center">
        
    //        <Card
    //         className="w-full bg-transparent lg:p-8"
    //         bordered={false}
    //         bodyStyle={{ padding: 0 }}
    //       >
    //         <div className="lg:flex md:flex flex-row gap-8 ">
    //           {/* Left Section: Host Info */}
    //           <div className="bg-[#242424] h-fit rounded-lg p-6 w-full max-w-md ">
    //             <div className="flex items-center pb-4">
    //               {/* Avatar and Name */}
    //               <Avatar size={80} className="bg-gray-400">
    //                 <Image src={userimg} alt="Avatar" />
    //               </Avatar>
    //               <div className="ml-4">
    //                 <h2 className="text-lg font-semibold text-white">
    //                   Jenifer Lopez
    //                 </h2>
    //                 <Tooltip title="Superhost">
    //                   <span className="text-[#FFFFFFCC] text-sm font-semibold">
    //                     Superhost
    //                   </span>
    //                 </Tooltip>
    //               </div>
    //             </div>
    //             <div className="flex items-center justify-around pb-4">
    //               <div className="mt-2">
    //                 <div className="text-sm text-gray-400 mt-2">
    //                   {" "}
    //                   <p className="text-[#FFFFFF] text-2xl pb-1 font-bold">
    //                     939
    //                   </p>{" "}
    //                   Reviews
    //                 </div>
    //               </div>
    //               <div className="flex items-center mt-1">
    //                 <div className="text-sm text-gray-400 mt-2">
    //                   <p className="text-[#FFFFFF] text-2xl pb-1 font-bold">
    //                     939 *
    //                   </p>{" "}
    //                   Ratings
    //                 </div>
    //               </div>
    //               <div className="text-sm text-gray-400 mt-2">
    //                 <p className="text-[#FFFFFF] text-2xl pb-1 font-bold">
    //                   7 years
    //                 </p>{" "}
    //                 Hosting
    //               </div>
    //             </div>
    //           </div>

    //           {/* Right Section: Host Details */}
    //           <div className="w-full">
    //             <div className="mb-4">
    //               <h3 className="text-[20px] font-medium text-white">
    //                 Bua is a Superhost:
    //               </h3>
    //               <p className="text-sm text-[#FFFFFFCC] opacity-70 py-4">
    //                 Superhosts are experienced, highly rated hosts who are
    //                 committed to <br /> providing great stays for guests.
    //               </p>
    //             </div>
    //             <div className="mb-4">
    //               <h3 className="text-[20px] font-medium text-[#FFFFFFCC] pb-3">
    //                 Co-Host:
    //               </h3>
    //               <div className="flex items-center space-x-2">
    //                 <div>
    //                   <Avatar size={30} className="bg-gray-400">
    //                     <Image src={userimg} alt="Avatar" />
    //                   </Avatar>
    //                 </div>
    //                 <div>
    //                   <p className="text-[20px] font-[300] opacity-70 text-[#FFFFFFCC]">
    //                     Riyad Hasan
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="mb-4 flex items-center justify-between">
    //               <div>
    //                 <h3 className="text-[20px] font-medium text-[#FFFFFFCC] pb-3">
    //                   Host Details:
    //                 </h3>

    //                 <p className="text-[20px] font-[300] opacity-70 text-[#FFFFFFCC]">
    //                   Response Rate: 87%
    //                 </p>
    //                 <p className="text-[20px] font-[300] opacity-70 text-[#FFFFFFCC]">
    //                   Response within one hour
    //                 </p>
    //               </div>
    //                      {/* Message Button */}
    //          {/* <Link href={"/message"}	> 
    //          <Button
    //           style={{backgroundColor: "#EBCA7E",width: "240px",height: "44px", color: "#000000"}}
    //             type="primary"
    //             className=" border-none text-black font-bold"
    //           >
    //             Message
    //           </Button></Link> */}
    //             </div>
    //           </div>
    //         </div>

    //         {/* Footer Section */}
    //         <div className="mt-6 flex justify-between items-center">
    //           {/* Work and Languages */}
    //           <div className="text-sm space-y-2">
    //             <p className="flex gap-3  text-[16px] text-white font-medium">
    //               {" "}
    //               <MdOutlineWorkOutline className="text-[24px]" /> My work:{" "}
    //               <span className="text-white opacity-70">F&B Business</span>
    //             </p>
    //             <p className="flex gap-3 text-[16px] text-white font-medium">
    //               {" "}
    //               <FaLanguage className="text-[24px]" /> Language:{" "}
    //               <span className="text-white opacity-70">
    //                 English & Spanish
    //               </span>
    //             </p>
    //             <p className="flex gap-3  text-[16px] text-white font-medium">
    //               {" "}
    //               <FaLocationPinLock className="text-[24px]" />
    //               Lives in:{" "}
    //               <span className="text-white opacity-70">
    //                 Times Square, USA
    //               </span>
    //             </p>
    //           </div>
    //         </div>
    //       </Card>

    //     </div>
    //   </div>
    //   <div className="container mx-auto border-t-2 border-[#424242] my-12 p-4">
    //     <h3 className="text-[24px] font-bold text-[#FFFFFF] py-6">Meet your host</h3>
    //     <div className="text-white flex items-center">
    //       <Card className="w-full bg-transparent lg:p-8" bordered={false} bodyStyle={{ padding: 0 }}>
    //         {/* Host information and details */}
    //         {/* Content here */}

    //         {/* Reviews Section */}
    //         <div className="mt-8">
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //         {displayedReviews.map((review) => (
    //           <Card
    //             key={review._id}
    //             className="bg-[#1c1c1c] text-white"
    //             style={{ border: "none" }}
    //           >
    //             <div className="flex items-center mb-2">
    //             {
    //             review?.user?.image ? <Avatar
    //               size="large"
    //               icon={
    //                 <Image
    //                   height={96}
    //                   width={96}
    //                   src={imageUrl+review?.user?.image}
    //                   alt="Profile"
    //                 />
    //               }
    //             /> : <div className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-gray-400 "> <UserOutlined className="text-xl " /></div>
    //           }
                  

    //               <div className="ml-2">
    //                 <p className="text-[16px] text-[#FFFFFF] font-bold">
    //                   {review?.user?.fullName}
    //                 </p>
    //                 <p className="text-[12px] text-[#FFFFFFCC] font-normal">
    //                 {review.years} years on {review?.user?.location}
    //                 </p>
    //               </div>
    //             </div>
    //             <div className="flex items-center space-x-2">
    //               <Rate
                  
    //                 disabled
    //                 defaultValue={review.rating}
    //                 className="mb-1 text-secoundary"
    //               />
    //               <p className="text-[12px] font-medium text-[#FFFFFF] pb-4">
    //                 <span className="text-4xl font-bold">. </span>
    //                 {review?.createdAt && new Date(review.createdAt).toLocaleDateString()}
    //               </p>
    //             </div>
    //             <p className="text-sm mt-2">
    //               {expandedReviewIds.includes(review?._id)
    //                 ? review.review
    //                 : review.review.slice(0,250) }
    //             </p>
    //             <Button
    //               type="link"
    //               className="text-yellow-500 p-0"
    //               onClick={() => toggleShowMore(review?._id)}
    //             >
    //               {expandedReviewIds.includes(review?._id)
    //                 ? "Show less"
    //                 : "Show more"}
    //             </Button>
    //           </Card>
    //         ))}
    //       </div>

    //           {/* Pagination Component */}
    //           <div className="flex justify-center items-center gap-4 mt-8 border-t-2 border-[#424242] p-6 w-full">
              
    //          <div className="flex justify-between items-center gap-4 w-full">
    //                   {/* Page information */}
    //           <div className="text-center text-white mt-2">
    //             Page {currentPage} of {Math.ceil(reviews.length / pageSize)}
    //           </div>
    //             <Pagination
    //               current={currentPage}
    //               total={reviews.length}
    //               pageSize={pageSize}
    //               onChange={handlePageChange}
    //               showSizeChanger={false}
    //               className="text-center"
    //               style={{ color: "#FFFFFF" }}
    //             />
    //          </div>
    //              <div className="flex justify-end items-center gap-4 w-full">
    //              <Button onClick={handlePrevious} >
    //               Previous
    //             </Button>
    //             <Button
    //               onClick={handleNext}
                  
    //             >
    //               Next
    //             </Button>
    //              </div>
    //           </div>

           
    //         </div>
    //       </Card>
    //     </div>
    //   </div>
    // </div>
//   );


// export default Page;
"use client";
import { Avatar, Button, Card, Pagination, Rate, Tooltip } from "antd";
import Image from "next/image";
import React, { useState, Suspense } from "react"; // Import Suspense
import { FaLanguage } from "react-icons/fa";
import { FaLocationPinLock } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";
import userimg from "/public/images/user.png";
import profileimg from "/public/images/about.png";
import Link from "next/link";
import { useGetAllReviewByPropertyIdQuery, useGetRoomsByIdQuery } from "@/redux/features/Propertyapi/page";
import { useRouter, useSearchParams } from "next/navigation";
import { UserOutlined } from "@ant-design/icons";
import { imageUrl } from "@/redux/api/ApiSlice";

// Main Page component wrapped in Suspense
const Page = ({ params }) => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <PageContent params={params} />
    </Suspense>
  );
};

// PageContent function component
const PageContent = ({ params }) => {
  const searchParams=useSearchParams()
  const id = searchParams.get('id')
  const [expandedReviewIds, setExpandedReviewIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;



const {data,isLoading}=useGetAllReviewByPropertyIdQuery(id)
const { isLoading:roomsdataLoading, data:roomsalldata, error } = useGetRoomsByIdQuery(id);
if(isLoading || roomsdataLoading){
  return <h1>Loading...</h1>
}

const reviews=data?.data
console.log('all reviews',reviews)




  const toggleShowMore = (id) => {
    if (expandedReviewIds.includes(id)) {
      setExpandedReviewIds(expandedReviewIds.filter((reviewId) => reviewId !== id));
    } else {
      setExpandedReviewIds([...expandedReviewIds, id]);
    }
  };

  // Calculate the reviews to display for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedReviews = reviews.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(reviews.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };



  const { images, location, maxGuests, owner, roomCount, startDate, endDate, roomId, totalRatings } = roomsalldata?.room

  console.log(owner)
  return (
    <div>
               <div className=" text-white  flex  items-center container mx-auto my-12">
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
                        {owner?.role?.map((i, idx )=> <span key={idx} className="pr-1"> {i}</span>)}
                      </span>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex items-center justify-around pb-4">
                  <div className="mt-2">
                    <div className="text-sm text-gray-400 mt-2 text-center">
                      {" "}
                      <p className="text-[#FFFFFF] text-2xl pb-1 font-bold">
                        {reviews.length}
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
                    {owner?.firstName} {owner?.role?.map((i, idx) => <span key={idx} className="pr-1">{i}</span>)}
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
                        {owner?.fullName}
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



      <div className="container mx-auto  my-12 p-4">

        <div className="text-white flex items-center">
          <Card className="w-full bg-transparent lg:p-8" bordered={false} bodyStyle={{ padding: 0 }}>
            {/* Host information and details */}
            {/* Content here */}

            {/* Reviews Section */}
            <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedReviews.map((review) => (
              <Card
                key={review._id}
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
                      src={imageUrl+review?.user?.image}
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
                    {review.years} years on {review?.user?.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Rate
                  
                    disabled
                    defaultValue={review.rating}
                    className="mb-1 text-secoundary"
                  />
                  <p className="text-[12px] font-medium text-[#FFFFFF] pb-4">
                    <span className="text-4xl font-bold">. </span>
                    {review?.createdAt && new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm mt-2">
                  {expandedReviewIds.includes(review?._id)
                    ? review.review
                    : review.review.slice(0,250) }
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

              {/* Pagination Component */}
              <div className="flex justify-center items-center gap-4 mt-8 border-t-2 border-[#424242] p-6 w-full">
              
             <div className="flex justify-between items-center gap-4 w-full">
                      {/* Page information */}
              <div className="text-center text-white mt-2">
                Page {currentPage} of {Math.ceil(reviews.length / pageSize)}
              </div>
                <Pagination
                  current={currentPage}
                  total={reviews.length}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  className="text-center"
                  style={{ color: "#FFFFFF" }}
                />
             </div>
                 <div className="flex justify-end items-center gap-4 w-full">
                 <Button onClick={handlePrevious} >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  
                >
                  Next
                </Button>
                 </div>
              </div>

           
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
