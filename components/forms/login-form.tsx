import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Input, InputField } from "@/components/ui/input";

interface LoginFormProps {
  isLoading?: boolean;
  error?: string;
  onSuccess: (data: { mobileNumber: string }) => void;
}

const LoginForm = ({ isLoading, error, onSuccess }: LoginFormProps) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  console.log(phoneNumber);
  const [regCode, setRegCode] = React.useState("");

  const handleSubmit = () => {
    if (phoneNumber) {
      onSuccess({ mobileNumber: phoneNumber });
    }
  };

  const isValidPhoneNumber = phoneNumber.length >= 10;

  return (
    <View className="flex  gap-4">
      <PhoneInput
        value={phoneNumber}
        layout="first"
        onChangeText={(set) => setPhoneNumber(set)}
        onChangeCountry={(country) => setRegCode(country.callingCode[0])}
        withDarkTheme
        withShadow={false}
        autoFocus={false}
        placeholder="Enter phone number"
        containerStyle={{
          backgroundColor: "#1f1f1f",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#333333",
          width: "100%",
        }}
        textContainerStyle={{ backgroundColor: "#2c2c2c" }}
        textInputStyle={{ color: "#ffffff" }}
        codeTextStyle={{ color: "#ffffff" }}
        textInputProps={{
          placeholderTextColor: "#666",
        }}
        countryPickerButtonStyle={{ backgroundColor: "#2c2c2c" }}
        disabled={isLoading}
      />
      {/* <Input>
        <InputField
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.nativeEvent.text)}
          placeholder="Enter phone number"
        />
      </Input> */}
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
