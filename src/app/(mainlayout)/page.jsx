'use client'

import GoogleTranslate from '@/components/GoogleTranslate';
import Hero from '@/components/Home/Hero';
import Proparty from '@/components/Home/Proparty';
import Rooms from '@/components/Home/Rooms';
import { useGetHomeContentQuery } from '@/redux/features/EditContent/editContentApi';
import React from 'react';

const Page = () => {
 
  const {isLoading,isError,data}=useGetHomeContentQuery()
  if(isLoading){
      return (
          <div
              className="flex justify-center items-center h-screen"
              style={{ backgroundColor: "#f9f9f9" }}
          >
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
      );  
  
  

}
if(isError){
    return <div className='text-white'>something went wrong</div>
}

console.log(data)
 const {heroDescription,heroTitle,propertyTitle,roomsTitle}=data?.data
    return (
        <div>
          <Hero title={heroTitle} description={heroDescription} />
          <Rooms title={roomsTitle} />
       
          <Proparty title={propertyTitle} />
        </div>
    );
};

export default Page;