import { ApiService } from './api-sevice';
import { CheckUserApiResponse, ForgotApiResponse, LoginApiResponse, RefreshPayloadType } from '../types/users';
import { ForgotFormFields, LoginFormFields, RegisterFormFields, ResetFormFields } from '../types/forms';

const LOGIN_ENDPOINT = '/auth/login';
const REGISTER_ENDPOINT = '/auth/register';
const LOGOUT_ENDPOINT = '/auth/logout';
const FORGOT_ENDPOINT = '/password-reset';
const RESET_ENDPOINT = '/password-reset/reset';
const USER_ENDPOINT = '/auth/user';

export class UsersService {
  public static async login(params: LoginFormFields) {
    const res = await ApiService.post<LoginApiResponse>(LOGIN_ENDPOINT, params);

    return res.data;
  }

  public static async logout(params: RefreshPayloadType) {
    const res = await ApiService.post<ForgotApiResponse>(LOGOUT_ENDPOINT, params);

    return res.data;
  }

  public static async register(params: RegisterFormFields) {
    const res = await ApiService.post<LoginApiResponse>(REGISTER_ENDPOINT, params);

    return res.data;
  }

  public static async forgotPassword(params: ForgotFormFields) {
    const res = await ApiService.post<ForgotApiResponse>(FORGOT_ENDPOINT, params);

    return res.data;
  }

  public static async resetPassword(params: ResetFormFields) {
    const res = await ApiService.post<ForgotApiResponse>(RESET_ENDPOINT, params);

    return res.data;
  }

  public static async checkUser() {
    const res = await ApiService.get<CheckUserApiResponse>(USER_ENDPOINT);

    return res.data;
  }

  public static async updateUser(params: RegisterFormFields) {
    const res = await ApiService.patch<CheckUserApiResponse>(USER_ENDPOINT, params);

    return res.data;
  }
}
