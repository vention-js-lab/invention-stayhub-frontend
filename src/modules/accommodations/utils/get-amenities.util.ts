import { type AmenityKey, type AccommodationAmenity } from '#/shared/constants/accommodation-amenity.type';
import { t } from 'i18next';

export function getAmenities(
  amenities: AccommodationAmenity,
  amenitiesMap: Record<string, { icon: React.ElementType; label: string }>
) {
  return (Object.keys(amenities) as AmenityKey[])
    .filter((key) => key in amenitiesMap && amenities[key])
    .map((key) => ({
      icon: amenitiesMap[key].icon,
      label: t(`amenities.${key}`),
    }));
}
