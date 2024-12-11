import Image from 'next/image';
import React from 'react';

import { Button } from 'antd';
import Link from 'next/link';
import { imageUrl } from '@/redux/api/ApiSlice';
const BlogCard = ({blog}) => {
 console.log(blog?.image);
 
    return (
        <div>
            <div className='bg-[#242424] p-4 w-full rounded-lg shadow-lg '>
                <h3 className='text-[#FFFFFF] text-[22px] font-bold pb-4'>  {blog.title}</h3>
                <Image className='max-h-[400px] min-h-[400px]' height={400} width={600} src={imageUrl+blog?.image} alt='blog-1'  />
                <p className='text-lg text-[#FFFFFF] font-normal pt-4 pb-8'>{blog.description}</p>
              <Link href={`/blogs/${blog._id}`}>
                <Button
              style={{backgroundColor: "#EBCA7E",width: "240px",height: "44px", color: "#000000"}}
                type="primary"
                className=" border-none text-black font-bold block mx-auto"
              >
               Read more
              </Button>
              </Link>
            </div>
        </div>
    );
};

export default BlogCard;