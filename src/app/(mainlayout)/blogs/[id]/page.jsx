'use client'
import Image from 'next/image';
import React from 'react';
import blog from '/public/images/blogdetails.png'
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useGetBlogByIdQuery } from '@/redux/features/Blogs/BlogApi';
import { imageUrl } from '@/redux/api/ApiSlice';

const BlogDetails = ({params}) => {
    console.log(params?.id)
    const router =useRouter()

    const {isLoading,isError,data}=useGetBlogByIdQuery(params?.id)
    if(isLoading){
        return <div>Loading....</div>
    }
    if(isError){
        return <div>something went wrong</div>
    }
const {title,description,image}=data?.data
    return (
        <div className='container mx-auto'>
        <div className='bg-[#242424] p-4 w-full rounded-lg shadow-lg my-8 '>
           <div className='flex items-center space-x-2 py-6'>
            <LeftOutlined onClick={router.back} className='text-white text-xl'/>
           <h3 className='text-[#FFFFFF] text-[22px] font-bold '>{title}</h3>
           </div>
            <Image width={400} height={600} className='w-full h-[444px] object-cover' src={imageUrl+image} alt='blog-1'  />
            <p className='text-lg text-[#FFFFFF] font-normal pt-4 pb-8'>{description}</p>
           
            
       
        </div>
    </div>
    );
};

export default BlogDetails;