import { currentUserSchema } from '../schemas/current-user.schema';

export function getLocalUser() {
  const localUser = localStorage.getItem('user');

  if (!localUser) {
    return null;
  }

  const parsedLocalUser = JSON.parse(localUser);
  const validationResult = currentUserSchema.safeParse(parsedLocalUser);

  if (!validationResult.success) {
    return null;
  }

  return validationResult.data;
}
