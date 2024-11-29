import { type AmenityKey, type AccommodationAmenity } from '#/modules/home/types/accommodation-amenity.type';

export function getAmenities(
  amenities: AccommodationAmenity,
  amenitiesMap: Record<string, { icon: React.ElementType; label: string }>
) {
  return (Object.keys(amenities) as AmenityKey[])
    .filter((key) => key in amenitiesMap && amenities[key])
    .map((key) => ({
      icon: amenitiesMap[key].icon,
      label: amenitiesMap[key].label,
    }));
}
