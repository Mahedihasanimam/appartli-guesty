const { api } = require("@/redux/api/ApiSlice");

const BlogApi=api.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs:builder.query({
      query: () => ({
        url: "/blog/get-all-blogs",
      }),
    providesTags:["allbologs"]
    }),
    GetBlogById:builder.query({
      query: (id) => ({
        url: `/blog/get-one-blog/${id}`,
      }),
    providesTags:["allbologs"]
    }),



  
    


  }),
});

export const {useGetBlogsQuery,useGetBlogByIdQuery} = BlogApi;