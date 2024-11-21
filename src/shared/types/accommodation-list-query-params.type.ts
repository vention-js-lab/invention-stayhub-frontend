import { type SortByQueryParamValues } from './sort-by-query-param-values';

export interface AccommodationListQueryParams {
  page?: number;
  limit?: number;
  sortBy?: SortByQueryParamValues;
  sortOrder?: 'ASC' | 'DESC';
}
