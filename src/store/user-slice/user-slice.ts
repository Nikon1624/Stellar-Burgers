import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../types/state';
import { Namespace } from '../../consts';
import { login, register, forgotPassword, checkUser, updateUser, logout } from './actions';
import { toast } from 'react-toastify';

const initialState: UserState = {
  user: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: Namespace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        toast.error(action.payload, {
          theme: 'dark',
        });
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        toast.error(action.payload, {
          theme: 'dark',
        });
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        toast.error(action.payload, {
          theme: 'dark',
        });
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        toast.error(action.payload, {
          theme: 'dark',
        });
      })
      .addCase(checkUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(checkUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.user = null;
        toast.error(action.payload, {
          theme: 'dark',
        });
      });
  },
});
