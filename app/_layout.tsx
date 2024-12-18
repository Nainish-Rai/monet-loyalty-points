import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/utils/queryClient";
import { useTokenStore } from "@/store/tokenStore";
import { router, useSegments, useRootNavigationState } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { accessToken } = useTokenStore();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";
    // const isIndex = segments[0] === "index";

    if (accessToken && !inTabsGroup) {
      router.replace("/(tabs)");
    } else if (!accessToken) {
      router.replace("/");
    }
  }, [segments, navigationState?.key, accessToken]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <GluestackUIProvider mode="dark">
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
            </Stack>
            <StatusBar style="auto" />
          </QueryClientProvider>
        </ThemeProvider>
      </GluestackUIProvider>
    </AuthProvider>
  );
}
