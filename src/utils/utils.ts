import { Ingredient, IngredientTypes } from '../types/ingredient';
import axios, { AxiosError } from 'axios';

export const getIngredientTypes = (ingredients: Ingredient[]): IngredientTypes[] => {
  const set = new Set();

  const uniqTypes = ingredients.reduce((acc, ingredient) => {
    acc.add(ingredient.type);
    return acc;
  }, set);

  return Array.from(uniqTypes) as IngredientTypes[];
};


export const getElementType = (arr: Ingredient[], index: number)  => {
  switch (index) {
    case 0:
      return 'top';
    case arr.length - 1:
      return 'bottom';
    default:
      return undefined;
  }
};

export const calcPropValues = <T extends object, P extends keyof T>(arr: T[], prop: P ) => {
  return arr.reduce((acc, item) => {
    if (typeof item[prop] === 'number') {
      return acc += Number(item[prop]);
    }

    return acc;
  }, 0);
};

export const serializeToQueryParams = (obj: object): string => {
  return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
};

export const moveItem = <T>(arr: T[], itemIndex: number, positionIndex: number) => {
  const result = [...arr];
  const item = arr[itemIndex];

  result.splice(itemIndex, 1);
  result.splice(positionIndex, 0, item);

  return result;
};

type ServerError = {
  message: string;
  success: boolean;
};

export const handleApiError = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    const serverError = e as AxiosError<ServerError>;
    if (serverError && serverError.response) {
      return serverError.response?.data?.message || 'Произошла ошибка, попробуйте позже';
    }
  }

  return 'Произошла ошибка, попробуйте позже';
};
