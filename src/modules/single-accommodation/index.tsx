import { lazyRoute } from '#/shared/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { SingleAccommodationRoute } = lazyRoute(() => import('./routes/single-accommodation.route'), 'SingleAccommodationRoute');

export const SingleAccommodationRoutes: RouteObject[] = [
  {
    path: '/accommodations/:id',
    element: <SingleAccommodationRoute />,
  },
];
