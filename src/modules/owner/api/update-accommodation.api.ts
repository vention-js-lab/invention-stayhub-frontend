import { apiClient } from '#/shared/libs/api-client.lib';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { type CreateAccommodationAddress } from '../schemas/accommodation-address.schema';
import { type CreateAccommodationResponse } from '../types/create-accommodation-response.type';

export function useUpdateAccommodationMutation() {
  const updateAccommodationMutation = useMutation<
    CreateAccommodationResponse,
    AxiosError,
    { id: string; data: CreateAccommodationAddress }
  >({
    mutationFn: async ({ id, data }) => {
      const requestData = {
        address: {
          street: data.street,
          city: data.city,
          country: data.country,
          zipCode: data.zipCode,
          latitude: data.latitude,
          longitude: data.longitude,
        },
      };
      const res = await apiClient.patch<CreateAccommodationResponse>(`/accommodations/${id}`, requestData);
      return res.data;
    },
  });

  return updateAccommodationMutation;
}
