import { type AccommodationAddress } from './accommodation-address.type';
import { type AccommodationAmenity } from './accommodation-amenity.type';
import { type AccommodationImage } from './accommodation-image.type';

export interface Accommodation {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  price: number;
  available: boolean;
  availableFrom: string;
  availableTo: string;
  squareMeters: number;
  numberOfRooms: number;
  allowedNumberOfPeople: number;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  address: AccommodationAddress;
  amenity: AccommodationAmenity;
  images: AccommodationImage[];
}
