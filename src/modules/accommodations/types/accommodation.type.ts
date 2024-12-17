import { type AccommodationAddress } from './accommodation-address.type';
import { type AccommodationAmenity } from '../../../shared/constants/accommodation-amenity.type';
import { type AccommodationImage } from './accommodation-image.type';
import { type Booking } from './booking.type';
import { type Review } from './review.type';

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
  isSavedToWishlist: boolean;
  bookings: Booking[] | null;
  deletedAt: string | null;
  reviews: Review[] | null;
}
