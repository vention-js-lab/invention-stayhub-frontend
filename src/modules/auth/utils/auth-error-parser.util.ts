import { type AxiosError } from 'axios';

export function parseAuthError(error: AxiosError) {
  if (error.response) {
    return getStatusErrorMessage(error.response.status);
  }

  if (error.request) {
    return getNetworkErrorMessage();
  }

  return 'An unexpected error occurred. Please try again';
}

function getStatusErrorMessage(statusCode: number) {
  const statusMessages: { [key: number]: string } = {
    400: 'Something seems wrong with the data you provided. Please check your credentials and try again',
    401: 'Invalid email or password',
    500: 'An error occurred on our servers. Please try again later',
  };

  if (statusMessages[statusCode]) {
    return statusMessages[statusCode];
  }

  return `Failed to log in. Please try again`;
}

function getNetworkErrorMessage() {
  return 'Our servers are offline at the moment. Please try again later';
}
