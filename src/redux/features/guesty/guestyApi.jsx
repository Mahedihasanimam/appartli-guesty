// import { api } from "@/redux/api/ApiSlice";



// const clientId = '0oalr0l2cb8O3F5f85d7';
// const clientSecret = 'wFykt2TjFM795NSoZrCsMugufbhYq0DT62LnYdees8R0nP8_YTP3IQpMfxcZmOEg';



// // const clientId = '0oale3a4k6TiTPKZB5d7';
// // const clientSecret = 'edKGYEaKDh6viG0Z-TRKoQ6XH1A8J-9aYexH0_SDayZNeNKeVqalTmVPORbvKIR6';

// // Function to fetch the access token from Guesty API
// async function fetchAccessToken() {
//   try {
//     const response = await fetch('https://open-api.guesty.com/v1/oauth2/token', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         grant_type: 'client_credentials',
//         client_id: clientId,
//         client_secret: clientSecret,
//       }),
//     });

//     if (!response.ok) {
//       const errorDetails = await response.json();
//       console.error('Token Fetch Error:', errorDetails);
//       throw new Error(`Failed to fetch token: ${errorDetails.error_description || response.statusText}`);
//     }

//     const data = await response.json();

//     // Store the access token and expiry time in localStorage
//     localStorage.setItem('guesty_access_token', 'data.access_token');
//     localStorage.setItem('guesty_token_expiry', Date.now() + data.expires_in * 1000); // Store expiry time

//     return data.access_token;
//   } catch (error) {
//     console.error('Error fetching access token:', error.message);
//     throw error;
//   }
// }

// // Function to get a valid token: either from localStorage or by fetching a new one
// async function getValidToken() {
//   const token = localStorage.getItem('guesty_access_token');
//   const expiryTime = localStorage.getItem('guesty_token_expiry');

//   if (!token || (expiryTime && Date.now() > expiryTime)) {
//     // Fetch new token if no valid token exists or the token has expired
//     return await fetchAccessToken();
//   }

//   return token;
// }

//   export const guestyApi = api.injectEndpoints({
//     endpoints: (builder) => ({
//       // Endpoint to get Guesty properties
//       getGuestyProperties: builder.query({
//         queryFn: async () => {
//           try {
//             const token = 'eyJraWQiOiI3YWl0WTRwd0E3VGRtaUZhNnA1WTBUaTV0Qm5ES2hWWlpEaVBNdmNjaDVvIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkhKNDA3UHRvNlBKUFhyRjRhbVdnU3hOWTVlZ1JCQWNyLWtUVE9INmtidmsiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1c2Y2Y2ZjMmxTN3hCTGpKNWQ2IiwiYXVkIjoiaHR0cHM6Ly9ib29raW5nLmd1ZXN0eS5jb20iLCJpYXQiOjE3MzQ3NTUwNzksImV4cCI6MTczNDg0MTQ3OSwiY2lkIjoiMG9hbHB1MHYxaFU2bU9LRWg1ZDciLCJzY3AiOlsiYm9va2luZ19lbmdpbmU6YXBpIl0sInJlcXVlc3RlciI6IkJPT0tJTkciLCJzdWIiOiIwb2FscHUwdjFoVTZtT0tFaDVkNyIsImFjY291bnRJZCI6IjYxNjg1ZmFkYmRhZTAwMDAzODFjZmYwNyIsInVzZXJSb2xlcyI6W3sicm9sZUlkIjp7InBlcm1pc3Npb25zIjpbImxpc3Rpbmcudmlld2VyIl19fV0sImNsaWVudFR5cGUiOiJib29raW5nIiwiaWFtIjoidjMiLCJhcHBsaWNhdGlvbklkIjoiMG9hbHB1MHYxaFU2bU9LRWg1ZDcifQ.QaHHveQvCq7ISm-ABC_-bu_9MCmU_WR6gWVLehYxFLxbJIh-g_ZECbTKcP_wJPrzRaBXSTuDBixlhr3mCpEFOymYZs9eHMX8LM2xjnC2NsIEct8oKjo9-mK2oa3jgQbSjn54Vgh7zbFWweOEYFRuwGpcSP5OB42eLuwX5xrDrfhvjn1dEBKlNT0Rg-b0i7iHNk50ctTKAWA93rOkHTKJP-M-CNm9OzG6aJG5ipEVdKqulhLJtsYIv2utfs_ByAC_C3O0HD-HbNiSHPvX0bicLCqy70Aha2KZSlEYP7KxOyzbpAWXp68bfJZ6a1_bjXRo7U0lQXyAnbALPFU7AbC4Vg'; // Get a valid token
//             const response = await fetch('https://booking.guesty.com/api/listings', {
//               method: 'GET',
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/x-www-form-urlencoded',
//               },
//             });

