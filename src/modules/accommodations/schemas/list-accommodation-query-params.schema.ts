import { z } from 'zod';
import { AccommodationListSortBy } from '../constants/sort-by.constant';

export const listAccommodationQueryParamsSchema = z.object({
  sortBy: z.nativeEnum(AccommodationListSortBy).optional(),
  sortOrder: z.preprocess(
    (value) => (typeof value === 'string' ? value.toUpperCase() : value),
    z.enum(['ASC', 'DESC']).optional()
  ),
});

export type ListAccommodationQueryParams = z.infer<typeof listAccommodationQueryParamsSchema>;
