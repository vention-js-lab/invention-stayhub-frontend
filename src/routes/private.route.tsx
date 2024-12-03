import { composeModuleRoutes } from '#/shared/utils/router.util';
import { WishlistRoutes } from '#/modules/wishlist';
import { ProtectedLayout } from '#/layout/components/protected-layout';

export const privateRoutes = [
  {
    path: '/',
    element: <ProtectedLayout />,
    children: composeModuleRoutes(WishlistRoutes),
  },
];
