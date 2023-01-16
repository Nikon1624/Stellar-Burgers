import { createContext } from 'react';
import { Ingredient } from '../types/ingredient';

export const IngredientsContext = createContext<Ingredient[]>([]);
