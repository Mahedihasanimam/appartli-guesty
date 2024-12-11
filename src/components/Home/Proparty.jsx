'use client';
import { Button } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import ownerImage from "/public/images/user.png";
import propartyimage from "/public/images/proparty.png";
import PropartyCard from "../ui/PropartyCard";
import Image from "next/image";
import whatsapplogo from '/public/images/wlogo.gif'
import { useGetRoomsQuery } from "@/redux/features/Propertyapi/page";

const Proparty = ({title}) => {
  const router = useRouter();
  const { data, isError, isLoading, refetch } = useGetRoomsQuery({}, {
    refetchOnFocus: true
  });


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading rooms data</div>;
  }

  // console.log('_________________', data)

  // Extract properties from the data for easier handling
  const proparty = data?.properties || [];

  















  const whatsappNumber = '+8801860650703';
  const message = 'Hello, I would like to chat!';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="container mx-auto py-12">
      <div>
        <h1 className="xl:text-[36px] lg:text-[36px] font-black text-2xl text-white font-Merriweather text-center pb-12 leading-10 max-w-2xl mx-auto">
          {title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {proparty.slice(-8).map((item) => (
            <PropartyCard data={item} key={item.id} />
          ))}
        </div>
        <Button
          onClick={() => router.push('/proparty/addpropartytrailer')}
          style={{ backgroundColor: "#EBCA7E", color: 'black', height: "48px", width: '200px' }}
          className="mt-12 block mx-auto px-8 font-bold text-black bg-secoundary hover:bg-secoundary"
        >
          Add a property
        </Button>
      </div>
    
        <div
          onClick={() => {
            window.open(whatsappLink, '_blank');
          }}
          className="fixed bottom-[5%] right-[5%] rounded-full cursor-pointer h-[70px] w-[70px] shadow-lg shadow-black z-[9999]"
        >
         <Image src={whatsapplogo} alt="Whatsapp logo" width={70} height={70} />
        </div>
   
    </div>
  );
};

export default Proparty;
