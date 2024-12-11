'use client'
import React from "react";
import home from "/public/icons/home.png";
import stand from "/public/icons/stand.png";
import car from "/public/icons/car.png";
import Image from "next/image";
import { Button } from "antd";
import { MdOutlineChevronLeft } from "react-icons/md";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  
  return (
    <div className="container mx-auto text-white">
      <h2 className="text-[28px] flex space-x-2 items-center font-bold mt-12 text-white">
        <button onClick={() => router.back()} className="focus:outline-none">
          <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
        </button>
        Back
      </h2>
      <div>
        <div className="lg:flex flex-row text-center lg:space-x-0 space-y-8 p-6 items-center justify-around">
          <div>
            <h1 className="text-2xl font-semibold ">
              it&apos;s easy to get <br /> started an Appartli!
            </h1>
          </div>
          <div className="space-y-[96px]">
            <div className="lg:flex flex-row lg:space-y-0 space-y-4 items-center justify-between">
              <div className="lg:flex flex-row space-x-8 ">
                <span className="text-2xl">1 </span>
                <div>
                  <h1 className="text-2xl font-medium text-white">
                    Tell us about your place{" "}
                  </h1>
                  <p className="text-lg text-[#FFFFFFCC] font-light max-w-xs">
                    Share some basic info. like where it is and how many guests can stay.
                  </p>
                </div>
              </div>
              <div>
                <Image className="mx-auto" src={home} alt="home icon" />
              </div>
            </div>

            <div className="lg:flex flex-row lg:space-y-0 space-y-4 items-center justify-between">
              <div className="lg:flex flex-row space-x-8">
                <span className="text-2xl">2</span>
                <div>
                  <h1 className="text-2xl font-medium text-white">
                    Make it stand out
                  </h1>
                  <p className="text-lg text-[#FFFFFFCC] font-light max-w-xs">
                    Add 5 or more photos plus a title and description—we’ll help you out.
                  </p>
                </div>
              </div>
              <div>
                <Image className="mx-auto" src={stand} alt="stand icon" />
              </div>
            </div>

            <div className="lg:flex flex-row lg:space-y-0 space-y-4 items-center justify-between">
              <div className="lg:flex flex-row space-x-8">
                <span className="text-2xl">3</span>
                <div>
                  <h1 className="text-2xl font-medium text-white">
                    Finish up & publish
                  </h1>
                  <p className="text-lg text-[#FFFFFFCC] font-light max-w-xs">
                    Choose a starting price, verify a few details, then publish your listing.
                  </p>
                </div>
              </div>
              <div>
                <Image className="mx-auto" src={car} alt="car icon" />
              </div>
            </div>
            <div>
              <Button 
                onClick={() => router.push('/proparty/addpropartyform')} 
                style={{backgroundColor: "#EBCA7E", color: 'black', height: "48px", width: '200px'}}  
                className="mt-12 block float-end px-8 font-bold text-black">
                Get started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
