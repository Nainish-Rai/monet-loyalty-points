import axios from "axios";
import { useTokenStore } from "@/store/tokenStore";
import { Token } from "@/types/auth";

const BASE_URL = "https://stageapi.loyalty.rewards.monet.work/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useTokenStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized error occurred");
    }
    if (error.response) {
      // Server responded with error status
      const errorData = {
        status: error.response.status,
        data: error.response.data,
        message: error.response.data?.message || "An error occurred",
      };
      return Promise.reject(errorData);
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        message: "Network error occurred",
        status: 0,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
