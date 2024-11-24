import { useInfiniteQuery } from '@tanstack/react-query';
import { getAccommodations } from '../utils/get-accommodations.util';
import { getNextPageNumber } from '../utils/get-next-page-number.util';
import { type ListAccommodationQueryParams } from '../schemas/list-accommodation-query-params.schema';

export function useListAccommodationsQuery(limit: number, params: ListAccommodationQueryParams) {
  const listAccommodationsQuery = useInfiniteQuery({
    queryKey: ['accommodations', params, limit],
    queryFn: ({ pageParam }) => getAccommodations(pageParam, limit, params),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => getNextPageNumber(lastPage.metadata),
  });

  return listAccommodationsQuery;
}
