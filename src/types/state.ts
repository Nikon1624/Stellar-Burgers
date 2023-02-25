import { Ingredient, IngredientWithUniqId } from './ingredient';
import { OrdersApiResponse } from './orders';
import { store } from '../store';

export type IngredientsState = {
  ingredients: Ingredient[];
  selectedIngredients: IngredientWithUniqId[];
  openedIngredient: Ingredient | null;
  order: OrdersApiResponse | null;
  orderSended: boolean;
};

export type User = {
  email: string;
  name: string;
};

export type UserState = {
  user: User | null;
  isLoading: boolean;
};

export type StateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