//             if (!response.ok) {
//               return { error: { status: response.status, data: await response.text() } };
//             }

//             const data = await response.json();
//             return { data };
//           } catch (error) {
//             return { error: { status: 500, message: error.message } };
//           }
//         },
//         providesTags: ['Properties'],
//       }),



//       getGuestySingleProperty: builder.query({
//         queryFn: async (listingId) => {  // Accept listingId as a parameter
//           try {
//             const token = 'eyJraWQiOiI3YWl0WTRwd0E3VGRtaUZhNnA1WTBUaTV0Qm5ES2hWWlpEaVBNdmNjaDVvIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkhKNDA3UHRvNlBKUFhyRjRhbVdnU3hOWTVlZ1JCQWNyLWtUVE9INmtidmsiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1c2Y2Y2ZjMmxTN3hCTGpKNWQ2IiwiYXVkIjoiaHR0cHM6Ly9ib29raW5nLmd1ZXN0eS5jb20iLCJpYXQiOjE3MzQ3NTUwNzksImV4cCI6MTczNDg0MTQ3OSwiY2lkIjoiMG9hbHB1MHYxaFU2bU9LRWg1ZDciLCJzY3AiOlsiYm9va2luZ19lbmdpbmU6YXBpIl0sInJlcXVlc3RlciI6IkJPT0tJTkciLCJzdWIiOiIwb2FscHUwdjFoVTZtT0tFaDVkNyIsImFjY291bnRJZCI6IjYxNjg1ZmFkYmRhZTAwMDAzODFjZmYwNyIsInVzZXJSb2xlcyI6W3sicm9sZUlkIjp7InBlcm1pc3Npb25zIjpbImxpc3Rpbmcudmlld2VyIl19fV0sImNsaWVudFR5cGUiOiJib29raW5nIiwiaWFtIjoidjMiLCJhcHBsaWNhdGlvbklkIjoiMG9hbHB1MHYxaFU2bU9LRWg1ZDcifQ.QaHHveQvCq7ISm-ABC_-bu_9MCmU_WR6gWVLehYxFLxbJIh-g_ZECbTKcP_wJPrzRaBXSTuDBixlhr3mCpEFOymYZs9eHMX8LM2xjnC2NsIEct8oKjo9-mK2oa3jgQbSjn54Vgh7zbFWweOEYFRuwGpcSP5OB42eLuwX5xrDrfhvjn1dEBKlNT0Rg-b0i7iHNk50ctTKAWA93rOkHTKJP-M-CNm9OzG6aJG5ipEVdKqulhLJtsYIv2utfs_ByAC_C3O0HD-HbNiSHPvX0bicLCqy70Aha2KZSlEYP7KxOyzbpAWXp68bfJZ6a1_bjXRo7U0lQXyAnbALPFU7AbC4Vg'; 
//             const response = await fetch(`https://booking.guesty.com/api/listings/${listingId}`, {
//               method: 'GET',
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/x-www-form-urlencoded',
//               },
//             });

//             if (!response.ok) {
//               return { error: { status: response.status, data: await response.text() } };
//             }

//             const data = await response.json();
//             return { data };
//           } catch (error) {
//             return { error: { status: 500, message: error.message } };
//           }
//         },
//         providesTags: ['singlePropetys'],
//       }),


