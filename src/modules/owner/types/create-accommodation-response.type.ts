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
  images?: { url: string; id: string }[];
  amenity?: CreateAccommodationAmenity;
  address?: CreateAccommodationAddress;
}

export interface UpdateAccommodationData<T> {
  id: string;
  data: T;
}

export interface UpdateAddressData {
  address: CreateAccommodationAddress;
}

export interface UpdateAmenityData {
  amenity: CreateAccommodationAmenity;
}

export interface UpdateImageData {
  images?: { url: string }[];
  coverImage?: string;
}
