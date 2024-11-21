import { type Accommodation } from './accommodation.type';

interface Metadata {
  page: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  total: number;
}

export interface AccommodationListResponse {
  status: number;
  message: string;
  data: {
    result: Accommodation[];
    metadata: Metadata;
  };
}
