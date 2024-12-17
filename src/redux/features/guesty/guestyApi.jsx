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
            const token = 'eyJraWQiOiI3YWl0WTRwd0E3VGRtaUZhNnA1WTBUaTV0Qm5ES2hWWlpEaVBNdmNjaDVvIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlJnN2R5VFNZYXZpRUhDNTJTc2taSy1iVHBLMExwZ1hyX3JpOGlDTTlFLWciLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1c2Y2Y2ZjMmxTN3hCTGpKNWQ2IiwiYXVkIjoiaHR0cHM6Ly9ib29raW5nLmd1ZXN0eS5jb20iLCJpYXQiOjE3MzQ0MzA5MzEsImV4cCI6MTczNDUxNzMzMSwiY2lkIjoiMG9hbHB1MHYxaFU2bU9LRWg1ZDciLCJzY3AiOlsiYm9va2luZ19lbmdpbmU6YXBpIl0sInJlcXVlc3RlciI6IkJPT0tJTkciLCJzdWIiOiIwb2FscHUwdjFoVTZtT0tFaDVkNyIsImFjY291bnRJZCI6IjYxNjg1ZmFkYmRhZTAwMDAzODFjZmYwNyIsInVzZXJSb2xlcyI6W3sicm9sZUlkIjp7InBlcm1pc3Npb25zIjpbImxpc3Rpbmcudmlld2VyIl19fV0sImNsaWVudFR5cGUiOiJib29raW5nIiwiaWFtIjoidjMiLCJhcHBsaWNhdGlvbklkIjoiMG9hbHB1MHYxaFU2bU9LRWg1ZDcifQ.Oa5ZpZE9q5loZkWs4B7iR4B3zl2Jp9cGfzcoeTvN65VOXHL5oHvn66fFXw3OqAIVGoNovmHSXiMEniPlbqqIDEHnZHQiQh2JElsVEPjx0X11IcB_5W-KX8sL1Dv4Ii04vkX-iaM5WntsA7h4mSzcdJ6CsoZE9-mHEUcUh9qiGF6yJTNbuVLqlbC-9JDymby9HgHPtPKgP0dZ26i4RHoti4z8t-DXr9yupPVTUdWt0X8bOhohIA8tJrjbugRABCvK60tTI1uF0upWRUc9Qnc2FvJSi6IwnnN1oLj1JKgdDX3vqoxqFMhcCSmvu3DM4ihtD4S56ndT6EnDcLBbU_csLA'; // Get a valid token
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
            const token = 'eyJraWQiOiI3YWl0WTRwd0E3VGRtaUZhNnA1WTBUaTV0Qm5ES2hWWlpEaVBNdmNjaDVvIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlJnN2R5VFNZYXZpRUhDNTJTc2taSy1iVHBLMExwZ1hyX3JpOGlDTTlFLWciLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1c2Y2Y2ZjMmxTN3hCTGpKNWQ2IiwiYXVkIjoiaHR0cHM6Ly9ib29raW5nLmd1ZXN0eS5jb20iLCJpYXQiOjE3MzQ0MzA5MzEsImV4cCI6MTczNDUxNzMzMSwiY2lkIjoiMG9hbHB1MHYxaFU2bU9LRWg1ZDciLCJzY3AiOlsiYm9va2luZ19lbmdpbmU6YXBpIl0sInJlcXVlc3RlciI6IkJPT0tJTkciLCJzdWIiOiIwb2FscHUwdjFoVTZtT0tFaDVkNyIsImFjY291bnRJZCI6IjYxNjg1ZmFkYmRhZTAwMDAzODFjZmYwNyIsInVzZXJSb2xlcyI6W3sicm9sZUlkIjp7InBlcm1pc3Npb25zIjpbImxpc3Rpbmcudmlld2VyIl19fV0sImNsaWVudFR5cGUiOiJib29raW5nIiwiaWFtIjoidjMiLCJhcHBsaWNhdGlvbklkIjoiMG9hbHB1MHYxaFU2bU9LRWg1ZDcifQ.Oa5ZpZE9q5loZkWs4B7iR4B3zl2Jp9cGfzcoeTvN65VOXHL5oHvn66fFXw3OqAIVGoNovmHSXiMEniPlbqqIDEHnZHQiQh2JElsVEPjx0X11IcB_5W-KX8sL1Dv4Ii04vkX-iaM5WntsA7h4mSzcdJ6CsoZE9-mHEUcUh9qiGF6yJTNbuVLqlbC-9JDymby9HgHPtPKgP0dZ26i4RHoti4z8t-DXr9yupPVTUdWt0X8bOhohIA8tJrjbugRABCvK60tTI1uF0upWRUc9Qnc2FvJSi6IwnnN1oLj1JKgdDX3vqoxqFMhcCSmvu3DM4ihtD4S56ndT6EnDcLBbU_csLA'; 
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
            const token = 'eyJraWQiOiI3YWl0WTRwd0E3VGRtaUZhNnA1WTBUaTV0Qm5ES2hWWlpEaVBNdmNjaDVvIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlJnN2R5VFNZYXZpRUhDNTJTc2taSy1iVHBLMExwZ1hyX3JpOGlDTTlFLWciLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1c2Y2Y2ZjMmxTN3hCTGpKNWQ2IiwiYXVkIjoiaHR0cHM6Ly9ib29raW5nLmd1ZXN0eS5jb20iLCJpYXQiOjE3MzQ0MzA5MzEsImV4cCI6MTczNDUxNzMzMSwiY2lkIjoiMG9hbHB1MHYxaFU2bU9LRWg1ZDciLCJzY3AiOlsiYm9va2luZ19lbmdpbmU6YXBpIl0sInJlcXVlc3RlciI6IkJPT0tJTkciLCJzdWIiOiIwb2FscHUwdjFoVTZtT0tFaDVkNyIsImFjY291bnRJZCI6IjYxNjg1ZmFkYmRhZTAwMDAzODFjZmYwNyIsInVzZXJSb2xlcyI6W3sicm9sZUlkIjp7InBlcm1pc3Npb25zIjpbImxpc3Rpbmcudmlld2VyIl19fV0sImNsaWVudFR5cGUiOiJib29raW5nIiwiaWFtIjoidjMiLCJhcHBsaWNhdGlvbklkIjoiMG9hbHB1MHYxaFU2bU9LRWg1ZDcifQ.Oa5ZpZE9q5loZkWs4B7iR4B3zl2Jp9cGfzcoeTvN65VOXHL5oHvn66fFXw3OqAIVGoNovmHSXiMEniPlbqqIDEHnZHQiQh2JElsVEPjx0X11IcB_5W-KX8sL1Dv4Ii04vkX-iaM5WntsA7h4mSzcdJ6CsoZE9-mHEUcUh9qiGF6yJTNbuVLqlbC-9JDymby9HgHPtPKgP0dZ26i4RHoti4z8t-DXr9yupPVTUdWt0X8bOhohIA8tJrjbugRABCvK60tTI1uF0upWRUc9Qnc2FvJSi6IwnnN1oLj1JKgdDX3vqoxqFMhcCSmvu3DM4ihtD4S56ndT6EnDcLBbU_csLA'; 

  
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
