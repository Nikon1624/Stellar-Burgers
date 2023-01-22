import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../consts';
import { ingredientsSlice } from './ingredients-slice/ingredients-slice';

export const rootReducer = combineReducers({
  [Namespace.Ingredients]: ingredientsSlice.reducer,
});
