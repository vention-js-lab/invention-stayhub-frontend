import { useSelector, useDispatch } from 'react-redux';
import { setAuthStatus, setCurrentUser, clearCurrentUser } from '#/store/slices/auth-slice';
import { useEffect } from 'react';
import { getLocalUser } from '#/modules/auth/utils/get-local-user.util';
import { deleteCookie, setCookie } from '../utils/cookie-helper.util';
import { jwtDecode } from 'jwt-decode';
import { type StoreState } from '#/store/store';
import { type CurrentUser } from '#/modules/auth/schemas/current-user.schema';
import { type DecodedToken } from '#/modules/auth/types/decoded-access-token.type';

export function useAuth() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: StoreState) => state.auth.currentUser);
  const authStatus = useSelector((state: StoreState) => state.auth.authStatus);

  useEffect(() => {
    dispatch(setAuthStatus('pending'));

    const localUser = getLocalUser();

    if (localUser) {
      dispatch(setCurrentUser(localUser));
      dispatch(setAuthStatus('authenticated'));
    } else {
      dispatch(setAuthStatus('guest'));
    }
  }, [dispatch]);

  function login(user: CurrentUser) {
    const decodedAccessToken = jwtDecode<DecodedToken>(user.accessToken);
    const accessTokenExpirationDate = new Date(decodedAccessToken.exp * 1000);
    setCookie('accessToken', user.accessToken, { expires: accessTokenExpirationDate });

    const decodedRefreshToken = jwtDecode<DecodedToken>(user.refreshToken);
    const refreshTokenExpirationDate = new Date(decodedRefreshToken.exp * 1000);
    setCookie('refreshToken', user.accessToken, { expires: refreshTokenExpirationDate });
  }

  function logout() {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    dispatch(clearCurrentUser());
    dispatch(setAuthStatus('guest'));
  }

  return { currentUser, authStatus, login, logout };
}
