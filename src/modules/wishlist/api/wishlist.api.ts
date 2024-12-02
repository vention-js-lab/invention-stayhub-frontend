import { useQuery } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { type BaseResponse } from '#/shared/types/base-response.type';
import { type WishlistItem } from '#/shared/types/wishlist.type';

export function useWishlistQuery() {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const response = await apiClient.get<BaseResponse<WishlistItem[]>>('/wishlists');
      return response.data.data;
    },
  });
}
