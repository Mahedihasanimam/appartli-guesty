import { api } from "@/redux/api/ApiSlice";
import Cookies from "js-cookie";

const clientId = "0oalyw4ccd4SmQhFV5d7";
const clientSecret = "5J0NS8Vd7L46wJEcFtb5Yl2HM78do4oPDyEjhEeLrOBiibZ8V-ZOdVvGVieYUAeH";

async function fetchAccessToken() {
  try {
    const response = await fetch("http://164.92.162.65:4000/users/auth/guesty-auth-token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      Cookies.set("guesty_access_token", data.access_token, { expires: data.expires_in / 86400 }); // Set expiry
      localStorage.setItem("guesty_token_expiry", Date.now() + data.expires_in * 1000);
    }
    return data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error.message);
    throw error;
  }
}

// **Function to Get a Valid Token**
async function getValidToken() {
  const token = Cookies.get("guesty_access_token");
  const expiry = localStorage.getItem("guesty_token_expiry");

  if (token && expiry && Date.now() < expiry) {
    return token;
  }

  return await fetchAccessToken();
}

// **Guesty API**
export const guestyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGuestyProperties: builder.query({
      queryFn: async () => {
        try {
          const token = await getValidToken(); // Get valid token
          const response = await fetch("https://open-api.guesty.com/v1/listings", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
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
      providesTags: ["Properties"],
    }),

    getGuestySingleProperty: builder.query({
      queryFn: async (listingId) => {
        try {
          const token = await getValidToken();
          const response = await fetch(`https://open-api.guesty.com/v1/listings/${listingId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
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
      providesTags: ["singleProperties"],
    }),

    createGuestyReservation: builder.mutation({
      queryFn: async (reservationData) => {
        try {
          const token = await getValidToken();
          const response = await fetch("https://open-api.guesty.com/v1/reservations", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
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
      invalidatesTags: ["Properties"],
    }),

    getGuestyCalendar: builder.query({
      queryFn: async ({ listingId, startDate, endDate }) => {
        try {
          const token = await getValidToken();
          const response = await fetch(
            `https://open-api.guesty.com/v1/availability-pricing/api/calendar/listings/${listingId}?startDate=${startDate}&endDate=${endDate}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
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
      providesTags: ["Calendar"],
    }),

    searchGuestyProperties: builder.query({
      queryFn: async ({ city, checkIn, checkOut, minOccupancy }) => {
        try {
          const token = await getValidToken();
          const params = new URLSearchParams();
          if (city) params.append("city", city);
          if (checkIn) params.append("checkIn", checkIn);
          if (checkOut) params.append("checkOut", checkOut);
          if (minOccupancy) params.append("minOccupancy", minOccupancy);

          const response = await fetch(`https://open-api.guesty.com/v1/listings?${params.toString()}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
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
    }),
  }),
});

export const {
  useGetGuestyPropertiesQuery,
  useCreateGuestyReservationMutation,
  useGetGuestySinglePropertyQuery,
  useGetGuestyCalendarQuery,
  useSearchGuestyPropertiesQuery,
} = guestyApi;
