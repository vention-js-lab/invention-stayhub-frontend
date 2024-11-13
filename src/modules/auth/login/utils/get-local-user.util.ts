import { type CurrentUser } from '../types/current-user.type';

export function getLocalUser() {
  const localUser = localStorage.getItem('tokens');

  if (!localUser) {
    return null;
  }

  return JSON.parse(localUser) as CurrentUser;
}
