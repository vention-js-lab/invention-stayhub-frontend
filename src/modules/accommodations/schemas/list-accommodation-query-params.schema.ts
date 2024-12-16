import { SortOrder } from '#/shared/constants/sort-order.constant';
import { z } from 'zod';
import { AccommodationListSortBy } from '../constants/sort-by.constant';

const toOptionalNumber = () => z.preprocess((value) => (value !== undefined ? Number(value) : undefined), z.number().optional());
const toOptionalBoolean = () =>
  z.preprocess((value) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return undefined;
  }, z.boolean().optional());

export const listAccommodationQueryParamsSchema = z.object({
  sortBy: z.nativeEnum(AccommodationListSortBy).optional(),
  sortOrder: z.preprocess(
    (value) => (typeof value === 'string' ? value.toUpperCase() : value),
    z.enum([SortOrder.Asc, SortOrder.Desc]).optional()
  ),
  search: z.string().optional(),
  availableFrom: z.string().date().optional(),
  availableTo: z.string().date().optional(),
  minPrice: toOptionalNumber(),
  maxPrice: toOptionalNumber(),
  rooms: toOptionalNumber(),
  hasWifi: toOptionalBoolean(),
  hasParking: toOptionalBoolean(),
  hasSwimmingPool: toOptionalBoolean(),
  hasPetAllowance: toOptionalBoolean(),
  hasBackyard: toOptionalBoolean(),
  hasSmokingAllowance: toOptionalBoolean(),
  hasHospitalNearby: toOptionalBoolean(),
  hasLaundryService: toOptionalBoolean(),
  hasKitchen: toOptionalBoolean(),
  hasAirConditioning: toOptionalBoolean(),
  hasTv: toOptionalBoolean(),
  hasAirportTransfer: toOptionalBoolean(),
  isCloseToCenter: toOptionalBoolean(),
  isChildFriendly: toOptionalBoolean(),
  isQuietArea: toOptionalBoolean(),
  category: z.string().optional(),
});

export type ListAccommodationQueryParams = z.infer<typeof listAccommodationQueryParamsSchema>;
