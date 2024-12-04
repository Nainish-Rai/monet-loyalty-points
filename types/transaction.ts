export interface Transaction {
  consumerId: string;
  fromBrand: {
    name: string;
    profilePictureURL: string;
    brandSymbol?: string;
    conversionRate?: number;
  };
  toBrand: {
    name: string;
    profilePictureURL: string;
    brandSymbol?: string;
    conversionRate?: number;
  };
  id: string;
  pointsTransferredFromA: number;
  pointsTransferredToB: number;
  transferStatus?: "COMPLETED" | "PENDING" | "FAILED";
}

export interface TransactionDetails {
  id: string;
  transferStatus: "COMPLETED" | "PENDING" | "FAILED";
  toExpiryDate: string;
  toBrandId: string;
  toBrand: {
    name: string;
    profilePictureURL: string;
    brandSymbol: string;
  };
  fromBrandId: string;
  fromBrand: {
    name: string;
    profilePictureURL: string;
    brandSymbol: string;
  };
  brandATransactionId: string;
  brandBTransactionId: string;
  completedAt: string;
  consumerId: string;
  createdAt: string;
  consumer: {
    countryCode: string;
    mobileNumber: string;
    name: string;
    profilePictureURL: string;
  };
  pointsTransferredFromA: number;
  pointsTransferredToB: number;
}
