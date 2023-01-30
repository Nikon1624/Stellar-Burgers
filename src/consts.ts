export type ColorType = 'secondary' | 'primary' | 'error' | 'success';

export enum IngredientsMap {
  bun = 'Булки',
  sauce = 'Соусы',
  main = 'Начинки',
}

export enum Namespace {
  Ingredients = 'INGREDIENTS',
}

export enum DnDTypes {
  Ingredients = 'INGREDIENTS',
  ConstructorIngredients = 'CONSTRUCTOR_INGREDIENTS',
}

export const API_BASE_URL = 'https://norma.nomoreparties.space/api';
