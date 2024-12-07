import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { getNextPageNumber } from '../utils/pagination.util';
import { type Accommodation } from '../types/accommodation.type';
import { type ListAccommodationQueryParams } from '../schemas/list-accommodation-query-params.schema';
import { type AccommodationListResponseDataMetadata } from '../types/accommodation-list-metadata.type';
import { type BaseResponse } from '#/shared/types/base-response.type';

export function useListAccommodationsQuery(limit: number, params: ListAccommodationQueryParams) {
  const listAccommodationsQuery = useInfiniteQuery({
    queryKey: ['accommodations', params, limit],
    queryFn: ({ pageParam }) => getAccommodations(pageParam, limit, params),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => getNextPageNumber(lastPage.metadata),
  });

  return listAccommodationsQuery;
}

interface AccommodationList {
  result: Accommodation[];
  metadata: AccommodationListResponseDataMetadata;
}

async function getAccommodations(pageParam: number, limit: number, params: ListAccommodationQueryParams) {
  const stringifiedParams = Object.fromEntries(Object.entries(params).map(([key, value]) => [key, String(value)]));
  const searchParams = new URLSearchParams(stringifiedParams).toString();

  const response = await apiClient.get<BaseResponse<AccommodationList>>(
    `/accommodations?page=${pageParam}&limit=${limit}&${searchParams}`
  );

  return response.data.data;
}
