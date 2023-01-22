import { StateType } from '../../types/state';
import { Namespace } from '../../consts';
import { Ingredient, IngredientWithUniqId } from '../../types/ingredient';
import { OrdersApiResponse } from '../../types/orders';

export const getIngredients = (state: StateType): Ingredient[] => state[Namespace.Ingredients].ingredients;
export const getSelectedIngredients = (state: StateType): IngredientWithUniqId[] => state[Namespace.Ingredients].selectedIngredients;
export const getOpenedIngredient = (state: StateType): Ingredient | null => state[Namespace.Ingredients].openedIngredient;
export const getOrder = (state: StateType): OrdersApiResponse | null => state[Namespace.Ingredients].order;
export const getIngredientCount = (ingredient: Ingredient) => (state: StateType): number => {
  const needle = state[Namespace.Ingredients].selectedIngredients.filter((item) => item._id === ingredient._id);
  const needleCount = needle ? needle.length : 0;
  return needleCount && ingredient.type === 'bun' ? needleCount * 2 : needleCount;
};
