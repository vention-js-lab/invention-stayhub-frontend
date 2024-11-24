import { z } from 'zod';
import { AccommodationListSortBy } from '../constants/sort-by.constant';

export const listAccommodationQueryParamsSchema = z.object({
  sortBy: z.nativeEnum(AccommodationListSortBy).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export type ListAccommodationQueryParams = z.infer<typeof listAccommodationQueryParamsSchema>;
