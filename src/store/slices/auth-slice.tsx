import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialAuthState } from '../initial/initial-auth';
import { type AuthStatus } from '#/shared/types/auth-status.type';
import { type CurrentUser } from '#/modules/auth/schemas/current-user.schema';

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setStatus(state, action: PayloadAction<AuthStatus>) {
      state.status = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<CurrentUser>) {
      state.currentUser = action.payload;
      state.status = 'success';
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.status = 'error';
    },
    clearUser(state) {
      state.currentUser = null;
      state.error = null;
      state.status = 'idle';
    },
  },
});

export const { setCurrentUser, clearUser, setStatus, setError } = authSlice.actions;
export const authReducer = authSlice.reducer;
