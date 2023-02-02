export type ColorType = 'secondary' | 'primary' | 'error' | 'success';

export enum IngredientsMap {
  bun = 'Булки',
  sauce = 'Соусы',
  main = 'Начинки',
}

export enum Namespace {
  Ingredients = 'INGREDIENTS',
  User = 'USER',
}

export enum DnDTypes {
  Ingredients = 'INGREDIENTS',
  ConstructorIngredients = 'CONSTRUCTOR_INGREDIENTS',
}

export enum AppRoute {
  MainPage = '/',
  LoginPage = '/login',
  RegisterPage = '/register',
  ForgotPasswordPage = '/forgot-password',
  ResetPasswordPage = '/reset-password',
  ProfilePage = '/profile',
  ProfileOrders = '/profile/orders',
  IngredientPage = '/ingredients/:id',
  OrderFeed = '/order-feed',
}

export enum LocalStorageKeys {
  RefreshToken = 'r_token',
  AccessToken = 'a_token',
}

export const API_BASE_URL = 'https://norma.nomoreparties.space/api';
