import axios from 'axios';
import { apiClient } from '../libs/api-client.lib';
import { useAuth } from './auth.hook';

export function useApiClient() {
  const { currentUser } = useAuth();

  const authorizedApiClient = axios.create({
    ...apiClient.defaults,
    headers: {
      ...apiClient.defaults.headers,
      Authorization: currentUser?.accessToken ? `Bearer ${currentUser.accessToken}` : undefined,
    },
  });

  return {
    publicApiClient: apiClient,
    privateApiClient: authorizedApiClient,
  };
}
