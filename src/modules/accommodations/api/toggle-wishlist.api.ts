import { useMutation } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { type BaseResponse } from '#/shared/types/base-response.type';
import { type WishlistItem } from '#/shared/types/wishlist.type';

interface MutationData {
  accommodationId: string;
}

interface MutationParams {
  action: 'add' | 'remove';
  data: MutationData;
}

export function useWishlistMutation() {
  const wishlistMutation = useMutation({
    mutationFn: async ({ action, data }: MutationParams) => {
      return action === 'add' ? await addToWishlist(data) : await removeFromWishlist(data);
    },
  });

  return { wishlistMutation };
}

async function addToWishlist(data: MutationData) {
  const response = await apiClient.post<BaseResponse<WishlistItem>>('/wishlists', data);
  return response.data;
}

async function removeFromWishlist(data: MutationData) {
  const response = await apiClient.delete<BaseResponse<null>>(`/wishlists/${data.accommodationId}`);
  return response.data;
}
