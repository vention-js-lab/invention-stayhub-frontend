import { type AccommodationListResponseDataMetadata } from '../types/accommodation-list-metadata.type';

export function calculateInitialLimit(card: HTMLDivElement | null, limit: number) {
  if (card) {
    const cardHeight = card.clientHeight;
    const cardWidth = card.clientWidth;

    const itemsPerRow = Math.floor(window.innerWidth / cardWidth);
    const rowsRequired = Math.ceil(window.innerHeight / cardHeight);

    return itemsPerRow * rowsRequired * 2;
  }

  return limit;
}

export function getNextPageNumber(metadata: AccommodationListResponseDataMetadata) {
  if (!metadata.hasNextPage) {
    return undefined;
  }

  return metadata.page + 1;
}
