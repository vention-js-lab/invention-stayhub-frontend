import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialAuthState } from '../initial/initial-auth';
import { type AuthStatus } from '#/shared/types/auth-status.type';
import { type CurrentUser } from '#/modules/auth/schemas/current-user.schema';

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setAuthStatus(state, action: PayloadAction<AuthStatus>) {
      state.authStatus = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<CurrentUser>) {
      state.currentUser = action.payload;
      state.authStatus = 'authenticated';
    },
    clearCurrentUser(state) {
      state.currentUser = null;
      state.authStatus = 'guest';
    },
  },
});

export const { setAuthStatus, setCurrentUser, clearCurrentUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
