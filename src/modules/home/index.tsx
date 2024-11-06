import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { HomeRoute } = lazyRoute(() => import('./routes/home.route'), 'HomeRoute');

export const HomeRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeRoute />,
  },
];