//       createGuestyReservation: builder.mutation({
//         queryFn: async (reservationData) => {
//           try {
//             const token = 'eyJraWQiOiI3YWl0WTRwd0E3VGRtaUZhNnA1WTBUaTV0Qm5ES2hWWlpEaVBNdmNjaDVvIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkhKNDA3UHRvNlBKUFhyRjRhbVdnU3hOWTVlZ1JCQWNyLWtUVE9INmtidmsiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1c2Y2Y2ZjMmxTN3hCTGpKNWQ2IiwiYXVkIjoiaHR0cHM6Ly9ib29raW5nLmd1ZXN0eS5jb20iLCJpYXQiOjE3MzQ3NTUwNzksImV4cCI6MTczNDg0MTQ3OSwiY2lkIjoiMG9hbHB1MHYxaFU2bU9LRWg1ZDciLCJzY3AiOlsiYm9va2luZ19lbmdpbmU6YXBpIl0sInJlcXVlc3RlciI6IkJPT0tJTkciLCJzdWIiOiIwb2FscHUwdjFoVTZtT0tFaDVkNyIsImFjY291bnRJZCI6IjYxNjg1ZmFkYmRhZTAwMDAzODFjZmYwNyIsInVzZXJSb2xlcyI6W3sicm9sZUlkIjp7InBlcm1pc3Npb25zIjpbImxpc3Rpbmcudmlld2VyIl19fV0sImNsaWVudFR5cGUiOiJib29raW5nIiwiaWFtIjoidjMiLCJhcHBsaWNhdGlvbklkIjoiMG9hbHB1MHYxaFU2bU9LRWg1ZDcifQ.QaHHveQvCq7ISm-ABC_-bu_9MCmU_WR6gWVLehYxFLxbJIh-g_ZECbTKcP_wJPrzRaBXSTuDBixlhr3mCpEFOymYZs9eHMX8LM2xjnC2NsIEct8oKjo9-mK2oa3jgQbSjn54Vgh7zbFWweOEYFRuwGpcSP5OB42eLuwX5xrDrfhvjn1dEBKlNT0Rg-b0i7iHNk50ctTKAWA93rOkHTKJP-M-CNm9OzG6aJG5ipEVdKqulhLJtsYIv2utfs_ByAC_C3O0HD-HbNiSHPvX0bicLCqy70Aha2KZSlEYP7KxOyzbpAWXp68bfJZ6a1_bjXRo7U0lQXyAnbALPFU7AbC4Vg'; 


//             // Log the reservation data for debugging
//             console.log('Reservation Data:', reservationData);

//             const response = await fetch('https://booking.guesty.com/api/reservations', {
//               method: 'POST',
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'Charset': 'utf-8',
//               },
//               body: JSON.stringify(reservationData),
//             });

//             // Log the response for debugging


//             if (!response.ok) {
//               const errorText = await response.text();
//               console.log('Error Response:', errorText);
//               return { error: { status: response.status, data: errorText } };
//             }

//             const data = await response.json();
//             console.log('Reservation Created:', data); // Log the success response
//             return { data };
//           } catch (error) {
//             console.log('Error:', error); // Log the error for debugging
//             return { error: { status: 500, message: error.message } };
//           }
//         },
//         invalidatesTags: ['reservation'],
//       }),





//     }),
//   });

// export const {
//   useGetGuestyPropertiesQuery,
//   useCreateGuestyReservationMutation,
//   useGetGuestySinglePropertyQuery
// } = guestyApi;
















import { api } from "@/redux/api/ApiSlice";

const clientId = '0oalyw4ccd4SmQhFV5d7';
const clientSecret = '5J0NS8Vd7L46wJEcFtb5Yl2HM78do4oPDyEjhEeLrOBiibZ8V-ZOdVvGVieYUAeH';

// Function to fetch the access token from Guesty API
async function fetchAccessToken() {
  try {
    const response = await fetch('https://open-api.guesty.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Token Fetch Error:', errorDetails);
      throw new Error(`Failed to fetch token: ${errorDetails.error_description || response.statusText}`);
    }

    const data = await response.json();

    // Store the access token and expiry time in localStorage
    if(typeof window !== 'undefined'){
      
      localStorage.setItem('guesty_access_token', data.access_token); // Corrected
      localStorage.setItem('guesty_token_expiry', Date.now() + data.expires_in * 1000); // Store expiry time
    }

    return data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.message);
    throw error;
  }
}

