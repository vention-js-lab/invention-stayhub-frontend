import { apiClient } from '#/shared/libs/api-client.lib';
import { useQuery } from '@tanstack/react-query';
import { type Accommodation } from '../types/accommodation.type';

export function useAccommodationQuery(id: string) {
  const accommodationQuery = useQuery({
    queryKey: ['accommodation', id],
    queryFn: async () => {
      const response = await apiClient.get<Accommodation>(`/accommodations/${id}`);

      return response.data;
    },
  });
  return accommodationQuery;
}
