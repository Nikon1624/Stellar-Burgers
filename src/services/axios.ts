import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { API_BASE_URL, LocalStorageKeys } from '../consts';
import { localStorageApi } from '../utils/local-storage-api';
import { RefreshApiResponse, RefreshPayloadType } from '../types/users';

const REFRESH_ENDPOINT = '/auth/token';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  responseType: 'json',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorageApi.getValue<string>(LocalStorageKeys.AccessToken);

  if (config.headers) {
    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const initialRequest = error.config;
    const token = localStorageApi.getValue<string>(LocalStorageKeys.RefreshToken);

    if (token && error.response.status === 403 && error.config && !error.config.retryRequest) {
      initialRequest.retryRequest = true;

      try {
        const response = await axios.post<RefreshPayloadType, AxiosResponse<RefreshApiResponse>>(
          `${API_BASE_URL}${REFRESH_ENDPOINT}`,
          { token },
        );

        localStorageApi.setValue(LocalStorageKeys.RefreshToken, response.data.refreshToken);
        localStorageApi.setValue(LocalStorageKeys.AccessToken, response.data.accessToken.split('Bearer ')[1]);

        return await axiosInstance.request(initialRequest);
      } catch (err) {
        localStorageApi.removeValue(LocalStorageKeys.RefreshToken);
        localStorageApi.removeValue(LocalStorageKeys.AccessToken);
      }
    }

    throw error;
  },
);
