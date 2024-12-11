

// 'use client'
// import { Button, Rate, Table, Pagination, DatePicker, Tabs } from "antd";
// import { MdOutlineChevronLeft } from "react-icons/md";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import dayjs from "dayjs";
// import Image from "next/image";
// import imageone from "/public/images/user.png";
// import { useLogdinuserReservationQuery } from "@/redux/features/Propertyapi/page";

// const Page = () => {
//   const router = useRouter();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(10);
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [activeTab, setActiveTab] = useState("all");
//   const { data, isLoading } = useLogdinuserReservationQuery()
//   // Separate data for each tab

//   const upcomingData = data?.rooms?.filter((reservation) => reservation.checkinCheckoutStatus === 'upcoming' && new Date(reservation.checkOutDate) > new Date());
//   const checkingInReservations = data?.rooms?.filter((reservation) => reservation.checkinCheckoutStatus === 'checkin');
//   const checkOutReservations = data?.rooms?.filter((reservation) => reservation.checkinCheckoutStatus === 'checkout' && new Date(reservation.checkInDate) < new Date());

// console.log(upcomingData)



//   const allData = [
//     {
//       "key": "1",
//       "name": "Md. Mehedi Hasan",
//       "email": "example@gmail.com",
//       "phone": "+8801825455",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "---",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "2",
//       "name": "John Doe",
//       "email": "john@example.com",
//       "phone": "+8801825455",
//       "checkIn": "20 Aug, 2024",
//       "checkOut": "25 Aug, 2024",
//       "review": 5,
//       "status": "upcoming"
//     },
//     {
//       "key": "3",
//       "name": "Jane Smith",
//       "email": "jane@example.com",
//       "phone": "+8801825455",
//       "checkIn": "18 Aug, 2024",
//       "checkOut": "22 Aug, 2024",
//       "review": 3,
//       "status": "canceled"
//     },
//     {
//       "key": "4",
//       "name": "Alice Johnson",
//       "email": "alice@example.com",
//       "phone": "+8801825455",
//       "checkIn": "15 Aug, 2024",
//       "checkOut": "20 Aug, 2024",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "5",
//       "name": "Bob Brown",
//       "email": "bob@example.com",
//       "phone": "+8801825455",
//       "checkIn": "10 Aug, 2024",
//       "checkOut": "15 Aug, 2024",
//       "review": 4,
//       "status": "upcoming"
//     },
//     {
//       "key": "6",
//       "name": "Charlie Green",
//       "email": "charlie@example.com",
//       "phone": "+8801825455",
//       "checkIn": "05 Aug, 2024",
//       "checkOut": "10 Aug, 2024",
//       "review": 5,
//       "status": "completed"
//     },
//     {
//       "key": "7",
//       "name": "Daisy White",
//       "email": "daisy@example.com",
//       "phone": "+8801825455",
//       "checkIn": "01 Aug, 2024",
//       "checkOut": "05 Aug, 2024",
//       "review": 2,
//       "status": "canceled"
//     },
//     {
//       "key": "8",
//       "name": "Ethan Blue",
//       "email": "ethan@example.com",
//       "phone": "+8801825455",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "---",
//       "review": 4,
//       "status": "upcoming"
//     },
//     {
//       "key": "9",
//       "name": "Fiona Yellow",
//       "email": "fiona@example.com",
//       "phone": "+8801825455",
//       "checkIn": "10 Sep, 2024",
//       "checkOut": "15 Sep, 2024",
//       "review": 4,
//       "status": "upcoming"
//     },
//     {
//       "key": "10",
//       "name": "George Black",
//       "email": "george@example.com",
//       "phone": "+8801825455",
//       "checkIn": "30 Jul, 2024",
//       "checkOut": "05 Aug, 2024",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "11",
//       "name": "Hannah Purple",
//       "email": "hannah@example.com",
//       "phone": "+8801825455",
//       "checkIn": "20 Jul, 2024",
//       "checkOut": "25 Jul, 2024",
//       "review": 3,
//       "status": "canceled"
//     },
//     {
//       "key": "12",
//       "name": "Ivy Red",
//       "email": "ivy@example.com",
//       "phone": "+8801825455",
//       "checkIn": "15 Jul, 2024",
//       "checkOut": "20 Jul, 2024",
//       "review": 5,
//       "status": "completed"
//     },
//     {
//       "key": "13",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "---",
//       "review": 4,
//       "status": "upcoming"
//     },
//     {
//       "key": "14",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//       "review": 4,
//       "status": "upcoming"
//     },
//     {
//       "key": "15",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "16",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "17",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//       "review": 4,
//       "status": "upcoming"
//     },
//     {
//       "key": "18",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "---",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "19",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "20",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "21",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//       "review": 4,
//       "status": "completed"
//     }
//   ];
  

