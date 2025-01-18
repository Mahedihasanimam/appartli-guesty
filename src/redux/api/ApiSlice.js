import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://164.92.162.65:4000' ,
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      // console.log('Current state:', state); // Log entire state for debugging
      const token = localStorage.getItem('token'); // This should reflect the correct path
      // console.log('Current token:', token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
}),
tagTypes: [
  'user',
  'Properties',
  'bookingList',
  'reservation',
  "FAQ"
],
  endpoints: () => ({}),
});


export const imageUrl = "http://139.59.58.153:4000/"