import { setUser } from "./userSlice";

const { api } = require("@/redux/api/ApiSlice");

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/users/auth/signup",
        method: "POST",
        body: user,
      }),
      invalidatesTags:['user']
    }),
    registerOwner: builder.mutation({
      query: (user) => ({
        url: "/users/auth/signup-as-owner",
        method: "POST",
        body: user,
      }),
      invalidatesTags:['user']
    }),
    BecomeAnInvestor: builder.mutation({
      query: (user) => ({
        url: "/users/auth/become-an-investor",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/auth/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ['user'],
    }),
    loginOwner: builder.mutation({
      query: (user) => ({
        url: "/users/auth/login-as-owner",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ['user'],
    }),

    socialLogin: builder.mutation({
      query: (user) => ({
        url: "/users/auth/login-social",
        method: "POST",
        body: user,
      }),
      invalidatesTags:['user']
    }),

    verifyEmail: builder.mutation({
      query: (email) => ({
        url: "/users/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    OtpVerify: builder.mutation({
      query: (otp) => ({
        url: "/users/auth/verify-email",
        method: "POST",
        body: otp,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/users/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    getLoginUserById: builder.query({
      query: (id) => `/users/get-one-user/${id}`,
      providesTags: ['user'],
    }),

    getProfile: builder.query({
      query: (token) => ({
        url: '/users/profile',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled; // Wait for the query to fulfill
          dispatch(setUser(data)); // Dispatch the setUser action
        } catch (error) {
          console.error("Error fetching profile:", error); // Handle any errors
        }
      },
      providesTags: ['user'],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update-profile-by-user",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['user'], // Invalidate user to refetch
    }),

    getNotifiByUserId: builder.query({
      query: (id) => `/users/notifications-by-user/${id}`,
      providesTags:['notifications']
    }),


    readNotificationById: builder.mutation({
      query: (id) =>({
        url:  `/users/notification-read/${id}`,
        method: "PATCH",
      }),

      invalidatesTags:['notifications']
    }),


    contactUs: builder.mutation({
      query: (data) => ({
        url: "/help/send-mail-to-support",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useRegisterOwnerMutation,
  useBecomeAnInvestorMutation,
  useLoginUserMutation,
  useSocialLoginMutation,
  useLoginOwnerMutation,
  useVerifyEmailMutation,
  useOtpVerifyMutation,
  useResetPasswordMutation,
  useGetLoginUserByIdQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
  useGetNotifiByUserIdQuery,
  useReadNotificationByIdMutation,
  useContactUsMutation,
  useGetProfileQuery
} = userApi;
