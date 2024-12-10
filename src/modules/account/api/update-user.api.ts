import { useMutation } from '@tanstack/react-query';
import { type PersonalInfoData } from '../schemas/personal-info.schema';
import { apiClient } from '#/shared/libs/api-client.lib';

export function useUserUpdateMutation() {
  const mutation = useMutation<void, Error, PersonalInfoData>({
    mutationFn: (data: PersonalInfoData) => apiClient.put('/users/profile', data),
  });
  return mutation;
}