//   const completedData = [
//     {
//       "key": "1",
//       "name": "Md. Mehedi Hasan",
//       "email": "example@gmail.com",
//       "phone": "+8801825455",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "---",
//       "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "completed"
//     },
//     {
//       "key": "2",
//       "name": "John Doe",
//       "email": "john@example.com",
//       "phone": "+8801825455",
//       "checkIn": "20 Aug, 2024",
//       "checkOut": "25 Aug, 2024",
//       "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "upcoming"
//     },
//     {
//       "key": "3",
//       "name": "Jane Smith",
//       "email": "jane@example.com",
//       "phone": "+8801825455",
//       "checkIn": "18 Aug, 2024",
//       "checkOut": "22 Aug, 2024",
//       "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "canceled"
//     },
//     {
//       "key": "4",
//       "name": "Alice Johnson",
//       "email": "alice@example.com",
//       "phone": "+8801825455",
//       "checkIn": "15 Aug, 2024",
//       "checkOut": "20 Aug, 2024",
//         "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "completed"
//     },
//     {
//       "key": "5",
//       "name": "Bob Brown",
//       "email": "bob@example.com",
//       "phone": "+8801825455",
//       "checkIn": "10 Aug, 2024",
//       "checkOut": "15 Aug, 2024",
//         "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "upcoming"
//     },
//     {
//       "key": "6",
//       "name": "Charlie Green",
//       "email": "charlie@example.com",
//       "phone": "+8801825455",
//       "checkIn": "05 Aug, 2024",
//       "checkOut": "10 Aug, 2024",
//       "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "completed"
//     },
//     {
//       "key": "7",
//       "name": "Daisy White",
//       "email": "daisy@example.com",
//       "phone": "+8801825455",
//       "checkIn": "01 Aug, 2024",
//       "checkOut": "05 Aug, 2024",
//       "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "canceled"
//     },
//     {
//       "key": "8",
//       "name": "Ethan Blue",
//       "email": "ethan@example.com",
//       "phone": "+8801825455",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "---",
//         "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "upcoming"
//     },
//     {
//       "key": "9",
//       "name": "Fiona Yellow",
//       "email": "fiona@example.com",
//       "phone": "+8801825455",
//       "checkIn": "10 Sep, 2024",
//       "checkOut": "15 Sep, 2024",
//         "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "upcoming"
//     },
//     {
//       "key": "10",
//       "name": "George Black",
//       "email": "george@example.com",
//       "phone": "+8801825455",
//       "checkIn": "30 Jul, 2024",
//       "checkOut": "05 Aug, 2024",
//         "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "completed"
//     },
//     {
//       "key": "11",
//       "name": "Hannah Purple",
//       "email": "hannah@example.com",
//       "phone": "+8801825455",
//       "checkIn": "20 Jul, 2024",
//       "checkOut": "25 Jul, 2024",
//       "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "canceled"
//     },
//     {
//       "key": "12",
//       "name": "Ivy Red",
//       "email": "ivy@example.com",
//       "phone": "+8801825455",
//       "checkIn": "15 Jul, 2024",
//       "checkOut": "20 Jul, 2024",
//       "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "completed"
//     },
//     {
//       "key": "13",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "---",
//         "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "upcoming"
//     },
//     {
//       "key": "14",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//         "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "upcoming"
//     },
//     {
//       "key": "15",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//         "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "completed"
//     },
//     {
//       "key": "16",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//         "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "completed"
//     },
//     {
//       "key": "17",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//         "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "upcoming"
//     },
//     {
//       "key": "18",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "---",
//         "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "completed"
//     },
//     {
//       "key": "19",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//         "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "completed"
//     },
//     {
//       "key": "20",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//         "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "completed"
//     },
//     {
//       "key": "21",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//         "review": <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} />,
//       "status": "completed"
//     }
//   ];
  

