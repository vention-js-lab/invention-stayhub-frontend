import { lazyRoute } from '#/shared/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { ProfileRoute } = lazyRoute(() => import('./routes/profile.route'), 'ProfileRoute');

export const AccountRoutes: RouteObject[] = [
  {
    path: '/account/profile',
    element: <ProfileRoute />,
  },
];
