import axios from 'axios';
import { API_BASE_URL } from '../consts';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  responseType: 'json',
});
