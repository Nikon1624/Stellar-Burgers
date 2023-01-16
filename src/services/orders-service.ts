import { ApiService } from './api-sevice';
import { OrdersApiResponse } from '../types/orders';

const ENDPOINT = '/orders';

export class OrdersService {
  public static async sendRequest(params = {}) {
    const res = await ApiService.post<OrdersApiResponse>(ENDPOINT, params);

    if (res) {
      return res.data;
    }
  }
}
