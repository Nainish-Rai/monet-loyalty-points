export interface ConsumerSignupRequest extends SignupRequest {}
export interface ConsumerSignupResponse extends SignupResponse {}

export interface ConsumerSignupVerifyOtpRequest extends VerifyOtpRequest {}

export interface ConsumerSignupVerifyOtpResponse extends VerifyOtpResponse {}

export interface BrandSignupRequest extends SignupRequest {
  regCode: string;
}

export interface BrandLoginRequest extends LoginRequest {}

export interface BrandLoginResponse extends LoginResponse {}

export interface BrandSignupResponse extends SignupResponse {}

export interface BrandSignupVerifyOtpRequest extends VerifyOtpRequest {
  regCode: string;
}

export interface BrandSignupVerifyOtpResponse extends VerifyOtpResponse {}

export interface BrandLoginVerifyOtpRequest extends VerifyOtpRequest {}

export interface BrandLoginVerifyOtpResponse extends VerifyOtpResponse {}

export interface BrandAddPOCOtpRequest {
  countryCode: string;
  mobileNumber: string;
}

export interface BrandAddPOCVerifyOtpRequest extends VerifyOtpRequest {}

export interface BrandAddPOCOtpResponse {
  countryCode: string;
  mobileNumber: string;
  requestId: string;
}

export interface BrandAddPOCVerifyOtpResponse extends VerifyOtpResponse {}

export interface BrandSendEmailRequestOtpRequest {
  email: string;
}

export interface BrandSendEmailRequestOtpResponse {
  email: string;
  requestId: string;
}

export interface BrandVerifyEmailRequestOtpRequest {
  email: string;
  otp: string;
  requestId: string;
}

export interface BrandVerifyEmailRequestOtpResponse {
  email: string;
  requestId: string;
}

export type Token = {
  token: string;
  expires: string;
};

type Tokens = {
  access: Token;
  refresh: Token;
};

export interface ConsumerLoginRequest extends LoginRequest {}

export interface ConsumerLoginResponse extends LoginResponse {}

export interface ConsumerLoginVerifyOtpRequest extends VerifyOtpRequest {}

export interface ConsumerLoginVerifyOtpResponse extends VerifyOtpResponse {}

export interface LogoutRequest {
  refreshToken: string;
}
interface VerifyOtpRequest {
  countryCode: string;
  mobileNumber: string;
  otp: string;
  requestId: string;
}

interface VerifyOtpResponse {
  message: string;
  tokens: Tokens;
  id: string;
}

interface LoginRequest {
  mobileNumber: string;
  countryCode: string;
}

interface LoginResponse {
  requestId: string;
  message: string;
}

interface SignupRequest {
  countryCode: string;
  mobileNumber: string;
}

interface SignupResponse {
  countryCode: string;
  mobileNumber: string;
  requestId: string;
}
