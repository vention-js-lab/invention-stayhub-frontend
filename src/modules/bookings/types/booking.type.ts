import { type Accommodation } from '#/modules/accommodations/types/accommodation.type';
import { type BookingStatus } from '../constants/booking-status.constant';

export interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  accountId: string;
  accommodationId: string;
  accommodation: Accommodation;
}
