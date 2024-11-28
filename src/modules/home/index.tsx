import { lazyRoute } from '#/shared/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { HomeRoute } = lazyRoute(() => import('./routes/home.route'), 'HomeRoute');
const { ProfileRoute } = lazyRoute(() => import('../account/routes/profile.route'), 'ProfileRoute');

export const HomeRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeRoute />,
  },
  {
    path: '/account/personal-info',
    element: <ProfileRoute />,
  },
];
