import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, clearUser, setError, setStatus } from '#/store/slices/auth-slice';
import { useLoginMutation } from '#/modules/auth/api/login.api';
import { parseLoginError } from '#/modules/auth/utils/login-error-parser.util';
import { type StoreState } from '#/store/store';
import { type LoginFormData } from '#/modules/auth/schemas/login-form.schema';
import { useEffect } from 'react';
import { getLocalUser } from '#/modules/auth/utils/get-local-user.util';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: StoreState) => state.auth.currentUser);
  const status = useSelector((state: StoreState) => state.auth.status);
  const error = useSelector((state: StoreState) => state.auth.error);
  const { loginMutation } = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = getLocalUser();

    if (localUser) {
      dispatch(setCurrentUser(localUser));
      dispatch(setStatus('success'));
    } else {
      dispatch(setStatus('idle'));
    }
  }, [dispatch]);

  function login(credentials: LoginFormData) {
    dispatch(setError(null));
    dispatch(setStatus('pending'));

    loginMutation.mutate(credentials, {
      onSuccess: (data) => {
        const user = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };

        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setCurrentUser(user));
        dispatch(setStatus('success'));

        navigate('/');
      },
      onError: (err) => {
        const errorMessage = parseLoginError(err);
        dispatch(setError(errorMessage));
        dispatch(setStatus('error'));
      },
    });
  }

  function logout() {
    localStorage.removeItem('user');
    dispatch(clearUser());
    dispatch(setError(null));
    dispatch(setStatus('idle'));
  }

  return { currentUser, status, error, login, logout };
}
