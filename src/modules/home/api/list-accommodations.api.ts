import { useQuery } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { type Accommodation } from '../types/accommodation.type';

export function useListAccommodationsQuery(page: number, limit: number) {
  const accommodationsQuery = useQuery({
    queryKey: ['list-accommodations', page, limit],
    queryFn: async () => {
      const response = await apiClient.get<Accommodation[]>(`/accommodations?page=${page}&limit=${limit}`);
      return response.data;
    },
  });

  return accommodationsQuery;
}
