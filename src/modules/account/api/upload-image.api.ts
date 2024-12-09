import { apiClient } from '#/shared/libs/api-client.lib';
import { useMutation } from '@tanstack/react-query';

interface UploadResponse {
  url: string;
}

export function useUploadImageMutation() {
  const mutation = useMutation<UploadResponse, Error, FormData>({
    mutationFn: async (formdata: FormData) => {
      const response = await apiClient.post<UploadResponse>('/upload/image', formdata);
      return response.data;
    },
  });
  return { mutation };
}
