import { axiosInstance } from './axios';
import { toast } from 'react-toastify';
import { serializeToQueryParams } from '../utils/utils';

export class ApiService {
  public static async get<R>(endpoint: string, params: object) {
    try {
      const url = params ? `${endpoint}?${serializeToQueryParams(params)}` : endpoint;
      return await axiosInstance.get<R>(url);
    } catch (e) {
      toast.error('Произошла ошибка, попробуйте позже', {
        theme: 'dark',
      });
    }
  }

  public static async post<R>(endpoint: string, params: object) {
    try {
      const url = params ? `${endpoint}?${serializeToQueryParams(params)}` : endpoint;
      return await axiosInstance.post<R>(url);
    } catch (e) {
      toast.error('Произошла ошибка, попробуйте позже', {
        theme: 'dark',
      });
    }
  }
}
