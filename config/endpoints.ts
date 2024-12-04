const API_BASE_URL = "https://stageapi.loyalty.rewards.monet.work/v1";

const endpoints = {
  auth: {
    consumerLogin: `${API_BASE_URL}/consumers/login`,
    consumerLoginVerifyOtp: `${API_BASE_URL}/consumers/login/verify-otp`,
    consumerSignup: `${API_BASE_URL}/consumers/signup`,
    consumerSignupVerifyOtp: `${API_BASE_URL}/consumers/verify-otp`,
    brandLogin: `${API_BASE_URL}/brands/login`,
    brandLoginVerifyOtp: `${API_BASE_URL}/brands/login/verify-otp`,
    brandSignup: `${API_BASE_URL}/brands/signup`,
    brandSignupVerifyOtp: `${API_BASE_URL}/brands/verify-otp`,
    brandAddPOCRequestOtp: (brandId: string) =>
      `${API_BASE_URL}/brands/${brandId}/pocs/send-otp`,
    brandAddPOCVerifyOtp: (brandId: string) =>
      `${API_BASE_URL}/brands/${brandId}/pocs/verify-otp`,
    brandSendEmailOtpRequest: (brandId: string) =>
      `${API_BASE_URL}/brands/${brandId}/send-email`,
    brandVerifyEmailOtp: (brandId: string) =>
      `${API_BASE_URL}/brands/${brandId}/verify-email`,
    logout: `${API_BASE_URL}/auth/logout`,
    refreshToken: `${API_BASE_URL}/auth/refresh-tokens`,
  },

  dashboard: {
    consumerDashboard: `${API_BASE_URL}/consumers/dashboard`,
    consumerDashboardDetails: `${API_BASE_URL}/consumers/dashboard-details`,
    brandDashboard: `${API_BASE_URL}/brands/dashboard`,
    consumerBrandProfiles: (consumerId: string) =>
      `${API_BASE_URL}/consumers/${consumerId}/brand-accounts`,
    consumerBrandAddProfile: (consumerId: string) =>
      `${API_BASE_URL}/consumers/${consumerId}/link-brand-profile`,
    consumerBrandVerifyProfile: (consumerId: string) =>
      `${API_BASE_URL}/consumers/${consumerId}/verify-brand-profile`,
  },

  consumers: {
    transferPoints: (consumerId: string) =>
      `${API_BASE_URL}/consumers/${consumerId}/transfer-points`,
    consumerLinkedBrandAccounts: (consumerId: string) =>
      `${API_BASE_URL}/consumers/${consumerId}/linked-brand-accounts`,
    consumerLinkedBrandAccount: (consumerId: string, brandId: string) =>
      `${API_BASE_URL}/consumers/${consumerId}/linked-brand-accounts/${brandId}`,
    consumerTransactions: (consumerId: string) =>
      `${API_BASE_URL}/consumers/${consumerId}/transactions`,
    consumerTransaction: (consumerId: string, transactionId: string) =>
      `${API_BASE_URL}/consumers/${consumerId}/transactions/${transactionId}`,
    consumerProfileDetails: `${API_BASE_URL}/consumers/profile-details`,
  },

  brands: {
    brandTransactions: (brandId: string) =>
      `${API_BASE_URL}/brands/${brandId}/transactions`,
    brandTransaction: (brandId: string, transactionId: string) =>
      `${API_BASE_URL}/brands/${brandId}/transactions/${transactionId}`,
    brandProfileDetails: `${API_BASE_URL}/brands/profile-details`,
  },

  profile: {
    brandUpdateProfile: (brandId: string) =>
      `${API_BASE_URL}/brands/${brandId}/profile`,
    brandUpdateBusinessProfile: (brandId: string) =>
      `${API_BASE_URL}/brands/${brandId}/business-info`,
    consumerUpdateProfile: (consumerId: string) =>
      `${API_BASE_URL}/consumers/${consumerId}/profile`,
  },
};

export default endpoints;
