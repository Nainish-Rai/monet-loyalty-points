import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OtpVerificationForm from "@/components/forms/otp-verification-form";
import { useColorScheme } from "react-native";
import { router } from "expo-router";
import { Heading } from "@/components/ui/heading";
import endpoints from "@/config/endpoints";

interface OtpResponse {
  requestId: string;
  message: string;
}

function OtpScreen() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();

  const handleLogin = async (data: { mobileNumber: string }) => {
    try {
      setIsLoading(true);
      setError(undefined);

      const response = await fetch(endpoints.auth.consumerLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          countryCode: "+91",
          mobileNumber: data.mobileNumber.replace(/[^0-9]/g, ""),
        }),
      });

      if (!response.ok) {
        setError("Failed to send OTP. Please try again." + response.statusText);
        throw new Error("Failed to send OTP");
      }

      const result: OtpResponse = await response.json();

      if (result.requestId) {
        router.push({
          pathname: "/otp",
          params: {
            requestId: result.requestId,
            phone: data.mobileNumber,
          },
        });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View className="min-h-screen bg-black flex  justify-center px-4">
        <View className="space-y-6  pt-12">
          <View className="space-y-2 mb-4">
            <Heading className="text-white text-3xl font-bold">
              Verify Otp
            </Heading>
            <Text className="text-neutral-400">
              Enter the OTP sent to your mobile number
            </Text>
          </View>

          <OtpVerificationForm
            error={error}
            onSuccess={(data) => {
              router.push("/convert");
            }}
          />

          <View className="mt-4">
            <Text className="text-neutral-500 text-center text-sm">
              By continuing, you agree to our{" "}
              <Text className="text-yellow-500">Terms of Service</Text> and{" "}
              <Text className="text-yellow-500">Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default OtpScreen;
