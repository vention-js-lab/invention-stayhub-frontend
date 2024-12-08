import { type CreateAccommodationAmenity } from '../schemas/accommodation-amenity.schema';
import { type CreateAccommodationAddress } from './../schemas/accommodation-address.schema';

export interface CreateAccommodationResponse {
  id: string | null;
  name: string;
  description: string;
  coverImage: string;
  price: number;
  available: boolean;
  availableFrom: string | null;
  availableTo: string | null;
  squareMeters: number;
  numberOfRooms: number;
  allowedNumberOfPeople: number;
  images?: { url: string }[];
  amenity?: CreateAccommodationAmenity;
  address?: CreateAccommodationAddress;
}
