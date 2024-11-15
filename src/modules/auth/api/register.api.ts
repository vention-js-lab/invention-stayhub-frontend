import { useMutation } from '@tanstack/react-query';

import { apiClient } from '#/shared/libs/api-client.lib';
import { type RegisterFormData } from '../schemas/register-form.schema';

export function useRegisterMutation() {
  const mutation = useMutation<void, Error, RegisterFormData>({
    mutationFn: (data: RegisterFormData) => apiClient.post('auth/register', data),
  });

  return { mutation };
}
