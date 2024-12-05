import { type AccommodationListSortBy } from '#/modules/accommodations/constants/sort-by.constant';
import { type SortOrder } from '#/shared/constants/sort-order.constant';

export interface AccommodationFilterParams {
  sortBy?: AccommodationListSortBy;
  sortOrder?: SortOrder;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  street?: string;
  city?: string;
  country?: string;
  available?: boolean;
  availableFrom?: string;
  availableTo?: string;
  rooms?: number;
  hasWifi?: boolean;
  hasParking?: boolean;
  hasSwimmingPool?: boolean;
  hasPetAllowance?: boolean;
  hasBackyard?: boolean;
  hasSmokingAllowance?: boolean;
  hasHospitalNearby?: boolean;
  hasLaundryService?: boolean;
  hasKitchen?: boolean;
  hasAirConditioning?: boolean;
  hasTv?: boolean;
  hasAirportTransfer?: boolean;
  isCloseToCenter?: boolean;
  isChildFriendly?: boolean;
  isQuietArea?: boolean;
}
