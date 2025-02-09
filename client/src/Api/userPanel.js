import axios from "axios";
import { getToken, getRefreshToken, setAccessToken, logoutUser } from "./auth";

const userURL = "https://auto-mate-mern-app-glrn.vercel.app/user";
// const userURL = "http://localhost:5000/user";
const baseURl = "https://auto-mate-mern-app-glrn.vercel.app";
// const baseURl = "http://localhost:5000";

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  const _id = JSON.parse(localStorage.getItem("userData"))._id;

  try {
    const response = await axios.post(`${userURL}/refresh`, {
      refreshToken,
      _id,
    });
    const { accessToken } = response.data;
    setAccessToken(accessToken);
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    await logoutUser(); // If refresh fails, log out the user
  }
};

export const fetchAllPartsForUser = async (params) => {
  try {
    const token = getToken();

    const response = await axios.get(`${userURL}/parts`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      params,
    });

    return response.data;
  } catch (error) {
    // Handle unauthorized access or expired token
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const response = await axios.get(`${userURL}/parts`, {
          headers: {
            Authorization: "Bearer " + newToken,
          },
          params,
        });
        return response.data;
      }
    }

    console.error("Error fetching parts:", error);
    throw error;
  }
};

export const fetchProfileData = async () => {
  try {
    const accessToken = JSON.parse(
      localStorage.getItem("userData")
    ).accessToken;
    console.log("Fetching user profile with token:", accessToken); // Log the token

    const response = await axios.get(`${userURL}/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const response = await axios.get(`${userURL}/profile`, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        return response.data;
      }
    }
    console.error("Error fetching profile:", error);
  }
};

export const updateProfileData = async (userData) => {
  try {
    const accessToken = JSON.parse(
      localStorage.getItem("userData")
    ).accessToken;
    const response = await axios.put(`${userURL}/profile`, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const response = await axios.put(`${userURL}/profile`, userData, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        return response.data;
      }
    }
    console.error("Error updating profile:", error);
  }
};

export const fetchAllServices = async () => {
  try {
    const accessToken = JSON.parse(
      localStorage.getItem("userData")
    ).accessToken;
    const response = await axios.get(
      `${baseURl}/all-services`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const response = await axios.get(
          `${baseURl}/all-services`,

          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );
        return response.data;
      }
    }
    console.error("Error fetching all services:", error);
  }
};

export const makeServiceRequest = async (params) => {
  try {
    const accessToken = JSON.parse(
      localStorage.getItem("userData")
    ).accessToken;

    // Correct structure for the request
    const response = await axios.post(
      `${userURL}/make-service-request`,
      params, // Send params as the request body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const response = await axios.post(
          `${userURL}/make-service-request`,
          params, // Send params as the request body again
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );
        return response.data;
      }
    }
    console.error("Error booking services:", error);
    throw error; // Rethrow the error for further handling if needed
  }
};

//fetch order history
export const fetchOrderHistory = async (userId) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${baseURl}/order/history?userId=${userId}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const token = getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${baseURl}/order/history?userId=${userId}`,
          config
        );
        return response.data;
      }
    }
    console.error("Error fetching order history:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

//place order
export const placeOrder = async (
  partId,
  quantity,
  userId,
  paymentOption,
  note
) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${baseURl}/order/place-order`,
      {
        partId,
        quantity,
        userId,
        paymentOption,
        note,
      },
      config
    );

    if (response.data.url) {
      window.location.replace(response.data.url); // Redirect to the payment gateway URL
    }

    return response.data; // Return the response data for further use
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        };

        const response = await axios.post(
          `${baseURl}/order/place-order`,
          {
            partId,
            quantity,
            userId,
            paymentOption,
            note,
          },
          config
        );

        if (response.data.url) {
          // alert(`Order placed successfully.`);
          window.location.replace(response.data.url); // Redirect to the payment gateway URL
        }

        return response.data;
      }
    }
    console.error("Error placing order:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// get all service history
export const fetchServiceHistory = async (userId) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${userURL}/service-history/${userId}`,
      config
    );
    return response.data; // Return the response data
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshAccessToken(); // Refresh token and retry request
      if (newToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        };

        const response = await axios.get(
          `${userURL}/service-history/${userId}`,
          config
        );
        return response.data;
      }
    }
    console.error("Error fetching service history:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
