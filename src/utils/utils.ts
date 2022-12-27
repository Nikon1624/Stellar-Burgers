import { Ingredient, IngredientTypes } from '../types/ingredient';

export const getIngredientTypes = (ingredients: Ingredient[]): IngredientTypes[] => {
  const set = new Set();

  const uniqTypes = ingredients.reduce((acc, ingredient) => {
    acc.add(ingredient.type);
    return acc;
  }, set);

  return Array.from(uniqTypes) as IngredientTypes[];
};
