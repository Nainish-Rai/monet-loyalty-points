import React from "react";
import { Image } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export const BrandLogo = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(1000)}
      className="items-center mb-8"
    >
      <Image
        source={require("@/assets/images/react-logo.png")}
        className="w-40 h-40"
        resizeMode="contain"
      />
    </Animated.View>
  );
};