//   const canceledData = [
//     {
//       "key": "1",
//       "name": "Md. Mehedi Hasan",
//       "email": "example@gmail.com",
//       "phone": "+8801825455",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "---",
//        "review": 5,
//       "status": "completed"
//     },
//     {
//       "key": "2",
//       "name": "John Doe",
//       "email": "john@example.com",
//       "phone": "+8801825455",
//       "checkIn": "20 Aug, 2024",
//       "checkOut": "25 Aug, 2024",
//       "review": 5,
//       "status": "upcoming"
//     },
//     {
//       "key": "3",
//       "name": "Jane Smith",
//       "email": "jane@example.com",
//       "phone": "+8801825455",
//       "checkIn": "18 Aug, 2024",
//       "checkOut": "22 Aug, 2024",
//       "review": 3,
//       "status": "canceled"
//     },
//     {
//       "key": "4",
//       "name": "Alice Johnson",
//       "email": "alice@example.com",
//       "phone": "+8801825455",
//       "checkIn": "15 Aug, 2024",
//       "checkOut": "20 Aug, 2024",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "5",
//       "name": "Bob Brown",
//       "email": "bob@example.com",
//       "phone": "+8801825455",
//       "checkIn": "10 Aug, 2024",
//       "checkOut": "15 Aug, 2024",
//       "review": 4,
//       "status": "upcoming"
//     },
//     {
//       "key": "6",
//       "name": "Charlie Green",
//       "email": "charlie@example.com",
//       "phone": "+8801825455",
//       "checkIn": "05 Aug, 2024",
//       "checkOut": "10 Aug, 2024",
//       "review": 5,
//       "status": "completed"
//     },
//     {
//       "key": "7",
//       "name": "Daisy White",
//       "email": "daisy@example.com",
//       "phone": "+8801825455",
//       "checkIn": "01 Aug, 2024",
//       "checkOut": "05 Aug, 2024",
//       "review": 2,
//       "status": "canceled"
//     },
//     {
//       "key": "8",
//       "name": "Ethan Blue",
//       "email": "ethan@example.com",
//       "phone": "+8801825455",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "---",
//       "review": 4,
//       "status": "upcoming"
//     },
//     {
//       "key": "9",
//       "name": "Fiona Yellow",
//       "email": "fiona@example.com",
//       "phone": "+8801825455",
//       "checkIn": "10 Sep, 2024",
//       "checkOut": "15 Sep, 2024",
//       "review": 4,
//       "status": "upcoming"
//     },
//     {
//       "key": "10",
//       "name": "George Black",
//       "email": "george@example.com",
//       "phone": "+8801825455",
//       "checkIn": "30 Jul, 2024",
//       "checkOut": "05 Aug, 2024",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "11",
//       "name": "Hannah Purple",
//       "email": "hannah@example.com",
//       "phone": "+8801825455",
//       "checkIn": "20 Jul, 2024",
//       "checkOut": "25 Jul, 2024",
//       "review": 3,
//       "status": "canceled"
//     },
//     {
//       "key": "12",
//       "name": "Ivy Red",
//       "email": "ivy@example.com",
//       "phone": "+8801825455",
//       "checkIn": "15 Jul, 2024",
//       "checkOut": "20 Jul, 2024",
//       "review": 5,
//       "status": "completed"
//     },
//     {
//       "key": "13",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "---",
//       "review": 4,
//       "status": "upcoming"
//     },
//     {
//       "key": "14",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//       "review": 4,
//       "status": "upcoming"
//     },
//     {
//       "key": "15",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "16",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "17",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//       "review": 4,
//       "status": "upcoming"
//     },
//     {
//       "key": "18",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "---",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "19",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "20",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//       "review": 4,
//       "status": "completed"
//     },
//     {
//       "key": "21",
//       "roomId": "125658",
//       "checkIn": "24 Aug, 2024",
//       "checkOut": "29 Aug, 2024",
//       "review": 4,
//       "status": "completed"
//     }
//   ];

