import { createAsyncThunk } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/ingredient';
import { IngredientsService } from '../../services/ingredients-service';
import { OrdersApiResponse } from '../../types/orders';
import { OrdersService } from '../../services/orders-service';
import { handleApiError } from '../../utils/utils';

export const fetchIngredients = createAsyncThunk<Ingredient[], undefined, { rejectValue: string }>(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      return await IngredientsService.getList();
    } catch (e) {
      throw rejectWithValue(handleApiError(e));
    }
  }
);

export const sendOrder = createAsyncThunk<OrdersApiResponse | null, string[], { rejectValue: string }>(
  'ingredients/sendOrder',
  async (ids, { rejectWithValue }) => {
    try {
      return await OrdersService.sendRequest({ ingredients: ids });
    } catch (e) {
      throw rejectWithValue(handleApiError(e));
    }
  }
);
