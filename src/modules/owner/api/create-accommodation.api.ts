import { type AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { type CreateAccommodation } from '../schemas/create-accommodation.schema';
import { type CreateAccommodationResponse } from '../types/create-accommodation-response.type';
import { type BaseResponse } from '#/shared/types/base-response.type';

export function useCreateAccommodationMutation() {
  const createAccommodationMutation = useMutation<BaseResponse<CreateAccommodationResponse>, AxiosError, CreateAccommodation>({
    mutationFn: (data: CreateAccommodation) =>
      apiClient.post<BaseResponse<CreateAccommodationResponse>>('/accommodations', data).then((res) => res.data),
  });

  return createAccommodationMutation;
}
