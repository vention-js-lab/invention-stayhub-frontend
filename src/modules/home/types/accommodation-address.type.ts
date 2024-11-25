export interface AccommodationAddress {
  id: string;
  street: string | null;
  city: string | null;
  country: string | null;
  zipCode: string | null;
  latitude: string | null;
  longitude: string | null;
  createdAt: string;
  updatedAt: string;
  accommodationId: string;
}
