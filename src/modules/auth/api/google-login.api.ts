import { useMutation } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { type AxiosError } from 'axios';
import { type BaseResponse } from '#/shared/types/base-response.type';

interface GoogleUser {
  email: string;
  firstName: string;
  lastName?: string;
  picture?: string;
  googleId?: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export function useGoogleLoginMutation() {
  const googleLoginMutation = useMutation<LoginResponse, AxiosError, GoogleUser>({
    mutationFn: async (credentials) => {
      const response = await apiClient.post<BaseResponse<LoginResponse>>('/auth/google/redirect', credentials);
      return response.data.data;
    },
  });

  return googleLoginMutation;
}
