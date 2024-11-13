import { type Auth } from '#/modules/auth/login/types/auth.type';
import { getLocalUser } from '#/modules/auth/login/utils/get-local-user.util';

export const initialAuthState: Auth = {
  currentUser: getLocalUser(),
  status: 'idle',
  error: null,
};
