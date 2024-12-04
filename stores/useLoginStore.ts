import { create } from "zustand";

type LoginView = "login" | "otp";

type LoginState = {
  currentView: LoginView;
  errorMessage: string;
  requestId: string;
  otp: string;
  mobileNumber: string;
  countryCode: string;
  isProfileComplete: boolean;
  setCurrentView: (view: LoginView) => void;
  setRequestId: (requestId: string) => void;
  setOtp: (otp: string) => void;
  setMobileNumber: (mobileNumber: string) => void;
  setCountryCode: (countryCode: string) => void;
  setIsProfileComplete: (isProfileComplete: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
  resetOtp: () => void;
};

const useLoginStore = create<LoginState>((set) => ({
  currentView: "login",
  errorMessage: "",
  requestId: "",
  otp: "",
  mobileNumber: "",
  countryCode: "",
  isProfileComplete: false,
  setCurrentView: (view) => set({ currentView: view }),
  setRequestId: (requestId) => set({ requestId }),
  setOtp: (otp) => set({ otp }),
  setMobileNumber: (mobileNumber) => set({ mobileNumber }),
  setCountryCode: (countryCode) => set({ countryCode }),
  setIsProfileComplete: (isProfileComplete) => set({ isProfileComplete }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  resetOtp: () => set({ otp: "" }),
}));

export default useLoginStore;
