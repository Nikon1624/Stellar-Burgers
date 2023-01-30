export type IngredientTypes = 'bun' | 'main' | 'sauce';

export type Ingredient = {
  _id: string;
  name: string;
  type: IngredientTypes;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type IngredientWithUniqId = Ingredient & { uniqId: string };

export type NormalizedIngredient = Record<IngredientTypes, Ingredient[]>;

export type IngredientsApiResponse = {
  data: Ingredient[];
  succsess: boolean;
};
