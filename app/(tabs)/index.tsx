import React from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import type { Transaction } from "@/types/rewards";

export default function OverviewScreen() {
  const { signOut } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const insets = useSafeAreaInsets();

  const [mockData] = React.useState({
    balance: 1234,
    trending: "up",
    expiringPoints: { amount: 500, daysLeft: 45 },
    recentTransactions: [
      {
        id: "1",
        type: "earn",
        amount: 100,
        date: "2024-02-01",
        description: "Purchase Reward",
      },
      {
        id: "2",
        type: "redeem",
        amount: -50,
        date: "2024-01-30",
        description: "Coffee Redemption",
      },
      {
        id: "3",
        type: "transfer",
        amount: 25,
        date: "2024-01-28",
        description: "Points Transfer",
      },
    ] as Transaction[],
  });

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const handleLogout = async () => {
    await signOut(() => {
      router.replace("/");
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Add your refresh logic here
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <Animated.View
      entering={FadeInDown}
      className="flex-row items-center bg-neutral-900 p-4 rounded-lg mb-2"
    >
      <Ionicons
        name={
          item.type === "earn"
            ? "add-circle"
            : item.type === "redeem"
            ? "gift"
            : "swap-horizontal"
        }
        size={24}
        color={item.type === "earn" ? "#4ade80" : "#facc15"}
      />
      <View className="flex-1 ml-3">
        <ThemedText>{item.description}</ThemedText>
        <ThemedText className="text-sm text-gray-400">{item.date}</ThemedText>
      </View>
      <ThemedText
        className={item.amount > 0 ? "text-green-400" : "text-yellow-400"}
      >
        {item.amount > 0 ? "+" : ""}
        {item.amount}
      </ThemedText>
    </Animated.View>
  );

  if (loading) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#facc15" />
      </View>
    );
  }

  return (
    <FlatList
      data={mockData.recentTransactions}
      renderItem={renderTransaction}
      keyExtractor={(item) => item.id}
      refreshing={refreshing}
      onRefresh={onRefresh}
      className="flex-1 bg-black"
      contentContainerStyle={{
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
      }}
      ListHeaderComponent={
        <>
          {/* Header with Logout */}
          <View className="flex-row justify-between items-center p-4">
            <ThemedText type="title">Overview</ThemedText>
            <TouchableOpacity onPress={handleLogout} className="p-2">
              <Ionicons name="log-out-outline" size={24} color="#facc15" />
            </TouchableOpacity>
          </View>

          <Animated.View
            entering={FadeIn.duration(300)}
            className="bg-neutral-900 m-4 p-6 rounded-xl"
          >
            <View className="flex-row justify-between items-center">
              <ThemedText type="subtitle">Current Balance</ThemedText>
              <Ionicons
                name={
                  mockData.trending === "up" ? "trending-up" : "trending-down"
                }
                size={24}
                color={mockData.trending === "up" ? "#4ade80" : "#ef4444"}
              />
            </View>
            <ThemedText type="title" className="text-4xl text-yellow-400 my-2">
              {mockData.balance.toLocaleString()}
            </ThemedText>
            <ThemedText>
              ≈ ${(mockData.balance * 0.01).toFixed(2)} USD
            </ThemedText>
          </Animated.View>

          {/* Quick Actions */}
          <View className="flex-row justify-around m-4">
            <TouchableOpacity className="bg-neutral-900 p-4 rounded-xl flex-1 mr-2 items-center">
              <Ionicons name="swap-horizontal" size={24} color="#facc15" />
              <ThemedText className="mt-2">Transfer</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity className="bg-neutral-900 p-4 rounded-xl flex-1 mx-2 items-center">
              <Ionicons name="gift" size={24} color="#facc15" />
              <ThemedText className="mt-2">Redeem</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity className="bg-neutral-900 p-4 rounded-xl flex-1 ml-2 items-center">
              <Ionicons name="add-circle" size={24} color="#facc15" />
              <ThemedText className="mt-2">Earn</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Expiring Points Warning */}
          {mockData.expiringPoints.amount > 0 && (
            <View className="bg-yellow-400/10 m-4 p-4 rounded-lg">
              <View className="flex-row items-center">
                <Ionicons name="warning" size={24} color="#facc15" />
                <ThemedText className="ml-2 flex-1 text-yellow-400">
                  {mockData.expiringPoints.amount} points expiring in{" "}
                  {mockData.expiringPoints.daysLeft} days
                </ThemedText>
                <TouchableOpacity>
                  <ThemedText className="text-yellow-400 font-bold">
                    Use Now
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Recent Activity Header */}
          <View className="m-4">
            <ThemedText type="subtitle" className="mb-4">
              Recent Activity
            </ThemedText>
          </View>
        </>
      }
    />
  );
}
