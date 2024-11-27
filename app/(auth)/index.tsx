// src/screens/auth/LoginScreen.tsx
import React, { useState } from "react";
import { View } from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return <View className="flex-1 bg-white dark:bg-gray-900 p-4">hello</View>;
};

export default LoginScreen;
