import { useApi } from "@/hooks/apis/useApi";
import endpoints from "@/config/endpoints";
import {
  ConsumerLoginRequest,
  ConsumerLoginResponse,
  ConsumerLoginVerifyOtpRequest,
  ConsumerLoginVerifyOtpResponse,
} from "@/types/auth";
import { parsePhoneNumber } from "react-phone-number-input";
import useLoginStore from "@/stores/useLoginStore";
import { useTokenStore } from "@/store/tokenStore";

export const useConsumerLogin = () => {
  const { usePost } = useApi();
  const {
    currentView,
    setCurrentView,
    requestId,
    errorMessage,
    countryCode,
    setRequestId,
    setErrorMessage,
    setMobileNumber,
    setCountryCode,
    mobileNumber,
  } = useLoginStore();

  const {
    mutate: processConsumerLogin,
    isPending: isLoggingIn,
    error: loginError,
    data: loginData,
  } = usePost<ConsumerLoginResponse, ConsumerLoginRequest>(
    endpoints.auth.consumerLogin,
    {
      onSuccess: (data) => {
        console.log("Login Success:", data);
        setRequestId(data.requestId);
        setErrorMessage("");
        setCurrentView("otp");
      },
      onError: (error: any) => {
        console.error("Login Error:", error);
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "An unexpected error occurred";
        setErrorMessage(errorMessage);
      },
    }
  );

  // OTP Verification API call
  const {
    mutate: processConsumerLoginVerifyOtp,
    isPending: isVerifyingOtp,
    error: verifyOtpError,
    data: verifyOtpData,
  } = usePost<ConsumerLoginVerifyOtpResponse, ConsumerLoginVerifyOtpRequest>(
    endpoints.auth.consumerLoginVerifyOtp,
    {
      onSuccess: (data) => {
        if (!data) {
          setErrorMessage("Invalid OTP verification response");
          return;
        }
        console.log("OTP Verification Success:", data);
        setIsLoggedIn(true);
        setErrorMessage("");
      },
      onError: (error: any) => {
        console.error("OTP Verification Error:", error);
        const errorMessage =
          error?.data?.message || error?.message || "OTP verification failed";
        setErrorMessage(errorMessage);
      },
    }
  );

  const { setIsLoggedIn } = useTokenStore();

  const handleLogin = (countryCode: string, nationalNumber: string) => {
    setMobileNumber(String(nationalNumber));
    setCountryCode(countryCode);

    const loginPayload = {
      mobileNumber: String(nationalNumber),
      countryCode: countryCode,
    };
    processConsumerLogin(loginPayload);
  };
  const handleVerifyOtp = (otp: string) => {
    processConsumerLoginVerifyOtp({
      countryCode,
      mobileNumber,
      otp,
      requestId,
    });
  };

  return {
    currentView,
    isLoggingIn,
    errorMessage,
    isVerifyingOtp,
    verifyOtpError,
    handleLogin,
    handleVerifyOtp,
    setCurrentView,
    verifyOtpData,
    loginData,
  };
};
