import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { type BaseResponse } from '#/shared/types/base-response.type';
import { type MutationData, type MutationParams, type WishlistItem } from '../types/wishlist.type';

const wishlistApi = {
  add: async (data: MutationData) => {
    const response = await apiClient.post<BaseResponse<WishlistItem>>('/wishlists', data);
    return response.data;
  },

  remove: async (data: MutationData) => {
    const response = await apiClient.delete<BaseResponse<null>>(`/wishlists/${data.accommodationId}`);
    return response.data;
  },

  fetch: async () => {
    const response = await apiClient.get<BaseResponse<WishlistItem[]>>('/wishlists');
    return response.data.data;
  },
};

export function useWishlistMutation() {
  const wishlistMutation = useMutation({
    mutationFn: async ({ action, data }: MutationParams) => {
      return action === 'add' ? await wishlistApi.add(data) : await wishlistApi.remove(data);
    },
  });

  return { wishlistMutation };
}

export function useWishlistQuery() {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: wishlistApi.fetch,
  });
}