//   // const upcomingData = [
//   //   { key: "1", name: 'Diana Prince', email: "diana@example.com", phone: '+8804444444', checkIn: "23 Aug, 2024", checkOut: "24 Aug, 2024",guest:'4' , review: <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} /> },
//   //   { key: "2", name: 'Diana Prince', email: "diana@example.com", phone: '+8804444444', checkIn: "23 Aug, 2024", checkOut: "24 Aug, 2024",guest:'4' , review: <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} /> },
//   //   { key: "3", name: 'Diana Prince', email: "diana@example.com", phone: '+8804444444', checkIn: "23 Aug, 2024", checkOut: "24 Aug, 2024",guest:'4' , review: <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} /> },
//   //   { key: "4", name: 'Diana Prince', email: "diana@example.com", phone: '+8804444444', checkIn: "23 Aug, 2024", checkOut: "24 Aug, 2024",guest:'4' , review: <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} /> },
//   //   { key: "5", name: 'Diana Prince', email: "diana@example.com", phone: '+8804444444', checkIn: "23 Aug, 2024", checkOut: "24 Aug, 2024",guest:'4' , review: <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} /> },
//   //   { key: "6", name: 'Diana Prince', email: "diana@example.com", phone: '+8804444444', checkIn: "23 Aug, 2024", checkOut: "24 Aug, 2024",guest:'4' , review: <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} /> },
//   //   { key: "7", name: 'Diana Prince', email: "diana@example.com", phone: '+8804444444', checkIn: "23 Aug, 2024", checkOut: "24 Aug, 2024",guest:'4' , review: <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} /> },
//   //   { key: "8", name: 'Diana Prince', email: "diana@example.com", phone: '+8804444444', checkIn: "23 Aug, 2024", checkOut: "24 Aug, 2024",guest:'4' , review: <Rate style={{ color: "#EBCA7E" }} disabled defaultValue={5} /> },
//   // ];

//   const handleTabChange = (key) => {
//     setActiveTab(key);
//     setCurrentPage(1); // Reset to the first page when changing tabs
//   };

//   // Select data based on the active tab
//   const dataToDisplay = () => {
//     switch (activeTab) {
//       case "completed":
//         return completedData;
//       case "canceled":
//         return canceledData;
//       case "upcoming":
//         return upcomingData;
//       case "all":
//         return allData;
//       default:
//         return completedData;
//     }
//   };

//   const allColumns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text, record) => (
//         <div className="flex items-center space-x-2">
//           <Image src={imageone} alt="User" width={40} height={40} className="rounded-full" />
//           <div>
//             <span>{text}</span>
//             <div className="text-sm text-gray-400">{record.phone}</div>
//           </div>
//         </div>
//       ),
//     },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Check in", dataIndex: "checkIn", key: "checkIn" },
//     { title: "Check out", dataIndex: "checkOut", key: "checkOut" },
//     { title: "status", dataIndex: "status", key: "status" },
//   ];
  
