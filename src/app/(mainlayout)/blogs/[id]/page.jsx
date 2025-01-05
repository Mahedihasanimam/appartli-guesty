'use client';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import { useGetBlogByIdQuery } from '@/redux/features/Blogs/BlogApi';
import { imageUrl } from '@/redux/api/ApiSlice';

const Page = async() => {
    const router = useRouter();
    const params = useParams();
 
    const { isLoading, isError, data } = useGetBlogByIdQuery(params?.id);
  console.log(data);
    return (
        <div className='container mx-auto'>
            <div className='bg-[#242424] p-4 w-full rounded-lg shadow-lg my-8 '>
                <div className='flex items-center space-x-2 py-6'>
                    <LeftOutlined onClick={() => router?.back()} className='text-white text-xl' />
                    <h3 className='text-[#FFFFFF] text-[22px] font-bold '>
                        {data?.data?.title || "Blog Title"}
                    </h3>
                </div>
                <Image
                    width={600}
                    height={400}
                    className='w-full h-[444px] object-cover'
                    src={imageUrl + data?.data?.image || "/fallback-image.png"}
                    alt='blog-1'
                />
                <p className='text-lg text-[#FFFFFF] font-normal pt-4 pb-8'>
                    {data?.data?.description || "Blog Description"}
                </p>
            </div>
        </div>
    );
};


const BlogsDetilas = () => {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Page />
        </Suspense>
    );
};

export default BlogsDetilas;
