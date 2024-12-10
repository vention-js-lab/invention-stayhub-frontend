import { useMutation } from '@tanstack/react-query';
import { type ProfileData } from '../schemas/profile.schema';
import { apiClient } from '#/shared/libs/api-client.lib';

export function useUserUpdateMutation() {
  const mutation = useMutation<void, Error, ProfileData>({
    mutationFn: (data: ProfileData) => apiClient.put('/users/profile', data),
  });
  return mutation;
}
