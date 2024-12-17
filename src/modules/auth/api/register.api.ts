import { useMutation } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { type RegisterFormData } from '../schemas/register-form.schema';
import { type BaseResponse } from '#/shared/types/base-response.type';
import { type AxiosError } from 'axios';

interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
}

export function useRegisterMutation() {
  const mutation = useMutation<BaseResponse<RegisterResponse>, AxiosError, RegisterFormData>({
    mutationFn: async (data: RegisterFormData) => {
      const response = await apiClient.post<BaseResponse<RegisterResponse>>('auth/register', data);
      return response.data;
    },
  });

  return mutation;
}
