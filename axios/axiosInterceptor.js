import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

let accessToken = null;
let isRefreshing = false;
let refreshPromise = null;
//https://http://14.225.206.203:8080/api/Vnpay/CallbackWithUserInfo?email=tonynhatanh911@gmail.com

export const axiosClientVer2 = axios.create({
  baseURL: "https://loco.com.co/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Get access token from AsyncStorage
const getAccessToken = async () => {
  return await AsyncStorage.getItem("accessToken");
};

// Refresh Token Function
async function refreshToken() {
  try {
    const storedToken = await getAccessToken();
    const response = await axiosClientVer2.post("auth/refresh-token", {
      accessToken: storedToken,
    });

    const newAccessToken = response.data.accessToken;
    await AsyncStorage.setItem("accessToken", newAccessToken);
    accessToken = newAccessToken;

    isRefreshing = false;
    refreshPromise = null;
    return newAccessToken;
  } catch (error) {
    console.error("Refresh token failed", error);
    throw error;
  }
}

// Request Interceptor
axiosClientVer2.interceptors.request.use(
  async (config) => {
    accessToken = await getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClientVer2.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle different error statuses
    // if (error.response) {
    //   const status = error.response.status;

    //   if (status === 400) {
    //     Alert.alert("Error", error.response.data.message);
    //   }
    //   if (status === 409) {
    //     Alert.alert("Conflict", error.response.data.errorMessage);
    //   }
    //   if (status === 403) {
    //     Alert.alert(
    //       "Permission Denied",
    //       error.response.data.errorMessage ||
    //         "You do not have permission for this action."
    //     );
    //   }
    //   if (status === 404) {
    //     Alert.alert("Not Found", error.response.data);
    //   }
    //   if (status === 405) {
    //     Alert.alert("Method Not Allowed", error.response.data.errorMessage || "Error");
    //   }

    //   const refreshToken_current = await AsyncStorage.getItem("refreshToken");

    //   if (status === 401 && !originalRequest._retry && refreshToken_current) {
    //     console.log("Start Refresh Token");
    //     originalRequest._retry = true;

    //     if (!isRefreshing) {
    //       isRefreshing = true;
    //       try {
    //         const newToken = await refreshToken();
    //         originalRequest.headers.Authorization = `Bearer ${newToken}`;
    //         return axiosClientVer2(originalRequest);
    //       } catch (refreshError) {
    //         // Handle refresh token failure
    //         console.error("Refresh Token Failed", refreshError);
    //         Alert.alert("Session Expired", "Please log in again.");
    //         return Promise.reject(refreshError);
    //       }
    //     } else {
    //       // Wait for the ongoing refresh
    //       if (!refreshPromise) {
    //         refreshPromise = refreshToken();
    //       }
    //       return refreshPromise.then((newToken) => {
    //         originalRequest.headers.Authorization = `Bearer ${newToken}`;
    //         return axiosClientVer2(originalRequest);
    //       });
    //     }
    //   }
    // }
    return Promise.reject(error);
  }
);

// Handle Login (Save Access Token)
export const handleLogin = async (newToken) => {
  console.log(newToken)
  accessToken = newToken;
  axiosClientVer2.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${newToken}`;
  await AsyncStorage.setItem("accessToken", newToken.token);
  await AsyncStorage.setItem("user", JSON.stringify(newToken.user));
};

// Handle Logout (Clear Token)
export const handleLogout = async () => {
  await AsyncStorage.clear();
  accessToken = null;
  axiosClientVer2.defaults.headers.common["Authorization"] = undefined;
};
