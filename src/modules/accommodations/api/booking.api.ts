import { apiClient } from '#/shared/libs/api-client.lib';

export interface CreateBookingPayload {
  accommodationId: string;
  startDate: string;
  endDate: string;
  guests: number;
}

export async function createBooking(payload: CreateBookingPayload): Promise<void> {
  await apiClient.post('/bookings', payload);
}
