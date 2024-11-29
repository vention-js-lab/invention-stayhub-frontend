import { lazyRoute } from '#/shared/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { AccommodationRoute } = lazyRoute(() => import('./routes/accommodation.route'), 'AccommodationRoute');

export const AccommodationRoutes: RouteObject[] = [
  {
    path: '/accommodations/:id',
    element: <AccommodationRoute />,
  },
];
