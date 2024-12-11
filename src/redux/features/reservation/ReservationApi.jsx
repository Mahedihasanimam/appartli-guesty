const { api } = require("@/redux/api/ApiSlice");

const ReservationApi=api.injectEndpoints({
  endpoints: (builder) => ({
    MakeAreservation: builder.mutation({
      query: (data) => ({
        url: "/reservation/reserve-property",
        method: "POST",
        body: data,
        
      }),
      invalidatesTags:['bookingList']
      



    }),

    getReservationByUser:builder.query({
    
        query: () => ({
          url: `/reservation/get-reservation-by-user`,
          method:'GET'
        }),
        providesTags:['bookingList']
      
    }),
    changeReservationRole: builder.mutation({
      query: (data) => ({
        url: "/reservation/toggle-status",
        method: "POST",
        body: data,
        
      }),
      invalidatesTags:['reservation']
      



    }),
  
    


  }),
});

export const {useMakeAreservationMutation,useChangeReservationRoleMutation} = ReservationApi;