import { useReactQueryDevTools } from "@dev-plugins/react-query";
import {
  QueryClient,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import apiRequest from "@/utils/apiRequest";
import { ApiError } from "@/types/api";
import NetInfo from "@react-native-community/netinfo";
import { Platform } from "react-native";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: Platform.OS === "ios" ? 3 : 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export const useApi = () => {
  // Helper function to check network connectivity
  const checkConnection = async () => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      throw new Error("No internet connection");
    }
  };

  // GET Request Hook with network check
  const useGet = <T>(
    queryKey: QueryKey,
    url: string,
    options?: UseQueryOptions<T, ApiError<unknown>, T, QueryKey>
  ) =>
    useQuery<T, ApiError<unknown>, T, QueryKey>({
      queryKey,
      queryFn: async () => {
        await checkConnection();
        return apiRequest<T>("GET", url);
      },
      ...options,
    });

  // POST Request Hook with network check
  const usePost = <TResponse, TPayload = unknown>(
    url: string,
    options?: UseMutationOptions<TResponse, ApiError<TResponse>, TPayload>
  ) => {
    return useMutation<TResponse, ApiError<TResponse>, TPayload>({
      mutationFn: async (data: TPayload) => {
        await checkConnection();
        return apiRequest<TResponse>("POST", url, data);
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ refetchType: "all" });
        options?.onSuccess?.(data, variables, context);
      },
      retry: Platform.OS === "ios" ? 2 : 1,
      ...options,
    });
  };

  // PUT Request Hook with network check
  const usePut = <TResponse, TPayload = unknown>(
    url: string,
    options?: UseMutationOptions<TResponse, ApiError<TResponse>, TPayload>
  ) =>
    useMutation<TResponse, ApiError<TResponse>, TPayload>({
      mutationFn: async (data: TPayload) => {
        await checkConnection();
        return apiRequest<TResponse>("PUT", url, data);
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ refetchType: "all" });
        options?.onSuccess?.(data, variables, context);
      },
      retry: Platform.OS === "ios" ? 2 : 1,
      ...options,
    });

  // DELETE Request Hook with network check
  const useDelete = <TResponse, TPayload = void>(
    url: string,
    options?: UseMutationOptions<TResponse, ApiError<TResponse>, TPayload>
  ) =>
    useMutation<TResponse, ApiError<TResponse>, TPayload>({
      mutationFn: async (data?: TPayload) => {
        await checkConnection();
        return apiRequest<TResponse>("DELETE", url, data);
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ refetchType: "all" });
        options?.onSuccess?.(data, variables, context);
      },
      retry: Platform.OS === "ios" ? 2 : 1,
      ...options,
    });

  return { useGet, usePost, usePut, useDelete };
};
