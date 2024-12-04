import React, { useEffect } from "react";
import { View } from "react-native";
import { useConsumerLogin } from "@/hooks/apis/useConsumerLogin";
import { BrandLogo } from "@/components/BrandLogo";
import LoginForm from "@/components/forms/login-form";
import OtpVerificationForm from "@/components/forms/otp-verification-form";
import { MotiView } from "moti";
import { useTokenStore } from "@/store/tokenStore";
import { router } from "expo-router";

const LoginScreen = () => {
  const { setAccessToken, setRefreshToken, setConsumerId } = useTokenStore();
  const {
    currentView,
    isLoggingIn,
    errorMessage,
    isVerifyingOtp,
    handleLogin,
    handleVerifyOtp,
    loginData,
    verifyOtpData,
  } = useConsumerLogin();

  useEffect(() => {
    if (verifyOtpData) {
      const { id, tokens } = verifyOtpData;
      const { access, refresh } = tokens;
      setAccessToken(access);
      setRefreshToken(refresh);
      setConsumerId(id);
      router.replace("/(tabs)");
    }
  }, [verifyOtpData]);

  return (
    <View className="flex-1 h-screen flex items-center bg-black dark:bg-black p-4">
      <View className="flex-1 flex flex-col gap-4 justify-center">
        <BrandLogo />

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 300 }}
        >
          {currentView === "login" ? (
            <LoginForm
              isLoading={isLoggingIn}
              error={errorMessage}
              onSuccess={({ mobileNumber }) => handleLogin(mobileNumber)}
            />
          ) : (
            // <OtpVerificationForm
            //   isLoading={isVerifyingOtp}
            //   error={errorMessage}
            //   onSuccess={({ otp }) => handleVerifyOtp({ otp })}
            // />
            <></>
          )}
        </MotiView>
      </View>
    </View>
  );
};

export default LoginScreen;
