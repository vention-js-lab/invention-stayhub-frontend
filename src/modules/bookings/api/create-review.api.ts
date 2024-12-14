import { useMutation } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { type AxiosError } from 'axios';
import { type ReviewFormData } from '../schemas/review-form.schema';
import { type BaseResponse } from '#/shared/types/base-response.type';

interface ReviewResponseData {
  content: string | null;
  rating: number;
  bookingId: string;
}

interface ReviewTypeData {
  bookingId: string;
  review: ReviewFormData;
}

export function useReviewMutation() {
  const reviewMutation = useMutation<ReviewResponseData, AxiosError, ReviewTypeData>({
    mutationFn: async ({ review, bookingId }) => {
      const response = await apiClient.post<BaseResponse<ReviewResponseData>>(`/reviews`, { ...review, bookingId });
      return response.data.data;
    },
  });

  return reviewMutation;
}
