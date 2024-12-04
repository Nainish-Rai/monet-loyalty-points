import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useConsumerLogin } from "@/hooks/apis/useConsumerLogin";

interface OtpVerificationFormProps {
  error?: string;
  onSuccess?: ({ otp }: { otp: any }) => void;
}

const OtpVerificationForm = ({
  error: propError,
  onSuccess,
}: OtpVerificationFormProps) => {
  const [otp, setOtp] = React.useState("");
  const { handleVerifyOtp, isVerifyingOtp, errorMessage, verifyOtpData } =
    useConsumerLogin();

  React.useEffect(() => {
    if (verifyOtpData && onSuccess) {
      onSuccess({ otp });
    }
  }, [verifyOtpData, onSuccess]);

  const handleSubmit = () => {
    if (otp.length === 6) {
      handleVerifyOtp(otp);
    }
  };

  return (
    <View className="space-y-4">
      <TextInput
        className="p-4 bg-neutral-900 border border-neutral-800 text-white rounded-lg"
        placeholder="Enter OTP"
        placeholderTextColor="#666"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        editable={!isVerifyingOtp}
      />
      {(errorMessage || propError) && (
        <Text className="text-red-500 text-sm">
          {errorMessage || propError}
        </Text>
      )}
      <TouchableOpacity
        className={`${
          otp.length === 6 ? "bg-yellow-400" : "bg-neutral-700"
        } p-4 rounded-lg`}
        onPress={handleSubmit}
        disabled={otp.length !== 6 || isVerifyingOtp}
      >
        {isVerifyingOtp ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text className="text-black text-center font-bold text-lg">
            Verify OTP
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerificationForm;
