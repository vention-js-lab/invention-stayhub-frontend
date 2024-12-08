import { composeModuleRoutes } from '#/shared/utils/router.util';
import { WishlistRoutes } from '#/modules/wishlist';
import { ProtectedLayout } from '#/layout/components/protected-layout';
import { OwnerRoutes } from '#/modules/owner';
import { BookingsRoutes } from '#/modules/bookings';

export const privateRoutes = [
  {
    path: '/',
    element: <ProtectedLayout />,
    children: composeModuleRoutes(WishlistRoutes, OwnerRoutes, BookingsRoutes),
  },
];
