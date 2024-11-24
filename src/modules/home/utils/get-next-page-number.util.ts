import { type AccommodationListResponseDataMetadata } from './get-accommodations.util';

export function getNextPageNumber(metadata: AccommodationListResponseDataMetadata) {
  if (!metadata.hasNextPage) {
    return undefined;
  }

  return metadata.page + 1;
}
