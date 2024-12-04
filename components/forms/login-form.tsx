import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import PhoneInput from "react-native-phone-number-input";

interface LoginFormProps {
  isLoading?: boolean;
  error?: string;
  onSuccess: (data: { mobileNumber: string }) => void;
}

const LoginForm = ({ isLoading, error, onSuccess }: LoginFormProps) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [regCode, setRegCode] = React.useState("");

  const handleSubmit = () => {
    if (phoneNumber) {
      onSuccess({ mobileNumber: phoneNumber });
    }
  };

  const isValidPhoneNumber = phoneNumber.length >= 10;

  return (
    <View className="space-y-4">
      <PhoneInput
        defaultValue={phoneNumber}
        defaultCode="IN"
        onChangeFormattedText={setPhoneNumber}
        onChangeCountry={(country) => setRegCode(country.callingCode[0])}
        containerStyle={{
          backgroundColor: "#111111",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#333333",
        }}
        textContainerStyle={{ backgroundColor: "#111111" }}
        textInputStyle={{ color: "#ffffff" }}
        codeTextStyle={{ color: "#ffffff" }}
        countryPickerButtonStyle={{ backgroundColor: "#111111" }}
        disabled={isLoading}
      />
      {error && <Text className="text-red-500 text-sm">{error}</Text>}
      <TouchableOpacity
        className={`${
          isValidPhoneNumber ? "bg-yellow-500" : "bg-neutral-800"
        } p-4 rounded-lg transition-colors`}
        onPress={handleSubmit}
        disabled={!isValidPhoneNumber || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={isValidPhoneNumber ? "#000" : "#666"} />
        ) : (
          <Text
            className={`text-center font-bold text-lg ${
              isValidPhoneNumber ? "text-black" : "text-neutral-500"
            }`}
          >
            Send OTP
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
