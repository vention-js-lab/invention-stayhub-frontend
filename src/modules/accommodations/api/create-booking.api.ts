import { useMutation } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { type BaseResponse } from '#/shared/types/base-response.type';

export interface CreateBookingPayload {
  accommodationId: string;
  startDate: string;
  endDate: string;
  guests: number;
}

export interface Booking {
  id: string;
  accommodationId: string;
  startDate: string;
  endDate: string;
  guests: number;
  createdAt: string;
  updatedAt: string;
}

export function useCreateBookingMutation() {
  const createBookingMutation = useMutation<Booking, Error, CreateBookingPayload>({
    mutationFn: async (payload: CreateBookingPayload) => {
      const response = await apiClient.post<BaseResponse<Booking>>('/bookings', payload);
      return response.data.data;
    },
  });

  return createBookingMutation;
}
