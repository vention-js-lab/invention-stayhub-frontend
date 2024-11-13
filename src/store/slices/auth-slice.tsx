import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialAuthState } from '../initial/initial-auth';
import { type AuthStatus } from '#/modules/auth/login/types/auth-status.type';
import { type CurrentUser } from '#/modules/auth/login/types/current-user.type';

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setStatus(state, action: PayloadAction<AuthStatus>) {
      state.status = action.payload;
    },
    setUser(state, action: PayloadAction<CurrentUser>) {
      state.currentUser = action.payload;
      state.status = 'success';
      localStorage.setItem('tokens', JSON.stringify(action.payload));
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = 'failed';
    },
    clearUser(state) {
      localStorage.removeItem('tokens');
      state.currentUser = null;
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { setUser, clearUser, setStatus, setError } = authSlice.actions;
export const authReducer = authSlice.reducer;
