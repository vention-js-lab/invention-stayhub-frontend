import { type AccommodationAddress } from '../types/accommodation-address.type';

export function parseAddress(address: AccommodationAddress | null | undefined) {
  if (!address) {
    return 'Address unavailable';
  }

  let fullAddress = '';

  if (address.city) {
    fullAddress += address.city;
  }

  if (address.city && address.country) {
    fullAddress += ', ';
  }

  if (address.country) {
    fullAddress += address.country;
  }

  return fullAddress;
}
