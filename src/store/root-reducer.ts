import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../consts';
import { ingredientsSlice } from './ingredients-slice/ingredients-slice';
import { userSlice } from './user-slice/user-slice';

export const rootReducer = combineReducers({
  [Namespace.Ingredients]: ingredientsSlice.reducer,
  [Namespace.User]: userSlice.reducer,
});