//   const completedColumns = [
//     // Customize columns for completed reservations
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text, record) => (
//         <div className="flex items-center space-x-2">
//           <Image src={imageone} alt="User" width={40} height={40} className="rounded-full" />
//           <div>
//             <span>{text}</span>
//             <div className="text-sm text-gray-400">{record.phone}</div>
//           </div>
//         </div>
//       ),
//     },
//     { title: "email", dataIndex: "email", key: "email" },
//     { title: "Check in", dataIndex: "checkIn", key: "checkIn" },
//     { title: "Check out", dataIndex: "checkOut", key: "checkOut" },
//     { title: "review", dataIndex: "review", key: "review" },
//   ];
  
//   const canceledColumns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text, record) => (
//         <div className="flex items-center space-x-2">
//           <Image src={imageone} alt="User" width={40} height={40} className="rounded-full" />
//           <div>
//             <span>{text}</span>
//             <div className="text-sm text-gray-400">{record.phone}</div>
//           </div>
//         </div>
//       ),
//     },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Check in", dataIndex: "checkIn", key: "checkIn" },
//   ];
  
//   const upcomingColumns = [
//     // Customize columns for upcoming reservations
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text, record) => (
//         <div className="flex items-center space-x-2">
//           <Image src={imageone} alt="User" width={40} height={40} className="rounded-full" />
//           <div>
//             <span>{text}</span>
//             <div className="text-sm text-gray-400">{record.phone}</div>
//           </div>
//         </div>
//       ),
//     },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "guest", dataIndex: "guest", key: "guest" },
//     { title: "Check in", dataIndex: "checkIn", key: "checkIn" },
//     { title: "Check out", dataIndex: "checkOut", key: "checkOut" },
  
//   ];
  
//   const getColumnsByTab = (activeTab) => {
//     switch (activeTab) {
//       case "completed":
//         return completedColumns;
//       case "canceled":
//         return canceledColumns;
//       case "upcoming":
//         return upcomingColumns;
//       case "all":
//         return allColumns;
//       default:
//         return completedColumns;
//     }
//   };
//   const columns = getColumnsByTab(activeTab);
//   const paginatedData = dataToDisplay().slice((currentPage - 1) * pageSize, currentPage * pageSize);

//   return (
//     <div className="container mx-auto my-12">
//       <div className="flex items-center justify-between mb-2">
//         <h2 className="text-[28px] flex text-white space-x-2 items-center font-bold mb-6">
//           <button onClick={() => router.back()} className="focus:outline-none">
//             <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
//           </button>
//           All Reservation
//         </h2>
//         <DatePicker
//           onChange={(date) => setSelectedDate(date)}
//           format="DD MMM YYYY"
//           value={selectedDate}
//           style={{
//             border: '1px solid #EBCA7E',
//             backgroundColor: 'transparent',
//             color: 'white',
//             padding: '10px 20px',
//             borderRadius: '5px',
//             cursor: 'pointer',
//             fontSize: '16px',
//           }}
//         />
//       </div>

//       {/* Customized Tabs Component */}
    //   <Tabs
    //   activeKey={activeTab}
    //   onChange={handleTabChange}
    //   tabBarStyle={{

    //     border: 'none',         // Remove border
    //   }}
    //   tabBarGutter={20} // Space between tabs
    // >
     
    //   <Tabs.TabPane
    //     tab={<span style={{ color: activeTab === "completed" ? "#EBCA7E" : "#fff" }}>Completed</span>}
    //     key="completed"
    //   />
    //   <Tabs.TabPane
    //     tab={<span style={{ color: activeTab === "canceled" ? "#EBCA7E" : "#fff" }}>Canceled</span>}
    //     key="canceled"
    //   />
    //   <Tabs.TabPane
    //     tab={<span style={{ color: activeTab === "upcoming" ? "#EBCA7E" : "#fff" }}>Upcoming</span>}
    //     key="upcoming"
    //   />
    //   <Tabs.TabPane
    //     tab={<span style={{ color: activeTab === "all" ? "#EBCA7E" : "#fff" }}>all</span>}
    //     key="all"
    //   />
    // </Tabs>
    

//       <div className="overflow-x-auto">
//       <Table
//   columns={columns}
//   dataSource={paginatedData} // Make sure to filter your data accordingly
//   pagination={false}
//   className="custom-table2 text-red-500"
//   scroll={{ x: "max-content" }}
// />
//       </div>

//       {/* Pagination Component */}
//       <div className="flex justify-center items-center gap-4 mt-8 border-t-2 border-[#424242] p-6 w-full">
//         <div className="flex justify-between items-center gap-4 w-full">
//           <div className="text-center text-white mt-2">
//             Page {currentPage} of {Math.ceil(dataToDisplay().length / pageSize)}
//           </div>
//           <Pagination
//             current={currentPage}
//             total={dataToDisplay().length}
//             pageSize={pageSize}
//             onChange={(page) => setCurrentPage(page)}
//             showSizeChanger={false}
//             className="text-center"
//           />
//         </div>
//         <div className="flex justify-end items-center gap-4 w-full">
//           <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Previous</Button>
//           <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(dataToDisplay().length / pageSize)))}>Next</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;


'use client';
import { Button, Rate, Table, Pagination, DatePicker, Tabs } from "antd";
import { MdOutlineChevronLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import imageone from "/public/images/user.png";
import { useLogdinuserReservationQuery } from "@/redux/features/Propertyapi/page";

const Page = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [activeTab, setActiveTab] = useState("all");

  const { data, isLoading } = useLogdinuserReservationQuery();

  // Transform data into a compatible format for the table
  const transformData = (reservations) => {
    return reservations?.map((reservation) => ({
      key: reservation?._id, // Unique key for the table
      name: reservation?.user?.fullName || "Unknown", // Assuming your data has `guestName`
      email: reservation?.user?.email || "Not Provided",
      phone: reservation?.user?.phone || "N/A",
      checkIn: dayjs(reservation.checkInDate).format("DD MMM, YYYY"),
      checkOut: dayjs(reservation.checkOutDate).format("DD MMM, YYYY"),
      guest: reservation.guestCount || 1, // Default to 1 if not provided
      status: reservation.checkinCheckoutStatus,
    }));
  };

  const transformedData = transformData(data?.rooms || []);
console.log(data)
  // Filter data based on the tab
  const upcomingData = transformedData.filter(
    (reservation) =>
      reservation.status === "upcoming" &&
      dayjs(reservation.checkOut).isAfter(dayjs())
  );

  const completedData = transformedData.filter(
    (reservation) => reservation.status === "checkout"
  );

  const canceledData = transformedData.filter(
    (reservation) => reservation.status === "canceled"
  );

  const allData = transformedData;

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1); // Reset to the first page when changing tabs
  };

  const dataToDisplay = () => {
    switch (activeTab) {
      case "completed":
        return completedData;
      case "canceled":
        return canceledData;
      case "upcoming":
        return upcomingData;
      case "all":
        return allData;
      default:
        return [];
    }
  };

  const paginatedData = dataToDisplay().slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const allColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center space-x-2">
          <Image
            src={imageone}
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <span>{text}</span>
            <div className="text-sm text-gray-400">{record.phone}</div>
          </div>
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Check in", dataIndex: "checkIn", key: "checkIn" },
    { title: "Check out", dataIndex: "checkOut", key: "checkOut" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <div className="container mx-auto my-12">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[28px] flex text-white space-x-2 items-center font-bold mb-6">
          <button onClick={() => router.back()} className="focus:outline-none">
            <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
          </button>
          All Reservation
        </h2>
        {/* <DatePicker
          onChange={(date) => setSelectedDate(date)}
          format="DD MMM YYYY"
          value={selectedDate}
          style={{
            border: "1px solid #EBCA7E",
            backgroundColor: "transparent",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        /> */}
      </div>

           <Tabs
      activeKey={activeTab}
      onChange={handleTabChange}
      tabBarStyle={{

        border: 'none',         // Remove border
      }}
      tabBarGutter={20} // Space between tabs
    >
     
      <Tabs.TabPane
        tab={<span style={{ color: activeTab === "completed" ? "#EBCA7E" : "#fff" }}>Completed</span>}
        key="completed"
      />
      <Tabs.TabPane
        tab={<span style={{ color: activeTab === "canceled" ? "#EBCA7E" : "#fff" }}>Canceled</span>}
        key="canceled"
      />
      <Tabs.TabPane
        tab={<span style={{ color: activeTab === "upcoming" ? "#EBCA7E" : "#fff" }}>Upcoming</span>}
        key="upcoming"
      />
      <Tabs.TabPane
        tab={<span style={{ color: activeTab === "all" ? "#EBCA7E" : "#fff" }}>all</span>}
        key="all"
      />
    </Tabs>
      <Table
        columns={allColumns}
        dataSource={paginatedData}
        pagination={false}
        className="custom-table2 text-red-500"
        scroll={{ x: "max-content" }}
      />

      <div className="flex justify-center items-center gap-4 mt-8 border-t-2 border-[#424242] p-6 w-full">
        <Pagination
          current={currentPage}
          total={dataToDisplay().length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          className="text-center"
        />
      </div>
    </div>
  );
};

export default Page;
