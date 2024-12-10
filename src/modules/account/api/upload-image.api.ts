import { apiClient } from '#/shared/libs/api-client.lib';
import { type BaseResponse } from '#/shared/types/base-response.type';
import { useMutation } from '@tanstack/react-query';

export function useUploadImageMutation() {
  const mutation = useMutation<string, Error, FormData>({
    mutationFn: async (formdata: FormData) => {
      const response = await apiClient.post<BaseResponse<string>>('/uploads/image', formdata);
      return response.data.data;
    },
  });
  return mutation;
}
