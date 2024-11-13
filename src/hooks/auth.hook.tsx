import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser, setError, setStatus } from '#/store/slices/auth-slice';
import { type StoreState } from '#/store/store';
import { type LoginResponse } from '../modules/auth/login/types/login-response.type';

export function useAuth() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: StoreState) => state.auth.currentUser);
  const status = useSelector((state: StoreState) => state.auth.status);
  const error = useSelector((state: StoreState) => state.auth.error);

  async function login(credentials: { email: string; password: string }) {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    dispatch(setStatus('pending'));

    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok && response.status === 401) {
        throw new Error('Invalid email or password');
      } else if (!response.ok) {
        throw new Error('Login failed. Please try again');
      }

      const responseJson: LoginResponse = await response.json();
      dispatch(
        setUser({
          accessToken: responseJson.accessToken,
          refreshToken: responseJson.refreshToken,
        })
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred while trying to log in. Please try again';
      dispatch(setError(errorMessage));
    }
  }

  function logout() {
    dispatch(clearUser());
  }

  return { currentUser, status, error, login, logout };
}
