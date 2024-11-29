export interface AccommodationAmenity {
  id: string;
  hasWifi: boolean;
  hasParking: boolean;
  hasSwimmingPool: boolean;
  hasPetAllowance: boolean;
  hasBackyard: boolean;
  hasSmokingAllowance: boolean;
  hasHospitalNearby: boolean;
  hasLaundryService: boolean;
  hasKitchen: boolean;
  hasAirConditioning: boolean;
  hasTv: boolean;
  hasAirportTransfer: boolean;
  isCloseToCenter: boolean;
  isChildFriendly: boolean;
  isQuietArea: boolean;
  createdAt: string;
  updatedAt: string;
  accommodationId: string;
}

export type AmenityKey =
  | 'hasWifi'
  | 'hasParking'
  | 'hasSwimmingPool'
  | 'hasPetAllowance'
  | 'hasBackyard'
  | 'hasSmokingAllowance'
  | 'hasHospitalNearby'
  | 'hasLaundryService'
  | 'hasKitchen'
  | 'hasAirConditioning'
  | 'hasTv'
  | 'hasAirportTransfer'
  | 'isCloseToCenter'
  | 'isChildFriendly'
  | 'isQuietArea';
