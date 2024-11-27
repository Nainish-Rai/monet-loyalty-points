export type Transaction = {
  id: string;
  type: "earn" | "redeem" | "transfer";
  amount: number;
  date: string;
  description: string;
};

export type PointsData = {
  balance: number;
  currency: {
    code: string;
    rate: number;
  };
  expiringPoints: {
    amount: number;
    date: string;
  }[];
  recentTransactions: Transaction[];
};
