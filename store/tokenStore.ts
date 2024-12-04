import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Token } from "@/types/auth";

type TokenStore = {
  accessToken: Token | null;
  refreshToken: Token | null;
  consumerId: string | null;
  brandId: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: Token) => void;
  clearAccessToken: () => void;
  setRefreshToken: (token: Token) => void;
  clearRefreshToken: () => void;
  setConsumerId: (consumerId: string) => void;
  setBrandId: (brandId: string) => void;
  clearBrandId: () => void;
  clearConsumerId: () => void;
  setIsLoggedIn: (value: boolean) => void;
  clearAll: () => void;
};

const storage = {
  getItem: async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    return value ?? null;
  },
  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      consumerId: null,
      brandId: null,
      isLoggedIn: false,
      setAccessToken: (token) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      clearRefreshToken: () => set({ refreshToken: null }),
      setConsumerId: (consumerId) => set({ consumerId }),
      setBrandId: (brandId) => set({ brandId }),
      clearBrandId: () => set({ brandId: null }),
      clearConsumerId: () => set({ consumerId: null }),
      setIsLoggedIn: (value) => set({ isLoggedIn: value }),
      clearAll: () =>
        set({
          accessToken: null,
          refreshToken: null,
          consumerId: null,
          brandId: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: "token-storage",
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        consumerId: state.consumerId,
        brandId: state.brandId,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
