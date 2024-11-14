import { type Auth } from '#/shared/types/auth.type';
import { getLocalUser } from '#/modules/auth/utils/get-local-user.util';

export const initialAuthState: Auth = {
  currentUser: getLocalUser(),
  authStatus: 'pending',
};
