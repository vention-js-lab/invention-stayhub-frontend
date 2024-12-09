import { useMutation } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { type RegisterFormData } from '../schemas/register-form.schema';
import { type BaseResponse } from '#/shared/types/base-response.type';

export function useRegisterMutation() {
  const mutation = useMutation<BaseResponse<null>, Error, RegisterFormData>({
    mutationFn: async (data: RegisterFormData) => {
      const response = await apiClient.post<BaseResponse<null>>('auth/register', data);
      return response.data;
    },
  });

  return mutation;
}
