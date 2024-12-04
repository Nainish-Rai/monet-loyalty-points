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
        setErrorMessage(""); // Clear any previous errors
        setCurrentView("otp"); // Transition to OTP view after successful login
      },
      onError: (error) => {
        console.error("Login Error:", error);
        setErrorMessage(error?.data?.message || "An unexpected error occurred");
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
        console.log("OTP Verification Success:", data);
        setIsLoggedIn(true);
      },
      onError: (error) => {
        console.error("OTP Verification Error:", error);
        setErrorMessage("OTP verification failed");
      },
    }
  );

  const { setIsLoggedIn } = useTokenStore();

  const handleLogin = (mobileNumber: string) => {
    const countryCode = parsePhoneNumber(mobileNumber)?.countryCallingCode;
    const nationalNumber = parsePhoneNumber(mobileNumber)?.nationalNumber;
    const formattedCountryCode = `+${countryCode}`;

    setMobileNumber(String(nationalNumber));
    setCountryCode(formattedCountryCode);

    const loginPayload = {
      mobileNumber: String(nationalNumber),
      countryCode: formattedCountryCode,
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
