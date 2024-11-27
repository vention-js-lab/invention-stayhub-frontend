import { useSearchParams } from 'react-router-dom';
import {
  listAccommodationQueryParamsSchema,
  type ListAccommodationQueryParams,
} from '#/modules/home/schemas/list-accommodation-query-params.schema';

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
    const updatedParams = { ...Object.fromEntries(searchParams), ...newParams };
    setSearchParams(updatedParams);
  }

  return { validatedQueryParams, setQueryParams };
}
