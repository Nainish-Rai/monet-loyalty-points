import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function ConvertScreen() {
  const insets = useSafeAreaInsets();
  const [points, setPoints] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    try {
      // Add your conversion logic here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowConfirmation(false);
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={[]} // Will be populated with conversion options
      renderItem={() => null} // Will render conversion options
      keyExtractor={(item, index) => index.toString()}
      className="flex-1 bg-black"
      contentContainerStyle={{
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
        padding: 16,
      }}
      ListHeaderComponent={
        <>
          <ThemedText type="title" className="mb-6">
            Convert Points
          </ThemedText>

          {/* Calculator */}
          <View className="bg-neutral-900 p-4 rounded-xl mb-4">
            <ThemedText>Points to Convert</ThemedText>
            <TextInput
              className="text-white text-4xl my-4"
              value={points}
              onChangeText={setPoints}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#666"
            />
            <ThemedText>≈ ${(Number(points) * 0.01).toFixed(2)} USD</ThemedText>
          </View>

          <ThemedText type="subtitle" className="mb-4">
            Available Options
          </ThemedText>
        </>
      }
      ListFooterComponent={
        <TouchableOpacity
          className="bg-yellow-400 p-4 rounded-lg mt-4"
          onPress={() => setShowConfirmation(true)}
        >
          <ThemedText className="text-black text-center font-bold">
            Convert Points
          </ThemedText>
        </TouchableOpacity>
      }
    />
  );
}
