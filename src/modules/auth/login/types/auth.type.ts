import { type AuthStatus } from './auth-status.type';
import { type CurrentUser } from './current-user.type';

export interface Auth {
  currentUser: CurrentUser | null;
  status: AuthStatus;
  error: string | null;
}
