import { lazyRoute } from '#/shared/utils/router.util';
import { type RouteObject } from 'react-router-dom';
import { CreateAccommodationRoute } from './routes/create-accommodation.route';

const { UserAccommodationsRoute } = lazyRoute(() => import('./routes/user-accommodations.route'), 'UserAccommodationsRoute');

export const UserAccommodationsRoutes: RouteObject[] = [
  {
    path: '/accommodations',
    element: <UserAccommodationsRoute />,
  },
  {
    path: '/accommodations/create',
    element: <CreateAccommodationRoute />,
  },
];