// Function to get a valid token: either from localStorage or by fetching a new one
async function getValidToken() {
  const token = localStorage.getItem('guesty_access_token');
  const expiryTime = localStorage.getItem('guesty_token_expiry');

  if (!token || (expiryTime && Date.now() > expiryTime)) {
    // Fetch new token if no valid token exists or the token has expired
    return await fetchAccessToken();
  }

  return token;
}

export const guestyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGuestyProperties: builder.query({
      queryFn: async () => {
        try {
          const token = 'eyJraWQiOiJHdlpFNmFDOGVETHJQTy1kOE9ZRV9SWFB5V1NpN0tKeWI3VjBycEhrTTdRIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULld6LWRVNjJpQkZBLWpSdm5LYlhUazdVeFlPQ0xIRHQ2TnFZb3FXWXgtZkkiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1czFwOHFyaDUzQ2NRVEk5NWQ3IiwiYXVkIjoiaHR0cHM6Ly9vcGVuLWFwaS5ndWVzdHkuY29tIiwiaWF0IjoxNzM2MDQ5MjczLCJleHAiOjE3MzYxMzU2NzMsImNpZCI6IjBvYWx5dzRjY2Q0U21RaEZWNWQ3Iiwic2NwIjpbIm9wZW4tYXBpIl0sInJlcXVlc3RlciI6IkVYVEVSTkFMIiwiYWNjb3VudElkIjoiNjE2ODVmYWRiZGFlMDAwMDM4MWNmZjA3Iiwic3ViIjoiMG9hbHl3NGNjZDRTbVFoRlY1ZDciLCJ1c2VyUm9sZXMiOlt7InJvbGVJZCI6eyJwZXJtaXNzaW9ucyI6WyJhZG1pbiJdfX1dLCJyb2xlIjoidXNlciIsImNsaWVudFR5cGUiOiJvcGVuYXBpIiwiaWFtIjoidjMiLCJhY2NvdW50TmFtZSI6IkFwcGFydEFsaSIsIm5hbWUiOiJvcGVuYXBpIn0.JLkhAjCmFQF-Fj8rcFtzKzyS9sxeEd99EgmGMruPWpEgN14XEX3DY1hBHp46CxYOANd7XR-UaLYoUbjsxhEUjeppbykJilwa8lb5n8BaBmhUWTKAu3oLs8rGk4SZDyNH79-Uq_Y_6scCn3HZ0DNgILMaP_CBbRqbYWSyzgJOxVs3KWeghJTQgOn0nkLbDPCxgEWXtlZ487sj1TV38QtW5sG8cNdvpsL6rjCzgszsOGnioE3Qvg2Gd_lczQkElwtM6X9wTGdWb_spxMSI-UomhNSdPO9NINgMPwxLWqWKTuwVJKAhDge98D_48I9Oj0oTa_7ipHScPoPLxlCgQ9My7Q'; // Get the valid token dynamically
          const response = await fetch('https://open-api.guesty.com/v1/listings', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

          if (!response.ok) {
            return { error: { status: response.status, data: await response.text() } };
          }

          const data = await response.json();
          return { data };
        } catch (error) {
          return { error: { status: 500, message: error.message } };
        }
      },
      providesTags: ['Properties'],
    }),

    getGuestySingleProperty: builder.query({
      queryFn: async (listingId) => {
        try {
          const token = 'eyJraWQiOiJHdlpFNmFDOGVETHJQTy1kOE9ZRV9SWFB5V1NpN0tKeWI3VjBycEhrTTdRIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULld6LWRVNjJpQkZBLWpSdm5LYlhUazdVeFlPQ0xIRHQ2TnFZb3FXWXgtZkkiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1czFwOHFyaDUzQ2NRVEk5NWQ3IiwiYXVkIjoiaHR0cHM6Ly9vcGVuLWFwaS5ndWVzdHkuY29tIiwiaWF0IjoxNzM2MDQ5MjczLCJleHAiOjE3MzYxMzU2NzMsImNpZCI6IjBvYWx5dzRjY2Q0U21RaEZWNWQ3Iiwic2NwIjpbIm9wZW4tYXBpIl0sInJlcXVlc3RlciI6IkVYVEVSTkFMIiwiYWNjb3VudElkIjoiNjE2ODVmYWRiZGFlMDAwMDM4MWNmZjA3Iiwic3ViIjoiMG9hbHl3NGNjZDRTbVFoRlY1ZDciLCJ1c2VyUm9sZXMiOlt7InJvbGVJZCI6eyJwZXJtaXNzaW9ucyI6WyJhZG1pbiJdfX1dLCJyb2xlIjoidXNlciIsImNsaWVudFR5cGUiOiJvcGVuYXBpIiwiaWFtIjoidjMiLCJhY2NvdW50TmFtZSI6IkFwcGFydEFsaSIsIm5hbWUiOiJvcGVuYXBpIn0.JLkhAjCmFQF-Fj8rcFtzKzyS9sxeEd99EgmGMruPWpEgN14XEX3DY1hBHp46CxYOANd7XR-UaLYoUbjsxhEUjeppbykJilwa8lb5n8BaBmhUWTKAu3oLs8rGk4SZDyNH79-Uq_Y_6scCn3HZ0DNgILMaP_CBbRqbYWSyzgJOxVs3KWeghJTQgOn0nkLbDPCxgEWXtlZ487sj1TV38QtW5sG8cNdvpsL6rjCzgszsOGnioE3Qvg2Gd_lczQkElwtM6X9wTGdWb_spxMSI-UomhNSdPO9NINgMPwxLWqWKTuwVJKAhDge98D_48I9Oj0oTa_7ipHScPoPLxlCgQ9My7Q';
          // Get the valid token dynamically
          const response = await fetch(`https://open-api.guesty.com/v1/listings/${listingId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

          if (!response.ok) {
            return { error: { status: response.status, data: await response.text() } };
          }

          const data = await response.json();
          return { data };
        } catch (error) {
          return { error: { status: 500, message: error.message } };
        }
      },
      providesTags: ['singleProperties'],
    }),

    createGuestyReservation: builder.mutation({
      queryFn: async (reservationData) => {
        try {
          const token = 'eyJraWQiOiJHdlpFNmFDOGVETHJQTy1kOE9ZRV9SWFB5V1NpN0tKeWI3VjBycEhrTTdRIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULld6LWRVNjJpQkZBLWpSdm5LYlhUazdVeFlPQ0xIRHQ2TnFZb3FXWXgtZkkiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1czFwOHFyaDUzQ2NRVEk5NWQ3IiwiYXVkIjoiaHR0cHM6Ly9vcGVuLWFwaS5ndWVzdHkuY29tIiwiaWF0IjoxNzM2MDQ5MjczLCJleHAiOjE3MzYxMzU2NzMsImNpZCI6IjBvYWx5dzRjY2Q0U21RaEZWNWQ3Iiwic2NwIjpbIm9wZW4tYXBpIl0sInJlcXVlc3RlciI6IkVYVEVSTkFMIiwiYWNjb3VudElkIjoiNjE2ODVmYWRiZGFlMDAwMDM4MWNmZjA3Iiwic3ViIjoiMG9hbHl3NGNjZDRTbVFoRlY1ZDciLCJ1c2VyUm9sZXMiOlt7InJvbGVJZCI6eyJwZXJtaXNzaW9ucyI6WyJhZG1pbiJdfX1dLCJyb2xlIjoidXNlciIsImNsaWVudFR5cGUiOiJvcGVuYXBpIiwiaWFtIjoidjMiLCJhY2NvdW50TmFtZSI6IkFwcGFydEFsaSIsIm5hbWUiOiJvcGVuYXBpIn0.JLkhAjCmFQF-Fj8rcFtzKzyS9sxeEd99EgmGMruPWpEgN14XEX3DY1hBHp46CxYOANd7XR-UaLYoUbjsxhEUjeppbykJilwa8lb5n8BaBmhUWTKAu3oLs8rGk4SZDyNH79-Uq_Y_6scCn3HZ0DNgILMaP_CBbRqbYWSyzgJOxVs3KWeghJTQgOn0nkLbDPCxgEWXtlZ487sj1TV38QtW5sG8cNdvpsL6rjCzgszsOGnioE3Qvg2Gd_lczQkElwtM6X9wTGdWb_spxMSI-UomhNSdPO9NINgMPwxLWqWKTuwVJKAhDge98D_48I9Oj0oTa_7ipHScPoPLxlCgQ9My7Q'; // Get the valid token dynamically
          const response = await fetch('https://open-api.guesty.com/v1/reservations', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
          });

          if (!response.ok) {
            return { error: { status: response.status, data: await response.text() } };
          }

          const data = await response.json();
          return { data };
        } catch (error) {
          return { error: { status: 500, message: error.message } };
        }
      },
      invalidatesTags: ['Properties'],
    }),



    getGuestyCalendar: builder.query({
      queryFn: async ({ listingId, startDate, endDate }) => {
        try {
          const token = 'eyJraWQiOiJHdlpFNmFDOGVETHJQTy1kOE9ZRV9SWFB5V1NpN0tKeWI3VjBycEhrTTdRIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULld6LWRVNjJpQkZBLWpSdm5LYlhUazdVeFlPQ0xIRHQ2TnFZb3FXWXgtZkkiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1czFwOHFyaDUzQ2NRVEk5NWQ3IiwiYXVkIjoiaHR0cHM6Ly9vcGVuLWFwaS5ndWVzdHkuY29tIiwiaWF0IjoxNzM2MDQ5MjczLCJleHAiOjE3MzYxMzU2NzMsImNpZCI6IjBvYWx5dzRjY2Q0U21RaEZWNWQ3Iiwic2NwIjpbIm9wZW4tYXBpIl0sInJlcXVlc3RlciI6IkVYVEVSTkFMIiwiYWNjb3VudElkIjoiNjE2ODVmYWRiZGFlMDAwMDM4MWNmZjA3Iiwic3ViIjoiMG9hbHl3NGNjZDRTbVFoRlY1ZDciLCJ1c2VyUm9sZXMiOlt7InJvbGVJZCI6eyJwZXJtaXNzaW9ucyI6WyJhZG1pbiJdfX1dLCJyb2xlIjoidXNlciIsImNsaWVudFR5cGUiOiJvcGVuYXBpIiwiaWFtIjoidjMiLCJhY2NvdW50TmFtZSI6IkFwcGFydEFsaSIsIm5hbWUiOiJvcGVuYXBpIn0.JLkhAjCmFQF-Fj8rcFtzKzyS9sxeEd99EgmGMruPWpEgN14XEX3DY1hBHp46CxYOANd7XR-UaLYoUbjsxhEUjeppbykJilwa8lb5n8BaBmhUWTKAu3oLs8rGk4SZDyNH79-Uq_Y_6scCn3HZ0DNgILMaP_CBbRqbYWSyzgJOxVs3KWeghJTQgOn0nkLbDPCxgEWXtlZ487sj1TV38QtW5sG8cNdvpsL6rjCzgszsOGnioE3Qvg2Gd_lczQkElwtM6X9wTGdWb_spxMSI-UomhNSdPO9NINgMPwxLWqWKTuwVJKAhDge98D_48I9Oj0oTa_7ipHScPoPLxlCgQ9My7Q';
          const response = await fetch(`https://open-api.guesty.com/v1/availability-pricing/api/calendar/listings/${listingId}?startDate=${startDate}&endDate=${endDate}`,
            {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            }
          );

          if (!response.ok) {
            return { error: { status: response.status, data: await response.text() } };
          }

          const data = await response.json();
          return { data };
        } catch (error) {
          return { error: { status: 500, message: error.message } };
        }
      },
      providesTags: ['Calendar'],
    }),



  }),
});

export const {
  useGetGuestyPropertiesQuery,
  useCreateGuestyReservationMutation,
  useGetGuestySinglePropertyQuery,
  useGetGuestyCalendarQuery
} = guestyApi;
