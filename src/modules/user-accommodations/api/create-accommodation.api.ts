import { type AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { type CreateAccommodation } from '../schemas/create-accommodation.schema';
import { apiClient } from '#/shared/libs/api-client.lib';

export function useCreateAccommodationMutation() {
  const createAccommodationMutation = useMutation<void, AxiosError, CreateAccommodation>({
    mutationFn: (data: CreateAccommodation) => apiClient.post('/accommodations', data),
  });

  return { createAccommodationMutation };
}
