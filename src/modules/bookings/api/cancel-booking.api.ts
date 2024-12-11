import { type BookingStatus } from './../constants/booking-status.constant';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';

interface BookingMutationData {
  bookingId: string;
  newStatus: BookingStatus;
}

export function useBookingMutation() {
  const mutation = useMutation<void, Error, BookingMutationData>({
    mutationFn: (data: BookingMutationData) => apiClient.put(`/bookings/${data.bookingId}`, data),
  });
  return mutation;
}
