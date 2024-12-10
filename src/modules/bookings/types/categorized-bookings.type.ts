import { type BookingStatus } from '#/modules/bookings/constants/booking-status.constant';
import { type Booking } from './booking.type';

export type CategorizedBookings = {
  [key in BookingStatus]: Booking[];
};
