import { apiClient } from '#/shared/libs/api-client.lib';
import { type BaseResponse } from '#/shared/types/base-response.type';
import { useQuery } from '@tanstack/react-query';
import { type OwnerDetails } from '../types/create-accommodation-response.type';

export function useOwnerDetailsQuery(ownerId: string | undefined) {
  const ownerDetailsQuery = useQuery({
    queryKey: ['owner-details', ownerId],
    queryFn: async () => {
      if (!ownerId) return null;

      const response = await apiClient.get<BaseResponse<OwnerDetails>>(`/users/profile/${ownerId}`);

      return response.data.data;
    },
    enabled: Boolean(ownerId),
  });

  return ownerDetailsQuery;
}
