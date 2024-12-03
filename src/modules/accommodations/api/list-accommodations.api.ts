import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { getNextPageNumber } from '../utils/pagination.util';
import { type Accommodation } from '../types/accommodation.type';
import { type ListAccommodationQueryParams } from '../schemas/list-accommodation-query-params.schema';
import { type AccommodationListResponseDataMetadata } from '../types/accommodation-list-metadata.type';

export function useListAccommodationsQuery(limit: number, params: ListAccommodationQueryParams) {
  const listAccommodationsQuery = useInfiniteQuery({
    queryKey: ['accommodations', params, limit],
    queryFn: ({ pageParam }) => getAccommodations(pageParam, limit, params),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => getNextPageNumber(lastPage.metadata),
  });

  return listAccommodationsQuery;
}

interface AccommodationListResponseData {
  result: Accommodation[];
  metadata: AccommodationListResponseDataMetadata;
}

interface AccommodationListResponse {
  status: number;
  message: string;
  data: AccommodationListResponseData;
}

async function getAccommodations(pageParam: number, limit: number, params: ListAccommodationQueryParams) {
  const searchParams = new URLSearchParams(JSON.stringify(params)).toString();

  const response = await apiClient.get<AccommodationListResponse>(
    `/accommodations?page=${pageParam}&limit=${limit}&${searchParams}`
  );

  return response.data.data;
}
