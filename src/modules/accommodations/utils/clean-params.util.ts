import { type ListAccommodationQueryParams } from '#/modules/accommodations/schemas/list-accommodation-query-params.schema';

export function cleanParams(params: ListAccommodationQueryParams) {
  return Object.fromEntries(Object.entries(params).map(([key, value]) => [key, String(value)]));
}
