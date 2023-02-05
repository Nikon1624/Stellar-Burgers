import { axiosInstance } from './axios';
import { serializeToQueryParams } from '../utils/utils';

export class ApiService {
  public static async get<R>(endpoint: string, params: object = {}) {
    const url = params ? `${endpoint}?${serializeToQueryParams(params)}` : endpoint;
    return await axiosInstance.get<R>(url);
  }

  public static async post<R>(endpoint: string, params: object = {}) {
    return await axiosInstance.post<R>(endpoint, params);
  }

  public static async patch<R>(endpoint: string, params: object = {}) {
    return await axiosInstance.patch<R>(endpoint, params);
  }
}
