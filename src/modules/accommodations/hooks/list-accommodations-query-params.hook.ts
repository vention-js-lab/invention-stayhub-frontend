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
          .filter(([_, value]: [string, string | number | boolean | undefined]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
      ),
    };
    setSearchParams(updatedParams);
  }

  return { validatedQueryParams, setQueryParams };
}
