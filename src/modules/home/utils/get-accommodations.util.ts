import { apiClient } from '#/shared/libs/api-client.lib';
import { type Accommodation } from '../types/accommodation.type';
import { type ListAccommodationQueryParams } from '../schemas/list-accommodation-query-params.schema';

export interface AccommodationListResponseDataMetadata {
  page: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  total: number;
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

export async function getAccommodations(pageParam: number, limit: number, params: ListAccommodationQueryParams) {
  const searchParams = new URLSearchParams(params).toString();

  const response = await apiClient.get<AccommodationListResponse>(
    `/accommodations?page=${pageParam}&limit=${limit}&${searchParams}`
  );

  return response.data.data;
}
