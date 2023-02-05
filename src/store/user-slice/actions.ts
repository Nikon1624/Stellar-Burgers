import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersService } from '../../services/users-service';
import { CheckUserApiResponse, ForgotApiResponse, LoginApiResponse } from '../../types/users';
import { ForgotFormFields, LoginFormFields, RegisterFormFields, ResetFormFields } from '../../types/forms';
import { localStorageApi } from '../../utils/local-storage-api';
import { AppRoute, LocalStorageKeys } from '../../consts';
import { redirectToRoute } from '../actions';
import { handleApiError } from '../../utils/utils';

export const login = createAsyncThunk<LoginApiResponse, LoginFormFields, { rejectValue: string }>(
  'user/login',
  async (authData, { dispatch, rejectWithValue }) => {
    try {
      const data = await UsersService.login(authData);

      localStorageApi.setValue(LocalStorageKeys.RefreshToken, data.refreshToken);
      localStorageApi.setValue(LocalStorageKeys.AccessToken, data.accessToken.split('Bearer ')[1]);

      dispatch(redirectToRoute(AppRoute.MainPage));

      return data;
    } catch (e) {
      throw rejectWithValue(handleApiError(e));
    }
  }
);

export const logout = createAsyncThunk<ForgotApiResponse, undefined, { rejectValue: string }>(
  'user/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorageApi.getValue<string>(LocalStorageKeys.RefreshToken);

      if (token) {
        const data = await UsersService.logout({ token });

        localStorageApi.removeValue(LocalStorageKeys.RefreshToken);
        localStorageApi.removeValue(LocalStorageKeys.AccessToken);

        dispatch(redirectToRoute(AppRoute.LoginPage));

        return data;
      }

      throw new Error('Token is null');
    } catch (e) {
      throw rejectWithValue(handleApiError(e));
    }
  }
);

export const register = createAsyncThunk<LoginApiResponse, RegisterFormFields, { rejectValue: string }>(
  'user/register',
  async (authData, { dispatch, rejectWithValue }) => {
    try {
      const data = await UsersService.register(authData);

      localStorageApi.setValue(LocalStorageKeys.RefreshToken, data.refreshToken);
      localStorageApi.setValue(LocalStorageKeys.AccessToken, data.accessToken.split('Bearer ')[1]);

      dispatch(redirectToRoute(AppRoute.LoginPage));

      return data;
    } catch (e) {
      throw rejectWithValue(handleApiError(e));
    }
  }
);

export const forgotPassword = createAsyncThunk<ForgotApiResponse, ForgotFormFields, { rejectValue: string }>(
  'user/forgot',
  async (authData, { dispatch, rejectWithValue }) => {
    try {
      const data = await UsersService.forgotPassword(authData);

      dispatch(redirectToRoute(AppRoute.ResetPasswordPage));

      return data;
    } catch (e) {
      throw rejectWithValue(handleApiError(e));
    }
  }
);

export const resetPassword = createAsyncThunk<ForgotApiResponse, ResetFormFields, { rejectValue: string }>(
  'user/reset',
  async (authData, { dispatch, rejectWithValue }) => {
    try {
      const data = await UsersService.resetPassword(authData);

      dispatch(redirectToRoute(AppRoute.LoginPage));

      return data;
    } catch (e) {
      throw rejectWithValue(handleApiError(e));
    }
  }
);

export const checkUser = createAsyncThunk<CheckUserApiResponse, undefined, { rejectValue: string }>(
  'user/check',
  async (_, { rejectWithValue }) => {
    try {
      return await UsersService.checkUser();
    } catch (e) {
      throw rejectWithValue(handleApiError(e));
    }
  }
);

export const updateUser = createAsyncThunk<CheckUserApiResponse, RegisterFormFields, { rejectValue: string }>(
  'user/update',
  async (data, { rejectWithValue }) => {
    try {
      return await UsersService.updateUser(data);
    } catch (e) {
      throw rejectWithValue(handleApiError(e));
    }
  }
);
