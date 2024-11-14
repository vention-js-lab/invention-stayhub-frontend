import { type CurrentUser } from '#/modules/auth/schemas/current-user.schema';
import { type AuthStatus } from './auth-status.type';

export interface Auth {
  currentUser: CurrentUser | null;
  status: AuthStatus;
  error: string | null;
}
