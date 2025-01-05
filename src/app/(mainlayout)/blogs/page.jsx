
'use client'
import BlogCard from '@/components/ui/BlogCard';
import React from 'react';
import { useGetBlogsQuery } from '@/redux/features/Blogs/BlogApi';
const Blogs = () => {
const {isLoading,data,error}=useGetBlogsQuery()


if(isLoading){
    return <div>Loading...</div>
}
if(error){
    return <div>Error</div>
}

const blogsdata=data?.data
console.log(blogsdata)
 
      
    return (
        <div className='container mx-auto p-4'>
          <h1 className='text-[#FFFFFF] text-[48px] font-normal mb-10'>Here you see blogs part of  Apaartali service...</h1>
            <div className='  gap-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  my-12 '>
                {
                    blogsdata?.map(blog => <BlogCard key={blog.id} blog={blog} />)
                }
            </div>
        </div>
    );
};

export default Blogs;


