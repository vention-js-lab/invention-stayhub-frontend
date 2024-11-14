interface CookieOptions {
  expires?: Date;
  path?: string;
}

export function setCookie(name: string, value: string, options: CookieOptions = {}) {
  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;

  if (options.expires) {
    cookieStr += `expires=${options.expires.toUTCString()};`;
  }

  cookieStr += `path=${options.path || '/'};`;

  document.cookie = cookieStr;
}

export function getCookie(name: string) {
  const cookies = document.cookie.split('; ');

  for (const cookie of cookies) {
    const [key, val] = cookie.split('=');

    if (key === encodeURIComponent(name)) {
      return decodeURIComponent(val);
    }
  }

  return null;
}

export function deleteCookie(name: string, path: string = '/') {
  setCookie(name, '', { expires: new Date(0), path });
}
