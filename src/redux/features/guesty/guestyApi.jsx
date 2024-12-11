import { api } from "@/redux/api/ApiSlice";



const clientId = '0oalr0l2cb8O3F5f85d7';
const clientSecret = 'wFykt2TjFM795NSoZrCsMugufbhYq0DT62LnYdees8R0nP8_YTP3IQpMfxcZmOEg';



// const clientId = '0oale3a4k6TiTPKZB5d7';
// const clientSecret = 'edKGYEaKDh6viG0Z-TRKoQ6XH1A8J-9aYexH0_SDayZNeNKeVqalTmVPORbvKIR6';

// Function to fetch the access token from Guesty API
async function fetchAccessToken() {
  try {
    const response = await fetch('https://booking.guesty.com/oauth2/token', {
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
    localStorage.setItem('guesty_access_token', 'data.access_token');
    localStorage.setItem('guesty_token_expiry', Date.now() + data.expires_in * 1000); // Store expiry time

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
      // Endpoint to get Guesty properties
      getGuestyProperties: builder.query({
        queryFn: async () => {
          try {
            const token = 'eyJraWQiOiI2bkN1aXV0WnI1NmRwTGZ3aldIODUwZWdGNC1SN0pNQ09OeTlNcE13OWZzIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjFOZjNFVlF6T0MwdGZNM0tmb1E3WTR3dlJTOE52X2pFdjBTOVdSa240WVkiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1c2Y2Y2ZjMmxTN3hCTGpKNWQ2IiwiYXVkIjoiaHR0cHM6Ly9ib29raW5nLmd1ZXN0eS5jb20iLCJpYXQiOjE3MzM4MTg5MDIsImV4cCI6MTczMzkwNTMwMiwiY2lkIjoiMG9hbGUzYTRrNlRpVFBLWkI1ZDciLCJzY3AiOlsiYm9va2luZ19lbmdpbmU6YXBpIl0sInJlcXVlc3RlciI6IkJPT0tJTkciLCJzdWIiOiIwb2FsZTNhNGs2VGlUUEtaQjVkNyIsImFjY291bnRJZCI6IjYxNjg1ZmFkYmRhZTAwMDAzODFjZmYwNyIsInVzZXJSb2xlcyI6W3sicm9sZUlkIjp7InBlcm1pc3Npb25zIjpbImxpc3Rpbmcudmlld2VyIl19fV0sImNsaWVudFR5cGUiOiJib29raW5nIiwiaWFtIjoidjMiLCJhcHBsaWNhdGlvbklkIjoiMG9hbGUzYTRrNlRpVFBLWkI1ZDcifQ.nF0TviRyxp23UDLvrZDhl6SAAoreeYPWMsW6d4ftQgzI9NYPRmA5e4K4tk2wF3-dtAFByt2f61mgop4lOaD40iKyLdDt-VlaVCq2JNbSTgTF6-u-FGuLdh285e16D-q168B9Gcm0HnOONYC0am_h7LA61nRS5wz8-frza5JYiWXsBWbA6vYjceOzcAuoV5sFM3ORxHIvhcV0wK9NO4G8tATlEs9PqxLtzuC0MOtWO9Z9vZKZMjUGVYHytqN6f2sJbFR_OuYGLHka8YYsqmlkOJ1BonIkAd7axDYrkpx1dUeNI8RUc_6GoLC70aOcmAqG7CvExYIL6ghCCP_Yuu1dUA'; // Get a valid token
            const response = await fetch('https://booking.guesty.com/api/listings', {
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
        queryFn: async (listingId) => {  // Accept listingId as a parameter
          try {
            const token = 'eyJraWQiOiI2bkN1aXV0WnI1NmRwTGZ3aldIODUwZWdGNC1SN0pNQ09OeTlNcE13OWZzIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjFOZjNFVlF6T0MwdGZNM0tmb1E3WTR3dlJTOE52X2pFdjBTOVdSa240WVkiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1c2Y2Y2ZjMmxTN3hCTGpKNWQ2IiwiYXVkIjoiaHR0cHM6Ly9ib29raW5nLmd1ZXN0eS5jb20iLCJpYXQiOjE3MzM4MTg5MDIsImV4cCI6MTczMzkwNTMwMiwiY2lkIjoiMG9hbGUzYTRrNlRpVFBLWkI1ZDciLCJzY3AiOlsiYm9va2luZ19lbmdpbmU6YXBpIl0sInJlcXVlc3RlciI6IkJPT0tJTkciLCJzdWIiOiIwb2FsZTNhNGs2VGlUUEtaQjVkNyIsImFjY291bnRJZCI6IjYxNjg1ZmFkYmRhZTAwMDAzODFjZmYwNyIsInVzZXJSb2xlcyI6W3sicm9sZUlkIjp7InBlcm1pc3Npb25zIjpbImxpc3Rpbmcudmlld2VyIl19fV0sImNsaWVudFR5cGUiOiJib29raW5nIiwiaWFtIjoidjMiLCJhcHBsaWNhdGlvbklkIjoiMG9hbGUzYTRrNlRpVFBLWkI1ZDcifQ.nF0TviRyxp23UDLvrZDhl6SAAoreeYPWMsW6d4ftQgzI9NYPRmA5e4K4tk2wF3-dtAFByt2f61mgop4lOaD40iKyLdDt-VlaVCq2JNbSTgTF6-u-FGuLdh285e16D-q168B9Gcm0HnOONYC0am_h7LA61nRS5wz8-frza5JYiWXsBWbA6vYjceOzcAuoV5sFM3ORxHIvhcV0wK9NO4G8tATlEs9PqxLtzuC0MOtWO9Z9vZKZMjUGVYHytqN6f2sJbFR_OuYGLHka8YYsqmlkOJ1BonIkAd7axDYrkpx1dUeNI8RUc_6GoLC70aOcmAqG7CvExYIL6ghCCP_Yuu1dUA'; 
            const response = await fetch(`https://booking.guesty.com/api/listings/${listingId}`, {
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
        providesTags: ['singlePropetys'],
      }),
      

      createGuestyReservation: builder.mutation({
        queryFn: async (reservationData) => {
          try {
            const token = 'eyJraWQiOiI2bkN1aXV0WnI1NmRwTGZ3aldIODUwZWdGNC1SN0pNQ09OeTlNcE13OWZzIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjFOZjNFVlF6T0MwdGZNM0tmb1E3WTR3dlJTOE52X2pFdjBTOVdSa240WVkiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1c2Y2Y2ZjMmxTN3hCTGpKNWQ2IiwiYXVkIjoiaHR0cHM6Ly9ib29raW5nLmd1ZXN0eS5jb20iLCJpYXQiOjE3MzM4MTg5MDIsImV4cCI6MTczMzkwNTMwMiwiY2lkIjoiMG9hbGUzYTRrNlRpVFBLWkI1ZDciLCJzY3AiOlsiYm9va2luZ19lbmdpbmU6YXBpIl0sInJlcXVlc3RlciI6IkJPT0tJTkciLCJzdWIiOiIwb2FsZTNhNGs2VGlUUEtaQjVkNyIsImFjY291bnRJZCI6IjYxNjg1ZmFkYmRhZTAwMDAzODFjZmYwNyIsInVzZXJSb2xlcyI6W3sicm9sZUlkIjp7InBlcm1pc3Npb25zIjpbImxpc3Rpbmcudmlld2VyIl19fV0sImNsaWVudFR5cGUiOiJib29raW5nIiwiaWFtIjoidjMiLCJhcHBsaWNhdGlvbklkIjoiMG9hbGUzYTRrNlRpVFBLWkI1ZDcifQ.nF0TviRyxp23UDLvrZDhl6SAAoreeYPWMsW6d4ftQgzI9NYPRmA5e4K4tk2wF3-dtAFByt2f61mgop4lOaD40iKyLdDt-VlaVCq2JNbSTgTF6-u-FGuLdh285e16D-q168B9Gcm0HnOONYC0am_h7LA61nRS5wz8-frza5JYiWXsBWbA6vYjceOzcAuoV5sFM3ORxHIvhcV0wK9NO4G8tATlEs9PqxLtzuC0MOtWO9Z9vZKZMjUGVYHytqN6f2sJbFR_OuYGLHka8YYsqmlkOJ1BonIkAd7axDYrkpx1dUeNI8RUc_6GoLC70aOcmAqG7CvExYIL6ghCCP_Yuu1dUA'; 

  
            // Log the reservation data for debugging
            console.log('Reservation Data:', reservationData);
  
            const response = await fetch('https://booking.guesty.com/api/reservations', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Charset': 'utf-8',
              },
              body: JSON.stringify(reservationData),
            });
  
            // Log the response for debugging
           
  
            if (!response.ok) {
              const errorText = await response.text();
              console.log('Error Response:', errorText);
              return { error: { status: response.status, data: errorText } };
            }
  
            const data = await response.json();
            console.log('Reservation Created:', data); // Log the success response
            return { data };
          } catch (error) {
            console.log('Error:', error); // Log the error for debugging
            return { error: { status: 500, message: error.message } };
          }
        },
        invalidatesTags: ['reservation'],
      }),





    }),
  });

export const {
  useGetGuestyPropertiesQuery,
  useCreateGuestyReservationMutation,
  useGetGuestySinglePropertyQuery
} = guestyApi;
