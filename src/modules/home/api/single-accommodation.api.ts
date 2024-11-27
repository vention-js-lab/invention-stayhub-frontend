import { apiClient } from '#/shared/libs/api-client.lib';
import { useQuery } from '@tanstack/react-query';
import { type Accommodation } from '../types/accommodation.type';
import { type WithBaseResponse } from '#/shared/types/with-base-response.type';

export function useAccommodationQuery(id: string | undefined) {
  const accommodationQuery = useQuery({
    queryKey: ['accommodation', id],
    queryFn: async () => {
      const response = await apiClient.get<WithBaseResponse<Accommodation>>(`/accommodations/${id}`);

      return response.data.data;
    },
  });
  return accommodationQuery;
}
