import { apiClient } from '#/shared/libs/api-client.lib';
import { useQuery } from '@tanstack/react-query';
import { type Accommodation } from '#/modules/accommodations/types/accommodation.type';
import { type WithBaseResponse } from '#/shared/types/with-base-response.type';

export function useSingleAccommodationQuery(id: string | undefined) {
  const singleAccommodationQuery = useQuery({
    queryKey: ['single-accommodation', id],
    queryFn: async () => {
      const response = await apiClient.get<WithBaseResponse<Accommodation>>(`/accommodations/${id}`);

      return response.data.data;
    },
  });

  return singleAccommodationQuery;
}
