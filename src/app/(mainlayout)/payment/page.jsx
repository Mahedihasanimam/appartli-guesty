'use client';
import React from 'react';
import { Input, Button, Card, DatePicker, Select } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import Link from 'next/link';
import crmimg from '/public/images/crm.png'
import Image from 'next/image';
import { MdOutlineChevronLeft } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const { RangePicker } = DatePicker;

const Payment = () => {
    const router = useRouter();
    
    const handlepay = () => {
        console.log("payment");

        Swal.fire({
            title: 'Payment Successful!',
            text: 'Your payment has been processed successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#EBCA7E',
        });
        router.push('/');
    }

    return (
        <div className="min-h-screen text-[#FFFFFFCC] flex justify-center items-center p-6">
            <div className="w-full max-w-6xl space-y-6">
                <h2 className="text-xl flex space-x-2 items-center font-semibold mb-4">
                    {/* Back Button */}
                    <button onClick={() => router.back()} className="focus:outline-none">
                        <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
                    </button>
                    Confirm & Pay
                </h2>
                
                {/* Payment Details */}
                <div className="lg:flex md:flex flex-row justify-between gap-6">
                    <div className="flex-1">
                        <div className="mb-4 space-y-4">
                            <div className="flex items-center justify-between space-x-2">
                                <span className="text-xl font-medium">Pay with</span>
                                <Image src={crmimg} width={40} height={40} alt='crm'/>
                            </div>
                            <div className="space-y-4">
                                <Input prefix={<CreditCardOutlined className="text-[#FFFFFFCC] pr-2 text-lg" />} size="large" placeholder="Card number" className="bg-[#242424] hover:bg-[#242424] border-none text-[#FFFFFFCC] opacity-70 text-[16px]" />
                                <div className="flex gap-2">
                                    <Input size="large" placeholder="Expiration" className="bg-[#242424] hover:bg-[#242424] border-none text-[#FFFFFFCC] opacity-70 text-[16px]" />
                                    <Input size="large" placeholder="CVV" className="bg-[#242424] hover:bg-[#242424] border-none text-[#FFFFFFCC] opacity-70 text-[16px]" />
                                </div>
                            </div>
                        </div>
                        <p className="text-[#FFFFFF] text-[16px] font-medium mt-8 opacity-70">
                            By selecting the button below, I agree to the Host&apos;s House Rules, Appartali&apos;s Rebooking and Refund Policy, and that Appartali can charge my payment method if I&apos;m responsible for damage.
                        </p>
                        {/* Confirm Button */}
                        <Button onClick={handlepay} style={{ backgroundColor: '#EBCA7E', color: 'black' }} type="primary" size="large" className="bg-yellow-500 text-black font-bold w-fit mx-auto px-8 mt-12 block">
                            Confirm & Pay
                        </Button>
                    </div>

                    {/* Summary calculation */}
                    <div className="w-80 p-4 py-8 lg:mt-0 md:mt-0 mt-12 lg:w-auto md:w-auto bg-[#1B1B1B] h-fit rounded-lg space-y-4">
                        <div className="text-[24px] text-[#FFFFFF] font-bold">$560.00 <span className="text-sm">Per night</span></div>
                        <div>
                            <RangePicker className="w-full bg-[#4B4B4B] hover:bg-[#4B4B4B] h-[44px] border-none text-[#FFFFFFCC] opacity-70 text-[16px]" />
                        </div>
                        <div className=''>
                            <Select defaultValue="2" className="custom-select w-full h-[44px]">
                                <Select.Option value="1">1 Guest</Select.Option>
                                <Select.Option value="2">2 Guests</Select.Option>
                            </Select>
                        </div>
                        <div className="space-y-3 pt-8 text-[#FFFFFFCC]">
                            <div className="flex justify-between">
                                <span>$80*5 nights</span> <span>$400</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Cleaning fee</span> <span>$80</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Appartali service fee</span> <span>$80</span>
                            </div>
                            <div className="border-t border-gray-600 my-2"></div>
                            <div className="flex justify-between font-semibold text-[#FFFFFFCC]">
                                <span>Total before taxes</span> <span>$560.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
