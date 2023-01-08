import { ApiService } from './api-sevice';
import { IngredientsApiResponse } from '../types/ingredient';

const ENDPOINT = '/ingredients';

export class IngredientsService {
  public static async getList(params = {}) {
    const res = await ApiService.get<IngredientsApiResponse>(ENDPOINT, params);

    if (res) {
      return res.data.data;
    }

    return [];
  }
}
