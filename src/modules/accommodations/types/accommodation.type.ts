import { type AccommodationAddress } from './accommodation-address.type';
import { type AccommodationAmenity } from './accommodation-amenity.type';
import { type AccommodationImage } from './accommodation-image.type';

export interface Booking {
  startDate: string;
  endDate: string;
  status: string;
}

export interface Accommodation {
  id: string;
  name: string;
  description: string;
  coverImage: string | null;
  price: number;
  available: boolean;
  availableFrom: string | null;
  availableTo: string | null;
  squareMeters: number | null;
  numberOfRooms: number | null;
  allowedNumberOfPeople: number | null;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  address: AccommodationAddress | null;
  amenity: AccommodationAmenity | null;
  images: AccommodationImage[] | null;
  bookings: Booking[];

  deletedAt: string | null;
}
