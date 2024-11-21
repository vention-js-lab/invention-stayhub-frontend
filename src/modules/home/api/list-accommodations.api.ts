import { useQuery } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { useSearchParams } from 'react-router-dom';
import { type AccommodationListQueryParams } from '#/modules/home/types/accommodation-list-query-params.type';
import { type AccommodationListResponse } from '../types/accommodation-list.res.type';

export function useListAccommodationsQuery(page: number, limit: number) {
  const [searchParams, setSearchParams] = useSearchParams();

  function setQueryParams(queryParams: AccommodationListQueryParams) {
    setSearchParams({ ...Object.fromEntries(Object.entries(queryParams)) });
  }

  const listAccommodationsQuery = useQuery({
    queryKey: ['list-accommodations', page, limit, searchParams],
    queryFn: async () => {
      try {
        const response = await apiClient.get<AccommodationListResponse>(
          `/accommodations?page=${page}&limit=${limit}&${searchParams}`
        );
        return response.data.data;
      } catch {
        return undefined;
      }
    },
  });

  return { ...listAccommodationsQuery, setQueryParams };
}
