import { Transaction, TransactionDetails } from "@/types/transaction";

export interface BrandProfileDetailsResponse {
  profile: Profile;
  message: string;
}

export interface Profile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  countryCode: string;
  mobileNumber: string;
  otpVerified: boolean;
  otpVerificationRequestId: string;
  name: null;
  userRoleId: string;
  brandId: string;
  brand: Brand;
  userRole: UserRole;
}

export interface Brand {
  id: string;
  name: string;
  profilePictureURL: string;
  description: string;
}

export interface UserRole {
  id: string;
  role: string;
}

export interface BrandProfileUpdateRequest {
  name: string;
  description: string;
  profilePicture: File | null;
}

export interface BrandProfileUpdateResponse {
  message: string;
}

export interface BrandBusinessProfileUpdateRequest {
  industry: string;
  category: string;
  conversionRate: string;
  brandSymbol: string;
}

export interface BrandBusinessProfileUpdateResponse {
  message: string;
}

export interface BrandDashboardResponse {
  numberOfConsumers: number;
  totalTradedInPoints: number;
  totalTradedOutPoints: number;
  totalTransactions: number;
  brand: {
    id: string;
    name: string;
    profilePictureURL: string;
    description: string;
    brandSymbol: string;
  };
  message: string;
}

export interface BrandTransactionsResponse {
  message: string;
  transactions: Transaction[];
}

export interface BrandTransactionResponse {
  message: string;
  transaction: TransactionDetails;
}

export interface BrandAccount {
  id: string;
  name: string;
  profilePictureURL: string;
  conversionRate?: number;
  websiteURL?: string;
  brandIndustry?: string;
}

export interface LinkedBrandAccount {
  brand: BrandAccount;
  brandId: string;
  consumerId: string;
  countryCode: string;
  createdAt: string;
  email: string;
  id: string;
  mobileNumber: string;
  verificationId: string;
  verified: boolean;
}
