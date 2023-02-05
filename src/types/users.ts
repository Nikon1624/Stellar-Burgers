import { User } from './state';

export type LoginApiResponse = {
  success: boolean;
  user: User,
  accessToken: string;
  refreshToken: string;
};

export type ForgotApiResponse = {
  success: boolean;
  message: string;
};

export type CheckUserApiResponse = Omit<LoginApiResponse, 'accessToken' | 'refreshToken'>;

export type RefreshApiResponse = Omit<LoginApiResponse, 'user'>;

export type RefreshPayloadType = {
  token: string;
};
