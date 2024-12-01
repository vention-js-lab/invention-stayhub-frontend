import { type Accommodation } from '#/modules/accommodations/types/accommodation.type';

export interface WishlistItem {
  accommodation: Accommodation;
  id: string;
  accountId: string;
  accommodationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MutationData {
  accommodationId: string;
}

export interface MutationParams {
  action: 'add' | 'remove';
  data: MutationData;
}
