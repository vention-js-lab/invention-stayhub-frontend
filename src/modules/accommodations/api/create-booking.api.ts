import { useMutation } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';

export interface CreateBookingPayload {
  accommodationId: string;
  startDate: string;
  endDate: string;
  guests: number;
}

export interface CreateBookingResponse {
  success: boolean;
  message: string;
}

export function useCreateBookingMutation() {
  const createBookingMutation = useMutation<CreateBookingResponse, Error, CreateBookingPayload>({
    mutationFn: async (payload: CreateBookingPayload) => {
      const response = await apiClient.post<CreateBookingResponse>('/bookings', payload);
      return response.data;
    },
  });
  return createBookingMutation;
}
