import { apiClient } from '#/shared/libs/api-client.lib';
import { type Profile } from '#/shared/types/profile.type';
import { type BaseResponse } from '#/shared/types/base-response.type';
import { useQuery } from '@tanstack/react-query';

export function useProfileQuery() {
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await apiClient.get<BaseResponse<Profile>>(`/users/profile`);
      return response.data.data;
    },
  });
  return profileQuery;
}
