// src/screens/auth/LoginScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { BrandLogo } from "@/components/BrandLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const { signIn } = useAuth();

  useEffect(() => {
    loadRememberMe();
  }, []);

  const loadRememberMe = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem("rememberedEmail");
      const savedRememberMe = await AsyncStorage.getItem("rememberMe");
      if (savedEmail && savedRememberMe === "true") {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch (error) {
      console.log("Error loading remembered email:", error);
    }
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (rememberMe) {
        await AsyncStorage.setItem("rememberedEmail", email);
        await AsyncStorage.setItem("rememberMe", "true");
      } else {
        await AsyncStorage.removeItem("rememberedEmail");
        await AsyncStorage.removeItem("rememberMe");
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      signIn();
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    try {
      // Implement password reset logic here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert("Success", "Password reset instructions sent to your email");
      setIsResetModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to send reset instructions");
    }
  };

  return (
    <View className="flex-1 bg-black dark:bg-black p-4">
      <Animated.View
        entering={FadeInDown.delay(200).duration(1000).springify()}
        className="flex-1 justify-center"
      >
        <BrandLogo />

        <View className="space-y-4">
          <View>
            <TextInput
              className={`p-4 bg-neutral-900 border ${
                errors.email ? "border-red-500" : "border-neutral-800"
              } text-white rounded-lg`}
              placeholder="Email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? (
              <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
            ) : null}
          </View>

          <View>
            <View className="relative">
              <TextInput
                className={`p-4 bg-neutral-900 border ${
                  errors.password ? "border-red-500" : "border-neutral-800"
                } text-white rounded-lg pr-12`}
                placeholder="Password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <Text className="text-red-500 text-sm mt-1">
                {errors.password}
              </Text>
            ) : null}
          </View>

          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setRememberMe(!rememberMe)}
            >
              <Ionicons
                name={rememberMe ? "checkbox" : "square-outline"}
                size={24}
                color="#facc15"
              />
              <Text className="text-white ml-2">Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsResetModalVisible(true)}>
              <Text className="text-yellow-400">Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-yellow-400 mt-4 p-4 rounded-lg"
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="black" />
            ) : (
              <Text className="text-black text-center font-bold text-lg">
                Login
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Password Reset Modal */}
      <Modal visible={isResetModalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center p-4">
          <View className="bg-neutral-900 p-4 rounded-lg">
            <Text className="text-white text-lg mb-4">Reset Password</Text>
            <TextInput
              className="p-4 bg-neutral-800 text-white rounded-lg mb-4"
              placeholder="Enter your email"
              placeholderTextColor="#666"
              value={resetEmail}
              onChangeText={setResetEmail}
              keyboardType="email-address"
            />
            <View className="flex-row justify-end space-x-2">
              <TouchableOpacity
                onPress={() => setIsResetModalVisible(false)}
                className="p-2"
              >
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePasswordReset}
                className="bg-yellow-400 p-2 rounded"
              >
                <Text className="text-black">Send Reset Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
