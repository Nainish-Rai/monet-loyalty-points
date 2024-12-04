import { BrandAccount, LinkedBrandAccount } from "@/types/brand";
import { Transaction, TransactionDetails } from "@/types/transaction";

export type UploadFile = File | null;

export interface ConsumerProfileDetailsResponse {
  message: string;
  profile: {
    id: string;
    name: string;
    description: string;
    profilePictureURL: string;
  };
}
export interface ConsumerProfileUpdateRequest {
  name: string;
  description?: string;
  profilePicture?: UploadFile;
}

export interface ConsumerProfileUpdateResponse {
  message: string;
}

export interface ConsumerBrandProfilesResponse {
  accounts: BrandAccount[];
  brands: BrandAccount[];
  message: string;
}

export interface ConsumerBrandAddProfileRequest {
  countryCode?: string;
  mobileNumber?: string;
  brandId: string;
  email?: string;
}

export interface ConsumerBrandAddProfileResponse {
  message: string;
  requestId: string;
  id: string;
}

export interface ConsumerBrandVerifyProfileRequest {
  id: string;
  requestId: string;
  otp: string;
}

export interface ConsumerBrandVerifyProfileResponse {
  message: string;
  points: number;
  id: string;
}

export interface ConsumerTransferPointsRequest {
  fromBrandId: string;
  toBrandId: string;
  points: number;
}

export interface ConsumerTransferPointsResponse {
  message: string;
}

export interface ConsumerLinkedBrandAccountsResponse {
  accounts: LinkedBrandAccount[];
  message: string;
}
export interface ConsumerLinkedBrandAccountResponse {
  account: LinkedBrandAccount;
  message: string;
  totalPoints: number;
}

export interface ConsumerDashboardResponse {
  session: Session;
  message: string;
}

export interface ConsumerTransactionsResponse {
  message: string;
  transactions: Transaction[];
}

export interface ConsumerTransactionResponse {
  message: string;
  transaction: TransactionDetails;
}

export interface PointData {
  points: string;
  expirationDate: string;
}

export interface Brand {
  id: string;
  name: string;
  profilePictureURL: string;
  conversionRate: number;
  websiteURL: string;
}

export interface Account {
  id: string;
  consumerId: string;
  brandId: string;
  email: string | null;
  countryCode: string;
  mobileNumber: string;
  verified: boolean;
  createdAt: string;
  verificationId: string;
  brand: Brand;
}

export interface StreamResponse {
  part: number;
  points: PointData[];
  account: Account;
}

export interface BrandTotals {
  [brandId: string]: {
    brandName: string;
    profilePicture: string;
    conversionRate: number;
    totalPoints: number;
    validPoints: number;
    expiringPoints: number;
    expiredPoints: number;
    partCount: number;
    websiteURL: string;
  };
}

export interface Session {
  id: string;
  consumerId: string;
  sessionId: string;
  createdAt: Date;
  updatedAt: Date;
}
