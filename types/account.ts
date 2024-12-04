import { BrandAccount } from "@/types/brand";

export interface Account {
  id: string;
  consumerId: string;
  brandId: string;
  email: null;
  countryCode: string;
  mobileNumber: string;
  verified: boolean;
  createdAt: Date;
  verificationId: string;
  brand: BrandAccount[];
}
