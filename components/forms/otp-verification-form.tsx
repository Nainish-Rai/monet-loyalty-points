import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useConsumerLogin } from "@/hooks/apis/useConsumerLogin";
import { OtpInput } from "react-native-otp-entry";
import useLoginStore from "@/stores/useLoginStore";

interface Props {
  isLoading?: boolean;
  onSuccess: (values: any) => void;
  error?: string;
}

const OtpVerificationForm = ({
  onSuccess,
  isLoading = false,
  error,
}: Props) => {
  const [otp, setOtp] = React.useState("");

  function onSubmit(values: any) {
    onSuccess({ otp });
  }

  const { mobileNumber, countryCode } = useLoginStore();

  return (
    <View className="space-y-4">
      {/* <TextInput
        className="p-4 bg-neutral-900 border border-neutral-800 text-white rounded-lg"
        placeholder="Enter OTP"
        placeholderTextColor="#666"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        editable={!isVerifyingOtp}
      /> */}
      <OtpInput numberOfDigits={6} onTextChange={(text) => setOtp(text)} />

      <TouchableOpacity
        className={`${
          otp.length === 6 ? "bg-yellow-400" : "bg-neutral-700"
        } p-4 rounded-lg`}
        onPress={onSubmit}
        disabled={otp.length !== 6 || isLoading}
      >
        {isLoading ? (
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
