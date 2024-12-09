import { apiClient } from '#/shared/libs/api-client.lib';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { type UpdateAccommodationData, type CreateAccommodationResponse } from '../types/create-accommodation-response.type';
import { type BaseResponse } from '#/shared/types/base-response.type';

export function useUpdateAccommodationMutation<T>() {
  const updateAccommodationMutation = useMutation<
    BaseResponse<CreateAccommodationResponse>,
    AxiosError,
    UpdateAccommodationData<T>
  >({
    mutationFn: async ({ id, data }) => {
      const res = await apiClient.patch<BaseResponse<CreateAccommodationResponse>>(`/accommodations/${id}`, data);
      return res.data;
    },
  });

  return updateAccommodationMutation;
}
