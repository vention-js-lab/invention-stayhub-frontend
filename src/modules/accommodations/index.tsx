import { lazyRoute } from '#/shared/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { HomeRoute } = lazyRoute(() => import('./routes/home.route'), 'HomeRoute');
const { SingleAccommodationRoute } = lazyRoute(() => import('./routes/single-accommodation.route'), 'SingleAccommodationRoute');

export const AccommodationsRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeRoute />,
  },
  {
    path: '/accommodations/:id',
    element: <SingleAccommodationRoute />,
  },
];
