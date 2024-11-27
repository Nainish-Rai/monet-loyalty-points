import React, { useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Add your refresh logic here
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <FlatList
      data={[]} // Add your transaction data here
      renderItem={() => null} // Add your transaction item component here
      keyExtractor={(item, index) => index.toString()}
      refreshing={refreshing}
      onRefresh={onRefresh}
      className="flex-1 bg-black"
      contentContainerStyle={{
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
      }}
      ListHeaderComponent={
        <>
          {/* Search Bar */}
          <View className="p-4">
            <View className="flex-row bg-neutral-900 rounded-lg p-2 items-center">
              <Ionicons name="search" size={20} color="#666" />
              <TextInput
                className="flex-1 ml-2 text-white"
                placeholder="Search transactions..."
                placeholderTextColor="#666"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Sort Options */}
          <View className="flex-row p-4">
            {["date", "amount", "type"].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setSortBy(option)}
                className={`px-4 py-2 rounded-full mr-2 ${
                  sortBy === option ? "bg-yellow-400" : "bg-neutral-900"
                }`}
              >
                <ThemedText
                  className={sortBy === option ? "text-black" : "text-white"}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </>
      }
    />
  );
}
