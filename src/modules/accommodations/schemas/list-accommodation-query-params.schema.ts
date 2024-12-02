import { z } from 'zod';
import { AccommodationListSortBy } from '../constants/sort-by.constant';

export const listAccommodationQueryParamsSchema = z.object({
  sortBy: z.nativeEnum(AccommodationListSortBy).optional(),
  sortOrder: z.preprocess(
    (value) => (typeof value === 'string' ? value.toUpperCase() : value),
    z.enum(['ASC', 'DESC']).optional()
  ),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  rooms: z.string().optional(),
  hasWifi: z.string().optional(),
  hasParking: z.string().optional(),
  hasSwimmingPool: z.string().optional(),
  hasPetAllowance: z.string().optional(),
  hasBackyard: z.string().optional(),
  hasSmokingAllowance: z.string().optional(),
  hasHospitalNearby: z.string().optional(),
  hasLaundryService: z.string().optional(),
  hasKitchen: z.string().optional(),
  hasAirConditioning: z.string().optional(),
  hasTv: z.string().optional(),
  hasAirportTransfer: z.string().optional(),
  isCloseToCenter: z.string().optional(),
  isChildFriendly: z.string().optional(),
  isQuietArea: z.string().optional(),
});

export type ListAccommodationQueryParams = z.infer<typeof listAccommodationQueryParamsSchema>;
