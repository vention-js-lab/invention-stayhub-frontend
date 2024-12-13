import { apiClient } from '#/shared/libs/api-client.lib';
import { type BaseResponse } from '#/shared/types/base-response.type';
import { useMutation } from '@tanstack/react-query';

interface UploadResponse {
  objectUrl: string;
}

export function useUploadImageMutation() {
  const mutation = useMutation<UploadResponse, Error, FormData>({
    mutationFn: async (formdata: FormData) => {
      const response = await apiClient.post<BaseResponse<UploadResponse>>('/uploads/image', formdata);
      return response.data.data;
    },
  });
  return mutation;
}
