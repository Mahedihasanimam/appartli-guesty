"use client";
import React from "react";
import logo from "/public/images/footerlogo.svg";

import fb from "/public/icons/fb.svg";
import google from "/public/icons/google.svg";
import youtube from "/public/icons/youtube.svg";


import Image from "next/image";
import {
  PhoneOutlined,
  MailFilled,
} from "@ant-design/icons";
import Link from "next/link"
import GoogleTranslate from "../GoogleTranslate";

const Footer = () => {

  return (
    <div>
      <footer className=" px-4 divide-y bg-[#FDFAF2] text-[#000000CC] relative z-50">
        <div className=" container mx-auto">
          <div className=" flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
            {/* left side menu  */}
            <div className="lg:w-1/3  text-sm font-normal space-y-4">
              <div
                rel="noopener noreferrer"
                href="#"
                className="flex justify-start  pl-2 lg:justify-start pb-4"
              >
                <Image src={logo} alt="Pantagonostis" />
              </div>
              <div className="max-w-[120px] text-[16px] pl-2 ">
                <h4 className="">
                  Street name, Area address <br /> goes here
                </h4>
              </div>
              <div className="text-[#000000CC] text-[16px] font-normal space-y-2 pt-2">
                <div>
                  <PhoneOutlined className="rotate-90 text-[16px] text-[#000000] pr-2" />
                  <span className="text-[#000000CC]">+(00)-000-000-0000</span>
                </div>
                <div className="pl-2">
                  <MailFilled className=" text-[16px] text-[#000000] pr-2" />
                  <span className="text-[#000000CC] ">infoname@mail.com</span>
                </div>
              </div>

              {/* <Button
                className=" hover:text-white bg-[#000000] hover:bg-[#000000] border-[1px]  border-[#E4E7EC] text-[16px] font-semibold p-6"
                size="large"
                type="primary"
              >
                English <GlobalOutlined />
              </Button> */}
            </div>
            {/* right side menu items  */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  text-sm gap-x-3 gap-y-8 lg:w-2/3 w-full">
              {/* MENU ITEM ONE  */}
              <div className="space-y-3 text-start">
                <h3 className="   font-bold text-[16px] pb-3 font-Merriweather">
                  Programs
                </h3>
                <div className="   gap-6">
                  <ul className="space-y-[12px] text-[#000000CC] font-medium text-sm">
                    <li>
                      <Link rel="noopener noreferrer" href="/browsemore">
                        Book your  Home
                      </Link>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="/browsemore">
                        Estimate  your  Property
                      </Link>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="/auth/GuestLogin">
                        Guest  Login
                      </Link>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="/auth/OwnarLogin">
                        Owner  Login
                      </Link>
                    </li>

                  </ul>

                </div>
              </div>
              {/* MENU ITEM TWO  */}
              <div className="space-y-3 pl-12">
                <h3 className="   font-bold text-[16px] pb-3 font-Merriweather">
                  Help & Support
                </h3>
                <ul className="space-y-[12px] text-[#000000CC] text-sm">
                  <li>
                    <Link rel="noopener noreferrer" href="/FAQ">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link rel="noopener noreferrer" href="/contactus">
                      Contact Us
                    </Link>
                  </li>

                  <li>
                    <Link rel="noopener noreferrer" href="/TermsAndConditions ">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link rel="noopener noreferrer" href="/RoomBookingHelp">
                      Room booking help
                    </Link>
                  </li>
                </ul>
              </div>
              {/* SOCIAL MEDIA MENU ITEM   */}
              <div className="space-y-3">
                <h3 className="   font-bold text-[16px] pb-3 font-Merriweather">
                  Social Media
                </h3>
                <div className="flex space-x-6">
                  <Link href="https://facebook.com" target="_blank" >

                    <Image height={24} width={24} src={fb} alt="facebook" />

                  </Link>
                  <Link href={'https://google.com'} target="_blank"><Image height={24} width={24} src={google} alt="google" /></Link>
                  <Link href={'https://youtube.com'} target="_blank">
                    <Image height={24} width={24} src={youtube} alt="youtube" />
                  </Link>

                </div>
                <GoogleTranslate />
              </div>
            </div>
          </div>
          {/* copyright  */}
          <div className="flex justify-center  border-t-2 border-[#475467] py-4">
            <p className="text-sm text-[#000000CC]">
              © appartali  2024 | All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
