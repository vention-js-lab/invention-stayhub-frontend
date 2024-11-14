import { jwtDecode } from 'jwt-decode';

export function isJwt(token: string) {
  try {
    const decoded = jwtDecode(token);
    return Boolean(decoded);
  } catch {
    return false;
  }
}
