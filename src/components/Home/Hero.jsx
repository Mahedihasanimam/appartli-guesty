'use client'; // Ensure this component uses client-side rendering
import { Button, Card, DatePicker, Image, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Carousel } from 'antd';
import { useState } from "react";
import dayjs from 'dayjs';
import heroimg1 from "/public/images/heroimg.png";
import { useGetAllSearchPropertyQuery } from "@/redux/features/Propertyapi/page";
import Swal from "sweetalert2";
import PropartyCard from "../ui/PropartyCard";
import RoomsCard from "../ui/RoomsCard";


const Hero = ({title, description}) => {
  const [location, setLocation] = useState('');
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [maxGuests, setmaxGuests] = useState();
  const [isCheckInVisible, setIsCheckInVisible] = useState(false);
  const [isCheckOutVisible, setIsCheckOutVisible] = useState(false);
  const [searchParams, setSearchParams] = useState(null);
  const { data, error, isLoading } =useGetAllSearchPropertyQuery(searchParams, {
    skip: !searchParams, // Prevent API call until searchParams is set
  });

  const handleSearch = () => {
    if (!location && !maxGuests && !startDate && !endDate) {
      // Show an alert or error message if no fields are filled
     Swal.fire({
      title:'proprty not found',
      text:'Please fill at least one search field before searching.'
     })
      return;
    }
    setSearchParams({
      location: location || '', // Allow empty values
      maxGuests: maxGuests ? parseInt(maxGuests) : 0,
      startDate: startDate ? dayjs(startDate).format('YYYY-MM-DD') : '',
      endDate: endDate ? dayjs(endDate).format('YYYY-MM-DD') : '',
    });
    // console.log(' search',searchParams)
  };



 if(data?.properties?.length<=0){
  Swal.fire({
    title:'search not match',
    text:'No properties matched your search criteria. Please try again with different filters'
  })
 }


  return (
  <div>
      <div className="relative w-full min-h-[407px]  ">
      {/* Hero section with carousel background */}
      <Carousel autoplay className="container mx-auto  w-full h-full z-0">
        <div className="w-full">
          <Image src={heroimg1.src} alt="HeroImage1" className="w-full min-h-[600px]  h-full object-cover" />
        </div>
        <div>
          <Image src={heroimg1.src} alt="Hero Image 2" className="w-full min-h-[600px]  h-full object-cover" />
        </div>
        <div>
          <Image src={heroimg1.src} alt="Hero Image 3" className="w-full min-h-[600px]  h-full object-cover" />
        </div>
      </Carousel>

      {/* Content Layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center  z-20 px-4 sm:px-6 lg:px-0">
        <div className="max-w-4xl text-center">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl leading-tight font-bold">
           {title}
          </h1>
          <p className="text-white text-lg leading-tight mt-4">
            {description}
          </p>
        </div>

        {/* Search input */}
        <div className="lg:flex md:flex sm:flex hidden items-center bg-[#FFFFFF99] rounded-xl shadow-lg px-4 sm:px-6 lg:px-8 py-4 space-y-4 sm:space-y-0 sm:space-x-4 lg:max-w-4xl w-full mx-auto my-6 lg:mt-20 mt-8">
          <div className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out">
            <p className="text-[16px] text-[#000000] pl-2">Where</p>
            <Input
              placeholder="Add location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              bordered={false}
              className="text-sm text-gray-700"
            />
          </div>
          <div className="h-12 border-r border-gray-500"></div>
          <div
            className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out"
            onMouseEnter={() => setIsCheckInVisible(true)}
            onMouseLeave={() => setIsCheckInVisible(false)}
          >
            <p className="text-[16px] text-[#000000] pl-2">Check In</p>
            {isCheckInVisible ? (
              <DatePicker
                className="w-full"
                open={isCheckInVisible}
                onOpenChange={(open) => setIsCheckInVisible(open)}
                onChange={(date) => setstartDate(date)}
              />
            ) : (
              <Input
                placeholder="Add Dates"
                value={startDate ? dayjs(startDate).format('YYYY-MM-DD') : ''}
                bordered={false}
                className="text-sm text-gray-700"
                readOnly
              />
            )}
          </div>
          <div className="h-12 border-r border-gray-400"></div>
          <div
            className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out"
            onMouseEnter={() => setIsCheckOutVisible(true)}
            onMouseLeave={() => setIsCheckOutVisible(false)}
          >
            <p className="text-[16px] text-[#000000] pl-2">Check Out</p>
            {isCheckOutVisible ? (
              <DatePicker
                className="w-full"
                open={isCheckOutVisible}
                onOpenChange={(open) => setIsCheckOutVisible(open)}
                onChange={(date) => setendDate(date)}
              />
            ) : (
              <Input
                placeholder="Add Dates"
                value={endDate ? dayjs(endDate).format('YYYY-MM-DD') : ''}
                bordered={false}
                className="text-sm text-gray-700"
                readOnly
              />
            )}
          </div>
          <div className="h-12 border-r border-gray-400"></div>
          <div className="flex-1 hover:bg-white rounded-lg p-2 transition-all duration-300 ease-in-out">
            <p className="text-[16px] text-[#000000] pl-4">Who</p>
            <Input
            type="number"
              placeholder="Add Guest"
              value={maxGuests}
              onChange={(e) => setmaxGuests(e.target.value)}
              bordered={false}
              className="text-sm text-gray-700"
            />
          </div>
          <button
            className="bg-[#EBCA7E] h-[48px] w-[48px] rounded-[40px] text-white flex items-center justify-center"
            onClick={handleSearch}
          >
            <SearchOutlined className="text-lg text-black" />
          </button>
        </div>
      </div>

    </div>
      
        {data?.properties?.length > 0 && 
     <div className="container mx-auto  w-full h-full bg-black ">
     <div className="search-results    bg-black pb-12 rounded-lg p-6 w-full ">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}


          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {data?.properties?.map((item) => (
             <RoomsCard key={item?._id} data={item}/>
            ))}
          </div>
      </div>

     </div>
        }

  </div>
  );
};

export default Hero;
