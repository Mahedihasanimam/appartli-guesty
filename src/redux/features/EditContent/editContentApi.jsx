const { api } = require("@/redux/api/ApiSlice");

const editContentApi=api.injectEndpoints({
  endpoints: (builder) => ({




    GetHomeContent:builder.query({
      query: () => ({
        url: "/content/get-home-content",
      }),
    providesTags:["homeContent"]
    }),
    GetAboutContent:builder.query({
      query: () => ({
        url: "/content/get-about-content",
      }),
    providesTags:["aboutcontent"]
    }),




    getTermsAndService:builder.query({
      query: () => ({
        url: "/terms-of-service/get-terms-of-service",
      }),
    providesTags:["terms&conditions"]
    }),

    getAllFAQ:builder.query({
      query: () => ({
        url: "/faq/get-all-faqs",
      }),
    providesTags:["FAQ"]
    }),
    roomBookingHelp:builder.query({
      query: () => ({
        url: "/help/get-all-helps",
      }),
    providesTags:["roomBooking"]
    }),




  
    


  }),
});

export const {useGetAboutContentQuery,useGetHomeContentQuery,useGetTermsAndServiceQuery,useGetAllFAQQuery,useRoomBookingHelpQuery} = editContentApi;