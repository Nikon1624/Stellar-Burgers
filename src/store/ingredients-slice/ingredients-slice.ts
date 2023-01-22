import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { IngredientsState } from '../../types/state';
import { Namespace } from '../../consts';
import { fetchIngredients, sendOrder } from './actions';
import { toast } from 'react-toastify';
import { Ingredient, IngredientWithUniqId } from '../../types/ingredient';

const initialState: IngredientsState = {
  ingredients: [],
  selectedIngredients: [],
  openedIngredient: null,
  order: null,
};

export const ingredientsSlice = createSlice({
  name: Namespace.Ingredients,
  initialState,
  reducers: {
    setOpenedIngredient: (state, action: PayloadAction<Ingredient | null>) => {
      state.openedIngredient = action.payload;
    },
    addSelectedIngredient: (state, action: PayloadAction<Ingredient>) => {
      if (action.payload.type === 'bun') {
        state.selectedIngredients = state.selectedIngredients.filter((item) => item.type !== 'bun');
      }
      state.selectedIngredients.push({ ...action.payload, uniqId: uuidv4() });
    },
    removeSelectedIngredient: (state, action: PayloadAction<IngredientWithUniqId>) => {
      state.selectedIngredients = state.selectedIngredients.filter((item) => item.uniqId !== action.payload.uniqId);
    },
    changeSelectedIngredients: (state, action: PayloadAction<IngredientWithUniqId[]>) => {
      const bun = state.selectedIngredients.filter((item) => item.type === 'bun');
      state.selectedIngredients = [...action.payload, ...bun];
},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, () => {
        toast.error('Произошла ошибка, попробуйте позже', {
          theme: 'dark',
        });
      })
      .addCase(sendOrder.pending, (state) => {
        state.order = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(sendOrder.rejected, () => {
        toast.error('Произошла ошибка, попробуйте позже', {
          theme: 'dark',
        });
      });
  },
});

export const {
  setOpenedIngredient,
  addSelectedIngredient,
  changeSelectedIngredients,
  removeSelectedIngredient,
} = ingredientsSlice.actions;
