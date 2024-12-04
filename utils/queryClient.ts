"use client";

import { QueryClient } from "@tanstack/react-query";
import { authErrorEvent } from "./auth-error-event";
import { AxiosError } from "axios";
import httpStatusCodes from "@/config/http-status-codes";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetch on window focus (optional)
    },
  },
});

export default queryClient;
