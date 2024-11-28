import { useMutation } from '@tanstack/react-query';
import { useApiClient } from '#/shared/hooks/api-client.hook';
import { type BaseResponse } from '#/shared/types/base-response.type';
import { type WishlistItem } from '../types/wishlist-item.type';
import { type AxiosInstance } from 'axios';

interface MutationData {
  accommodationId: string;
}

interface MutationParams {
  action: 'add' | 'remove';
  data: MutationData;
}

export function useWishlistMutation() {
  const { privateApiClient } = useApiClient();

  const wishlistMutation = useMutation({
    mutationFn: async ({ action, data }: MutationParams) => {
      return action === 'add' ? await addToWishlist(privateApiClient, data) : await removeFromWishlist(privateApiClient, data);
    },
  });

  return { wishlistMutation };
}

async function addToWishlist(apiClient: AxiosInstance, data: MutationData) {
  const response = await apiClient.post<BaseResponse<WishlistItem>>('/wishlists', data);
  return response.data.data;
}

async function removeFromWishlist(apiClient: AxiosInstance, data: MutationData) {
  const response = await apiClient.delete<BaseResponse<null>>(`/wishlists/${data.accommodationId}`);
  return response.data.data;
}
