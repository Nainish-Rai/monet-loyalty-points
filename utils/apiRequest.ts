import axios, { AxiosError, Method } from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { authErrorEvent } from "@/utils/auth-error-event";

interface ApiError {
  status: number;
  message: string;
  data?: any;
}

const apiRequest = async <T>(
  method: Method,
  url: string,
  data?: any
): Promise<T> => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    let apiError: ApiError = {
      status: 500,
      message: "An unexpected error occurred",
    };

    if (axios.isAxiosError(error) && error.response) {
      apiError = {
        status: error.response.status,
        message: error.response.statusText,
        data: error.response.data,
      };
    }

    authErrorEvent.emit("authError", apiError);

    return Promise.reject(apiError);
  }
};

export default apiRequest;
