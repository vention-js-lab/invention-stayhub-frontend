import { lazyRoute } from '#/shared/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { WishlistRoute } = lazyRoute(() => import('./routes/wishlist.route'), 'WishlistRoute');

export const WishlistRoutes: RouteObject[] = [
  {
    path: '/wishlist',
    element: <WishlistRoute />,
  },
];
