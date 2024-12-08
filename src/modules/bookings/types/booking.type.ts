import { type Accommodation } from '#/modules/accommodations/types/accommodation.type';

export interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  accountId: string;
  accommodationId: string | null;
  accommodation: Accommodation | null;
}
