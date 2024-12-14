import { apiClient } from '#/shared/libs/api-client.lib';
import { type BaseResponse } from '#/shared/types/base-response.type';
import { useQuery } from '@tanstack/react-query';
import { type Category } from '../types/category.type';

interface CategoryList {
  result: Category[];
  total: number;
}

export function useCategoriesQuery() {
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get<BaseResponse<CategoryList>>('/categories');
      return response.data.data;
    },
  });

  return categoriesQuery;
}
