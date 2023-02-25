import { createSelector } from '@reduxjs/toolkit';
import { StateType } from '../../types/state';
import { Namespace } from '../../consts';
import { Ingredient, IngredientWithUniqId } from '../../types/ingredient';
import { OrdersApiResponse } from '../../types/orders';

export const getIngredients = (state: StateType): Ingredient[] => state[Namespace.Ingredients].ingredients;

export const getSelectedIngredients = (state: StateType): IngredientWithUniqId[] => state[Namespace.Ingredients].selectedIngredients;

export const getOpenedIngredient = (state: StateType): Ingredient | null => state[Namespace.Ingredients].openedIngredient;

export const getOrder = (state: StateType): OrdersApiResponse | null => state[Namespace.Ingredients].order;

export const getOrderSendStatus = (state: StateType): boolean => state[Namespace.Ingredients].orderSended;

export const getIngredientCount = (ingredient: Ingredient) => createSelector(
  [getSelectedIngredients],
  (selectedIngredients) => {
    const needle = selectedIngredients.filter((item) => item._id === ingredient._id);
    const needleCount = needle ? needle.length : 0;
    return needleCount && ingredient.type === 'bun' ? needleCount * 2 : needleCount;
  }
);

export const getIngredientById = (id: string) => createSelector(
  [getIngredients],
  (ingredients) => ingredients.find((ingredient) => ingredient._id === id)
);
