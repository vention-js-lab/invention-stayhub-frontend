import { useQuery } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { type BaseResponse } from '#/shared/types/base-response.type';
import { type CategorizedBookings } from '../types/categorized-bookings.type';

export function useBookingsQuery() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const response = await apiClient.get<BaseResponse<CategorizedBookings>>('/bookings');
      return response.data.data;
    },
  });
}
