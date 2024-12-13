import { apiClient } from '#/shared/libs/api-client.lib';
import { useQuery } from '@tanstack/react-query';
import { type BaseResponse } from '#/shared/types/base-response.type';
import { type CreateAccommodationResponse } from '../types/create-accommodation-response.type';

export function useAccommodationDetailsQuery(id: string | null) {
  const createdAccommodationQuery = useQuery({
    queryKey: ['created-accommodation', id],
    queryFn: async () => {
      const response = await apiClient.get<BaseResponse<CreateAccommodationResponse>>(`/accommodations/${id}`);

      return response.data.data;
    },
  });

  return createdAccommodationQuery;
}
