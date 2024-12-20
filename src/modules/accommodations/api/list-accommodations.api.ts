import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { getNextPageNumber } from '../utils/pagination.util';
import { type Accommodation } from '../types/accommodation.type';
import { type ListAccommodationQueryParams } from '../schemas/list-accommodation-query-params.schema';
import { type AccommodationListResponseDataMetadata } from '../types/accommodation-list-metadata.type';
import { type BaseResponse } from '#/shared/types/base-response.type';

export function useListAccommodationsQuery(limit: number, params: ListAccommodationQueryParams, showOwnOnly: boolean = false) {
  const listAccommodationsQuery = useInfiniteQuery({
    queryKey: ['accommodations', params, limit, showOwnOnly],
    queryFn: ({ pageParam }) => getAccommodations(pageParam, limit, params, showOwnOnly),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => getNextPageNumber(lastPage.metadata),
  });

  return listAccommodationsQuery;
}

interface AccommodationList {
  result: Accommodation[];
  metadata: AccommodationListResponseDataMetadata;
}

// eslint-disable-next-line max-params-no-constructor/max-params-no-constructor
async function getAccommodations(pageParam: number, limit: number, params: ListAccommodationQueryParams, showOwnOnly: boolean) {
  const stringifiedParams = Object.fromEntries(Object.entries(params).map(([key, value]) => [key, String(value)]));
  const searchParams = new URLSearchParams({
    ...stringifiedParams,
    showOwnAccommodationsOnly: String(showOwnOnly),
  }).toString();

  const response = await apiClient.get<BaseResponse<AccommodationList>>(
    `/accommodations?page=${pageParam}&limit=${limit}&${searchParams}`
  );

  return response.data.data;
}
