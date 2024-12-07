import { useMutation } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { type LoginFormData } from '../schemas/login-form.schema';
import { type AxiosError } from 'axios';
import { type LoginResponse } from '../types/login-response.type';
import { type BaseResponse } from '#/shared/types/base-response.type';

export function useLoginMutation() {
  const loginMutation = useMutation<LoginResponse, AxiosError, LoginFormData>({
    mutationFn: async (credentials) => {
      const response = await apiClient.post<BaseResponse<LoginResponse>>('/auth/login', credentials);
      return response.data.data;
    },
  });

  return loginMutation;
}
