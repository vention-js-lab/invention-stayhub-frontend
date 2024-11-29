import { type AmenityKey } from '#/modules/home/types/accommodation-amenity.type';
import { Icons } from './icons.constant';

export const amenitiesMap: Record<AmenityKey, { icon: React.ElementType; label: string }> = {
  hasWifi: { icon: Icons.Wifi, label: 'WiFi' },
  hasParking: { icon: Icons.Parking, label: 'Parking' },
  hasSwimmingPool: { icon: Icons.SwimmingPool, label: 'Swimming Pool' },
  hasPetAllowance: { icon: Icons.Pets, label: 'Pet Friendly' },
  hasBackyard: { icon: Icons.Backyard, label: 'Backyard' },
  hasSmokingAllowance: { icon: Icons.Smoking, label: 'Smoking Allowed' },
  hasHospitalNearby: { icon: Icons.Hospital, label: 'Hospital Nearby' },
  hasLaundryService: { icon: Icons.Laundry, label: 'Laundry Service' },
  hasKitchen: { icon: Icons.Kitchen, label: 'Kitchen' },
  hasAirConditioning: { icon: Icons.AirConditioning, label: 'Air Conditioning' },
  hasTv: { icon: Icons.TV, label: 'TV' },
  hasAirportTransfer: { icon: Icons.Airport, label: 'Airport Transfer' },
  isCloseToCenter: { icon: Icons.City, label: 'Close to Center' },
  isChildFriendly: { icon: Icons.ChildFriendly, label: 'Child Friendly' },
  isQuietArea: { icon: Icons.QuietArea, label: 'Quiet Area' },
};
