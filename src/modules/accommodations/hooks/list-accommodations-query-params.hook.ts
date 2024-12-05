import { useSearchParams } from 'react-router-dom';
import {
  listAccommodationQueryParamsSchema,
  type ListAccommodationQueryParams,
} from '#/modules/accommodations/schemas/list-accommodation-query-params.schema';

export function useListAccommodationQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const validatedQueryParams = listAccommodationQueryParamsSchema
    .transform((data) => {
      return {
        ...data,
      };
    })
    .catch(() => listAccommodationQueryParamsSchema.parse({}))
    .parse(Object.fromEntries(searchParams));

  function setQueryParams(newParams: ListAccommodationQueryParams) {
    const updatedParams = {
      ...Object.fromEntries(searchParams),
      ...Object.fromEntries(
        Object.entries(newParams)
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
      ),
    };
    setSearchParams(updatedParams);
  }

  return { validatedQueryParams, setQueryParams };
}
