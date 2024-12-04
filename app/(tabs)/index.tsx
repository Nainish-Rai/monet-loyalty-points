import React, { useMemo, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInRight,
  withSpring,
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import type { Transaction } from "@/types/rewards";

const { width } = Dimensions.get("window");

type QuickActionProps = {
  icon: string;
  label: string;
  onPress: () => void;
};

type BalanceCardProps = {
  balance: number;
  trending: "up" | "down";
  balanceAnimatedStyle: any;
};

const QuickActionButton: React.FC<QuickActionProps> = React.memo(
  ({ icon, label, onPress }) => (
    <TouchableOpacity
      className="bg-neutral-900 p-4 rounded-xl flex-1 mx-2 items-center"
      onPress={onPress}
      style={{ elevation: 3 }}
    >
      <Animated.View entering={FadeIn.duration(300).delay(300)}>
        <Ionicons name={icon as any} size={24} color="#facc15" />
      </Animated.View>
      <ThemedText className="mt-2">{label}</ThemedText>
    </TouchableOpacity>
  )
);

const BalanceCard: React.FC<BalanceCardProps> = React.memo(
  ({ balance, trending, balanceAnimatedStyle }) => (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={[balanceAnimatedStyle]}
      className="bg-neutral-900 m-4 p-6 rounded-xl shadow-lg"
    >
      <View className="flex-row justify-between items-center">
        <ThemedText type="subtitle">Current Balance</ThemedText>
        <Animated.View>
          <Ionicons
            name={trending === "up" ? "trending-up" : "trending-down"}
            size={24}
            color={trending === "up" ? "#4ade80" : "#ef4444"}
          />
        </Animated.View>
      </View>
      <ThemedText type="title" className="text-4xl text-yellow-400 my-2">
        {balance.toLocaleString()}
      </ThemedText>
      <ThemedText>≈ ${(balance * 0.01).toFixed(2)} USD</ThemedText>
    </Animated.View>
  )
);

export default function OverviewScreen() {
  const { signOut } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const insets = useSafeAreaInsets();
  const balanceScale = useSharedValue(1);

  // Animation for balance changes
  const animateBalanceChange = useCallback((increase: boolean) => {
    balanceScale.value = withSequence(
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
  }, []);

  const balanceAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: balanceScale.value }],
  }));

  const [mockData, setMockData] = React.useState({
    balance: 1234,
    trending: "up" as "up" | "down",
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

  const LoadingState = () => (
    <View className="flex-1 bg-black p-4">
      <SkeletonLoader width={150} height={30} style={{ marginTop: 20 }} />
      <View className="mt-4">
        <SkeletonLoader width={width - 32} height={150} />
      </View>
      <View className="flex-row justify-around mt-4">
        <SkeletonLoader width={(width - 48) / 3} height={80} />
        <SkeletonLoader
          width={(width - 48) / 3}
          height={80}
          style={{ marginHorizontal: 8 }}
        />
        <SkeletonLoader width={(width - 48) / 3} height={80} />
      </View>
      {[1, 2, 3].map((i) => (
        <SkeletonLoader
          key={i}
          width={width - 32}
          height={70}
          style={{ marginTop: 16 }}
        />
      ))}
    </View>
  );

  const renderTransaction = useCallback(
    ({ item, index }: { item: Transaction; index: number }) => (
      <Animated.View
        entering={SlideInRight.delay(index * 100).springify()}
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
        <Animated.Text
          className={`${
            item.amount > 0 ? "text-green-400" : "text-yellow-400"
          }`}
          style={[{ fontWeight: "600" }]}
        >
          {item.amount > 0 ? "+" : ""}
          {item.amount}
        </Animated.Text>
      </Animated.View>
    ),
    []
  );

  if (loading) {
    return <LoadingState />;
  }

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      // Add your refresh logic here
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    signOut();
  }, [signOut]);

  // Memoize header component to prevent unnecessary rerenders
  const ListHeader = useMemo(
    () => (
      <>
        <Animated.View
          entering={FadeIn.duration(300)}
          className="flex-row justify-between items-center p-4"
        >
          <ThemedText type="title">Overview</ThemedText>
          <TouchableOpacity onPress={handleLogout} className="p-2">
            <Ionicons name="log-out-outline" size={24} color="#facc15" />
          </TouchableOpacity>
        </Animated.View>

        <BalanceCard
          balance={mockData.balance}
          trending={mockData.trending}
          balanceAnimatedStyle={balanceAnimatedStyle}
        />

        <View className="flex-row justify-around m-4">
          <QuickActionButton
            icon="swap-horizontal"
            label="Transfer"
            onPress={() => {}}
          />
          <QuickActionButton icon="gift" label="Redeem" onPress={() => {}} />
          <QuickActionButton
            icon="add-circle"
            label="Earn"
            onPress={() => {}}
          />
        </View>

        {mockData.expiringPoints.amount > 0 && (
          <Animated.View
            entering={FadeInDown.springify()}
            className="bg-yellow-400/10 m-4 p-4 rounded-lg"
          >
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
          </Animated.View>
        )}

        <View className="m-4">
          <ThemedText type="subtitle" className="mb-4">
            Recent Activity
          </ThemedText>
        </View>
      </>
    ),
    [mockData, balanceAnimatedStyle, handleLogout]
  );

  return (
    <FlatList
      data={mockData.recentTransactions}
      renderItem={renderTransaction}
      keyExtractor={useCallback((item: Transaction) => item.id, [])}
      refreshing={refreshing}
      onRefresh={onRefresh}
      className="flex-1 bg-black"
      contentContainerStyle={{
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
      }}
      ListHeaderComponent={ListHeader}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      initialNumToRender={5}
    />
  );
}
